package org.fnovella.project.participant_aditional_fields.repository;

import org.fnovella.project.participant_aditional_fields.model.ParticipantAditionalFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("participantAditionalFieldsRepository")
public interface ParticipantAditionalFieldsRepository extends JpaRepository<ParticipantAditionalFields, Integer>{

}
