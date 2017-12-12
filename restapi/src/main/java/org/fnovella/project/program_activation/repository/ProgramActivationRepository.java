package org.fnovella.project.program_activation.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.program_activation.model.ProgramActivation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramActivationRepository extends JpaRepository<ProgramActivation, Integer> {

	@Transactional
	void deleteByProgramId(Integer programId);
	@Transactional
	void deleteByLocation(Integer location);
}