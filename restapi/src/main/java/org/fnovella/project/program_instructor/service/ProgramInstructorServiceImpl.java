package org.fnovella.project.program_instructor.service;

import org.fnovella.project.instructor.model.Instructor;
import org.fnovella.project.instructor.service.InstructorService;
import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProgramInstructorServiceImpl implements ProgramInstructorService {
    public static final String SPACE = " ";
    @Autowired
    private InstructorService instructorService;


    @Override
    public void addNameInstructorTo(Page<ProgramInstructor> programInstructors) {
        Map<Integer, Instructor> allInstructor = instructorService.findAll();
        programInstructors.forEach(current -> {
            Instructor instructor = allInstructor.get(current.getInstructor());
            current.setInstructorName(instructor.getFirstName() + SPACE + instructor.getSecondName());
        });
    }

    @Override
    public void setInstructorNameFor(ProgramInstructor programInstructor) {
        Instructor instructor = instructorService.findById(programInstructor.getInstructor());
        programInstructor.setInstructorName(instructor.getFirstName() + SPACE + instructor.getSecondName());
    }
}
