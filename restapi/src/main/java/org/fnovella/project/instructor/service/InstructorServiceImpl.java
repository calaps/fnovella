package org.fnovella.project.instructor.service;

import org.fnovella.project.instructor.model.Instructor;
import org.fnovella.project.instructor.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InstructorServiceImpl implements InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    @Override
    public Map<Integer, Instructor> findAll() {
        List<Instructor> instructors = instructorRepository.findAll();
        return instructors.stream()
                .collect(Collectors.toMap(Instructor::getId, instructor->instructor));
    }

    @Override
    public Instructor findById(Integer instructor) {
        return instructorRepository.findOne(instructor);
    }
}
