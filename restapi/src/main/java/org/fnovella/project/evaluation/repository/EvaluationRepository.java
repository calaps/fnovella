package org.fnovella.project.evaluation.repository;

import org.fnovella.project.evaluation.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {

    void deleteByGroup(Integer groupId);

    List<Evaluation> findByGroup(Integer groupId);
}
