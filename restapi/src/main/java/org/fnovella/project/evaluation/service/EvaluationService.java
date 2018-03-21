package org.fnovella.project.evaluation.service;

public interface EvaluationService {
    void deleteByGroupIdIfExist(Integer groupId);

    Integer getGroupIdByEvaluationId(Integer evaluationId);
}
