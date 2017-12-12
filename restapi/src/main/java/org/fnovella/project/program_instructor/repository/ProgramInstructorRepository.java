package org.fnovella.project.program_instructor.repository;


import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProgramInstructorRepository extends JpaRepository<ProgramInstructor, Integer> {

    void deleteByProgram(Integer programId);

    Page<ProgramInstructor> findByInstructor(Integer instructor, Pageable pageable);

    List<ProgramInstructor> findByInstructor(Integer instructor);
    @Transactional
    void deleteByInstructor(Integer instructor);
}