package org.fnovella.project.participant_aditional_fields_values.repository;


import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.participant_aditional_fields_values.model.ParticipantAditionalFieldsValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("participantAditionalFieldsRepositoryValues")
public interface ParticipantAditionalFieldsValuesRepository extends JpaRepository<ParticipantAditionalFieldsValues, Integer> {

	@Transactional
	@Query("delete from ParticipantAditionalFieldsValues where aditionalFieldId = ?1")
	void deleteByAditionalFieldId(Integer aditionalFieldId);
}