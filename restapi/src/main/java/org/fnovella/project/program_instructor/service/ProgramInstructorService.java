package org.fnovella.project.program_instructor.service;

import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.springframework.data.domain.Page;

public interface ProgramInstructorService {

    void addNameInstructorTo(Page<ProgramInstructor> programInstructors);

    void setInstructorNameFor(ProgramInstructor programInstructor);
}
