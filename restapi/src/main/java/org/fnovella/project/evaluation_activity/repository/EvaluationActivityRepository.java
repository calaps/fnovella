package org.fnovella.project.evaluation_activity.repository;

import org.fnovella.project.evaluation_activity.model.EvaluationActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("evaluationActivityRepository")
public interface EvaluationActivityRepository extends JpaRepository<EvaluationActivity, Integer> {

}