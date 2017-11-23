package org.fnovella.project.evaluation.repository;

import org.fnovella.project.evaluation.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("evaluationRepository")
public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {

}
