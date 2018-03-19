package org.fnovella.project.indicators.service;

import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation_activity.model.EvaluationActivity;
import org.fnovella.project.evaluation_activity.repository.EvaluationActivityRepository;
import org.fnovella.project.evaluation_activity_participant.model.EvaluationActivityParticipant;
import org.fnovella.project.evaluation_activity_participant.repository.EvaluationActivityParticipantRepository;
import org.fnovella.project.group.repository.GroupRepository;
import org.fnovella.project.indicators.data.EvaluationIndicators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

import static java.util.stream.Collectors.*;

@Service
public class EvaluationIndicatorsServiceImpl implements EvaluationIndicatorsService {


    public static final double PERCENTAGE = 100.0;
    @Autowired
    private EvaluationActivityParticipantRepository evaluationActivityParticipantRepository;
    @Autowired
    private EvaluationActivityRepository evaluationActivityRepository;
    @Autowired
    private GroupRepository groupRepository;

    @Override
    public EvaluationIndicators fetchIndicators(Evaluation evaluation, Integer year) {

        Map<Integer, Double> studentNotes = getStudentNotes(evaluation.getId());

        EvaluationIndicators evaluationIndicators = new EvaluationIndicators.Builder()
                .setStudentNotes(studentNotes)
                .setGroup(groupRepository.findOne(evaluation.getGroup()))
                .setApprovalPercentage(evaluation.getApprovalPercentage())
                .build();
        return evaluationIndicators;

    }


    private Map<Integer, Double> getStudentNotes(Integer evaluationId) {
        Map<Integer, Double> activities = evaluationActivityRepository.findByEvaluation(evaluationId)
                .stream()
                .collect(toMap(EvaluationActivity::getId, ea -> ea.getPercentage() / PERCENTAGE));

        return evaluationActivityParticipantRepository.findByActivityIn(activities.keySet())
                .stream()
                .collect(groupingBy(EvaluationActivityParticipant::getParticipant,
                        summingDouble(eap -> eap.getGradeFinal() * activities.get(eap.getActivity()))));

    }

}
