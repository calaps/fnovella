package org.fnovella.project.instructor.service;

import org.fnovella.project.instructor.model.Instructor;

import java.util.Map;

public interface InstructorService {
    Map<Integer,Instructor> findAll();

    Instructor findById(Integer instructor);
}
