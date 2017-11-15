package org.fnovella.project.program_instructor.repository;


import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
	Page<ProgramInstructor> findByInstructor(Integer instructor, Pageable pageable);
	List<ProgramInstructor> findByInstructor(Integer instructor);
	@Modifying
    @Transactional
    @Query("delete from ProgramInstructor where instructor = ?1")
	void deleteByInstructor(Integer instructor);
}