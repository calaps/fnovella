package org.fnovella.project.evaluation_range.repository;

import org.fnovella.project.evaluation_range.model.EvaluationRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRangeRepository extends JpaRepository<EvaluationRange, Integer> {

}
