package org.fnovella.project.participant_aditional_fields_values.repository;


import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.participant_aditional_fields_values.model.ParticipantAditionalFieldsValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantAditionalFieldsValuesRepository extends JpaRepository<ParticipantAditionalFieldsValues, Integer> {

	void deleteByAditionalFieldId(Integer aditionalFieldId);
}