package org.fnovella.project.evaluation_actvitiy_participant_instructor.repository;

import org.fnovella.project.evaluation_actvitiy_participant_instructor.model.EvaluationActivityParticipantInstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface EvaluationActivityParticipantInstructorRepository extends JpaRepository<EvaluationActivityParticipantInstructor, Integer> {
    @Transactional
    void deleteByActivity(Integer activityId);
}
