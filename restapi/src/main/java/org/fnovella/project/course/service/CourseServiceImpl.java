package org.fnovella.project.course.service;

import org.fnovella.project.course.model.Course;
import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.inscriptions_inst_course.repository.InscriptionsInstCourseRepository;
import org.fnovella.project.inscriptions_part_course.repository.InscriptionsPartCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private InscriptionsInstCourseRepository inscriptionsInstCourseRepository;
    @Autowired
    private InscriptionsPartCourseRepository inscriptionsPartCourseRepository;

    @Override
    public void updateCreatedGroup(Group group, boolean createdGroup) {
        Course course = courseRepository.findOne(group.getCourseId());
        if (course != null) {
            course.setCreatedGroup(createdGroup);
            courseRepository.save(course);
        }
    }

    @Override
    public void deleteByProgramId(Integer programId) {
        List<Course> courses = courseRepository.findByProgramId(programId);
        deleteRelations(courses);
        if (!courses.isEmpty()) {
            courseRepository.deleteByProgramId(programId);
        }
    }

    @Override
    public void deleteByGradeId(Integer gradeId) {
        List<Course> courses = courseRepository.findByGrade(gradeId);
        deleteRelations(courses);
        if (!courses.isEmpty()) {
            courseRepository.deleteByGrade(gradeId);
        }
    }

    @Override
    public void deleteBySection(Integer sectionId) {
        List<Course> courses = courseRepository.findBySection(sectionId);
        deleteRelations(courses);
        if (!courses.isEmpty()) {
            courseRepository.deleteBySection(sectionId);
        }
    }

    private void deleteRelations(List<Course> courses) {
        courses.forEach(course -> {
            inscriptionsInstCourseRepository.deleteByCourseId(course.getId());
            inscriptionsPartCourseRepository.deleteByCourseId(course.getId());
        });
    }
}
