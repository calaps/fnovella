package org.fnovella.project.program_activation.repository;

import javax.transaction.Transactional;

import org.fnovella.project.program_activation.model.ProgramActivation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("programActivationRepository")
public interface ProgramActivationRepository extends JpaRepository<ProgramActivation, Integer> {
	@Modifying
    @Transactional
    @Query("delete from ProgramActivation where programId = ?1")
	void deleteByProgramId(Integer programId);
	
	@Modifying
    @Transactional
    @Query("delete from ProgramActivation where location = ?1")
	void deleteByLocation(Integer location);
}