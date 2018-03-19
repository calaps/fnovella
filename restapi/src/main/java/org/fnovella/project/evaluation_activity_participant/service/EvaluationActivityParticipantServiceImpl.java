package org.fnovella.project.evaluation_activity_participant.service;

import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation.repository.EvaluationRepository;
import org.fnovella.project.evaluation_activity.model.EvaluationActivity;
import org.fnovella.project.evaluation_activity.repository.EvaluationActivityRepository;
import org.fnovella.project.evaluation_activity_participant.data.ActivityData;
import org.fnovella.project.evaluation_activity_participant.data.EvaluationActivityParticipantData;
import org.fnovella.project.evaluation_activity_participant.data.EvaluationActivityParticipantDetail;
import org.fnovella.project.evaluation_activity_participant.data.ParticipantData;
import org.fnovella.project.evaluation_activity_participant.model.EvaluationActivityParticipant;
import org.fnovella.project.evaluation_activity_participant.repository.EvaluationActivityParticipantRepository;
import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static org.fnovella.project.program_instructor.service.ProgramInstructorServiceImpl.SPACE;

@Service
public class EvaluationActivityParticipantServiceImpl implements EvaluationActivityParticipantService {

    @Autowired
    private EvaluationActivityParticipantRepository eapRepository;

    @Autowired
    private EvaluationActivityRepository eaRepository;
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private EvaluationRepository evaluationRepository;

    @Override
    public List<EvaluationActivityParticipantData> getByActivityId(Integer activityId) {
        List<EvaluationActivityParticipant> evaluationActivityParticipants =
                eapRepository.findByActivity(activityId);
        List<EvaluationActivityParticipantData> preparedList = convert(evaluationActivityParticipants);
        return preparedList;
    }

    @Override
    public List<EvaluationActivityParticipantDetail> getBySession(Integer session) {
        List<Evaluation> evaluationList = evaluationRepository.findBySession(session);
        List<Integer> evaluationIds = evaluationList.stream()
                .map(evaluation -> evaluation.getId())
                .collect(Collectors.toList());
        List<EvaluationActivity> activities = eaRepository.findByEvaluationIn(evaluationIds);
        List<Integer> activityIds = activities.stream()
                .map(evaluationActivity -> evaluationActivity.getId())
                .collect(Collectors.toList());
        List<EvaluationActivityParticipant> bySession = eapRepository.findByActivityIn(activityIds);
        return bySession.stream()
                .map(eap -> convertDetail(eap, evaluationList, activities))
                .collect(Collectors.toList());
    }

    @Override
    public List<EvaluationActivityParticipantDetail> findAll() {
        List<Evaluation> evaluations = evaluationRepository.findAll();
        List<EvaluationActivity> evaluationActivities = eaRepository.findAll();
        List<EvaluationActivityParticipantDetail> eapList =
                eapRepository.findAll()
                        .stream()
                        .map(eap -> convertDetail(eap, evaluations, evaluationActivities))
                        .collect(Collectors.toList());
        return eapList;
    }

    private EvaluationActivityParticipantDetail convertDetail(EvaluationActivityParticipant eap, List<Evaluation> evaluations, List<EvaluationActivity> evaluationActivities) {
        Map<Integer, Evaluation> evaluationMap = evaluations
                .stream()
                .collect(Collectors.toMap(Evaluation::getId, Function.identity()));
        Map<Integer, EvaluationActivity> activityMap = evaluationActivities
                .stream()
                .collect(Collectors.toMap(EvaluationActivity::getId, Function.identity()));
        Integer activityId = eap.getActivity();
        EvaluationActivity activity = activityMap.get(activityId);
        Integer evaluationId = activity.getEvaluation();
        Evaluation evaluation = evaluationMap.get(evaluationId);

        EvaluationActivityParticipantDetail eapd = new EvaluationActivityParticipantDetail();
        eapd.setEvaluationActivityParticipant(eap);
        eapd.setSession(evaluation.getSession());
        eapd.setEvaluationId(evaluationId);
        eapd.setMonth(0);
        eapd.setYear(0);
        eapd.setDate(null);
        return eapd;
    }

    @Override
    public EvaluationActivityParticipantDetail findOne(Integer id) {
        try {
            EvaluationActivityParticipant eap = eapRepository.findOne(id);
            Integer activityId = eap.getActivity();
            EvaluationActivity activity = eaRepository.findOne(activityId);
            Integer evaluationId = activity.getEvaluation();
            Evaluation evaluation = evaluationRepository.findOne(evaluationId);
            return convertDetail(eap, Collections.singletonList(evaluation), Collections.singletonList(activity));
        } catch (Exception e) {
            return null;
        }
    }

    private List<EvaluationActivityParticipantData> convert(List<EvaluationActivityParticipant> evaluationActivityParticipants) {
        EvaluationActivityParticipantDataConverter converter = new EvaluationActivityParticipantDataConverter();
        return evaluationActivityParticipants.stream()
                .map(eap -> converter.convert(eap))
                .collect(Collectors.toList());
    }

    private class EvaluationActivityParticipantDataConverter {
        public EvaluationActivityParticipantData convert(EvaluationActivityParticipant eap) {
            EvaluationActivityParticipantData data = new EvaluationActivityParticipantData();
            data.setId(eap.getId());
            data.setGradeFinal(eap.getGradeFinal());
            data.setGradeInitial(eap.getGradeInitial());
            data.setActivity(convert(eaRepository.findOne(eap.getActivity())));
            data.setParticipant(convert(participantRepository.findOne(eap.getParticipant())));
            return data;
        }

        private ParticipantData convert(Participant participant) {
            return new ParticipantData(
                    participant.getId(),
                    participant.getFirstName()
                            + SPACE + participant.getSecondName(),
                    participant.getEmail(),
                    participant.getGender());
        }

        private ActivityData convert(EvaluationActivity activity) {
            return new ActivityData(
                    activity.getId(),
                    activity.getName());
        }
    }
}
