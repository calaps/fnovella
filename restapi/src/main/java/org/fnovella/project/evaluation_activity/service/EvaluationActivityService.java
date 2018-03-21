package org.fnovella.project.evaluation_activity.service;

import java.util.List;

import org.fnovella.project.evaluation_activity.model.EvaluationActivity;

public interface EvaluationActivityService {
    void deleteByEvaluationIfExist(Integer id);

    List<EvaluationActivity> getEvaluationActivityList(List<Integer> evaluationActivityIds);
}
