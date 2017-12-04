package org.fnovella.project.evaluation_subtype.repository;

import org.fnovella.project.evaluation_subtype.model.EvaluationSubtype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationSubtypeRepository extends JpaRepository<EvaluationSubtype, Integer> {

}
