package org.fnovella.project.evaluation_type.repository;

import org.fnovella.project.evaluation_type.model.EvaluationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("evaluationTypeRepository")
public interface EvaluationTypeRepository extends JpaRepository<EvaluationType, Integer>{

}
