package org.fnovella.project.course.service;

import org.fnovella.project.course.model.Course;
import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.group.service.TypeCategory;
import org.fnovella.project.inscriptions_inst_course.repository.InscriptionsInstCourseRepository;
import org.fnovella.project.inscriptions_part_course.repository.InscriptionsPartCourseRepository;
import org.fnovella.project.program.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    private ProgramService programService;
    
    @Autowired
    private GroupService groupService;

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

    @Override
    public Page<Course> getAllCourses(Pageable pageable) {
        final Page<Course> courses = this.courseRepository.findAll(pageable);
        if (courses == null) {
            return null;
        }
        for (final Course course : courses.getContent()) {
            course.setCreatedGroup(this.programService.isProgramActive(course.getProgramId()));
        }
        for (final Course course : courses.getContent()) {
            course.setGroupExists(this.groupService.isGroupExistsForClassification(course.getId(), TypeCategory.COURSE));
        }
        return courses;
    }
}
