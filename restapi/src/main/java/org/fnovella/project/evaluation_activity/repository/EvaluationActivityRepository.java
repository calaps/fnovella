package org.fnovella.project.evaluation_activity.repository;

import org.fnovella.project.evaluation_activity.model.EvaluationActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface EvaluationActivityRepository extends JpaRepository<EvaluationActivity, Integer> {

    List<EvaluationActivity> findByEvaluation(Integer evaluationId);
    @Transactional
    void deleteByEvaluation(Integer evaluationId);

    List<EvaluationActivity> findByEvaluationIn(List<Integer> evaluationIds);
}