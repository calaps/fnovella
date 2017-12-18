package org.fnovella.project.evaluation_activity_participant.service;

import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation.repository.EvaluationRepository;
import org.fnovella.project.evaluation_activity.model.EvaluationActivity;
import org.fnovella.project.evaluation_activity.repository.EvaluationActivityRepository;
import org.fnovella.project.evaluation_activity_participant.data.ActivityData;
import org.fnovella.project.evaluation_activity_participant.data.EvaluationActivityParticipantData;
import org.fnovella.project.evaluation_activity_participant.data.ParticipantData;
import org.fnovella.project.evaluation_activity_participant.model.EvaluationActivityParticipant;
import org.fnovella.project.evaluation_activity_participant.repository.EvaluationActivityParticipantRepository;
import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.fnovella.project.program_instructor.service.ProgramInstructorServiceImpl.SPACE;

@Service
public class EvaluationActivityParticipantServiceImpl implements EvaluationActivityParticipantService {

    @Autowired
    private EvaluationActivityParticipantRepository evaluationActivityParticipantRepository;

    @Autowired
    private EvaluationActivityRepository eaRepository;
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private EvaluationRepository evaluationRepository;

    @Override
    public List<EvaluationActivityParticipantData> getByActivityId(Integer activityId) {
        List<EvaluationActivityParticipant> evaluationActivityParticipants =
                evaluationActivityParticipantRepository.findByActivity(activityId);
        List<EvaluationActivityParticipantData> preparedList = convert(evaluationActivityParticipants);
        return preparedList;
    }

    @Override
    public List<EvaluationActivityParticipant> getBySession(Integer session) {
        List<Evaluation> evaluationList = evaluationRepository.findBySession(session);
        List<Integer> evaluationIds = evaluationList.stream()
                .map(evaluation -> evaluation.getId())
                .collect(Collectors.toList());
        List<Integer> activityIds = eaRepository.findByEvaluationIn(evaluationIds).stream()
                .map(evaluationActivity -> evaluationActivity.getId())
                .collect(Collectors.toList());
        return evaluationActivityParticipantRepository.findByActivityIn(activityIds);
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
