package org.fnovella.project.program_instructor.repository;


import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("programInstructorRepository")
public interface ProgramInstructorRepository extends JpaRepository<ProgramInstructor, Integer> {
	List<ProgramInstructor> findByProgram(Integer programId);
	@Modifying
    @Transactional
    @Query("delete from ProgramInstructor where program = ?1")
	void deleteByProgram(Integer programId);
}