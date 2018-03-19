package org.fnovella.project.evaluation.service;

import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation.repository.EvaluationRepository;
import org.fnovella.project.evaluation_activity.service.EvaluationActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationActivityService evaluationActivityService;
    @Autowired
    private EvaluationRepository evaluationRepository;

    @Override
    public void deleteByGroupIdIfExist(Integer groupId) {
        List<Evaluation> evaluations = evaluationRepository.findByGroup(groupId);
        evaluations
                .forEach(evaluation -> {
                    evaluationActivityService.deleteByEvaluationIfExist(evaluation.getId());
                });
        if (!evaluations.isEmpty()) {
            evaluationRepository.deleteByGroup(groupId);
        }
    }
}
