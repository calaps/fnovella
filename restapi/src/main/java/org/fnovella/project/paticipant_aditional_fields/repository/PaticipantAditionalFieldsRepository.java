package org.fnovella.project.paticipant_aditional_fields.repository;

import org.fnovella.project.paticipant_aditional_fields.model.PaticipantAditionalFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("paticipantAditionalFieldsRepository")
public interface PaticipantAditionalFieldsRepository extends JpaRepository<PaticipantAditionalFields, Integer>{

}
