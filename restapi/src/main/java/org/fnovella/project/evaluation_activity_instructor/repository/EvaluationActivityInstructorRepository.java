package org.fnovella.project.evaluation_activity_instructor.repository;

import org.fnovella.project.evaluation_activity_instructor.model.EvaluationActivityInstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface EvaluationActivityInstructorRepository extends JpaRepository<EvaluationActivityInstructor, Integer> {
    @Transactional
    void deleteByActivity(Integer id);
}