package org.fnovella.project.course.service;

import org.fnovella.project.course.model.Course;
import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.group.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    private CourseRepository courseRepository;
    @Override
    public void updateCreatedGroup(Group group) {
        Course course = courseRepository.findOne(group.getCourseId());
        if (course != null) {
            course.setCreatedGroup(true);
            courseRepository.save(course);
        }
    }
}
