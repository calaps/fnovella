package org.fnovella.project.program_aditional_fields.repository;


import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.program_aditional_fields.model.ProgramAditionalFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("programAditionalFieldsRepository")
public interface ProgramAditionalFieldsRepository extends JpaRepository<ProgramAditionalFields, Integer> {
	List<ProgramAditionalFields> findByProgram(Integer programId);
	@Modifying
    @Transactional
    @Query("delete from ProgramAditionalFields where program = ?1")
	void deleteByProgram(Integer programId);
}