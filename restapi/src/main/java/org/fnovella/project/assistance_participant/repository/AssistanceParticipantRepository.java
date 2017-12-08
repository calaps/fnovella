package org.fnovella.project.assistance_participant.repository;

import org.fnovella.project.assistance_participant.model.AssistanceParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssistanceParticipantRepository extends JpaRepository<AssistanceParticipant, Integer>{
}
