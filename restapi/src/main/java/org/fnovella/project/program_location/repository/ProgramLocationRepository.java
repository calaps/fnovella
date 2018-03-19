package org.fnovella.project.program_location.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.program_location.model.ProgramLocation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramLocationRepository extends JpaRepository<ProgramLocation, Integer> {
	Page<ProgramLocation> findByProgram(Integer program, Pageable pageable);
	
	List<ProgramLocation> findByProgram(Integer programId);
	@Modifying
    @Transactional
    @Query("delete from ProgramLocation where program = ?1")
	void deleteByProgram(Integer programId);
}