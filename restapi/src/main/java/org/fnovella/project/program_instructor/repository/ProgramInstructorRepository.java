package org.fnovella.project.program_instructor.repository;


import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("programInstructorRepository")
public interface ProgramInstructorRepository extends JpaRepository<ProgramInstructor, Integer> {

}