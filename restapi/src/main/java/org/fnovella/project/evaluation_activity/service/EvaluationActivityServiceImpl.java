package org.fnovella.project.evaluation_activity.service;

import org.fnovella.project.evaluation_activity.model.EvaluationActivity;
import org.fnovella.project.evaluation_activity.repository.EvaluationActivityRepository;
import org.fnovella.project.evaluation_activity_instructor.repository.EvaluationActivityInstructorRepository;
import org.fnovella.project.evaluation_activity_participant.repository.EvaluationActivityParticipantRepository;
import org.fnovella.project.evaluation_actvitiy_participant_instructor.repository.EvaluationActivityParticipantInstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EvaluationActivityServiceImpl implements EvaluationActivityService {
    @Autowired
    private EvaluationActivityInstructorRepository evaluationActivityInstructorRepository;
    @Autowired
    private EvaluationActivityParticipantInstructorRepository evaluationActivityParticipantInstructorRepository;
    @Autowired
    private EvaluationActivityParticipantRepository evaluationActivityParticipantRepository;
    @Autowired
    private EvaluationActivityRepository evaluationActivityRepository;

    @Override
    public void deleteByEvaluationIfExist(Integer evaluationId) {
        List<EvaluationActivity> evaluationActivities = evaluationActivityRepository.findByEvaluation(evaluationId);
        evaluationActivities
                .forEach(evaluationActivity -> {
                    evaluationActivityInstructorRepository.deleteByActivity(evaluationActivity.getId());
                    evaluationActivityParticipantInstructorRepository.deleteByActivity(evaluationActivity.getId());
                    evaluationActivityParticipantRepository.deleteByActivity(evaluationActivity.getId());
                });
        if (!evaluationActivities.isEmpty()) {
            evaluationActivityRepository.deleteByEvaluation(evaluationId);
        }
    }
}
