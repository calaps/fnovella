package org.fnovella.project.course.service;

import org.fnovella.project.course.model.Course;
import org.fnovella.project.group.model.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseService {
    void updateCreatedGroup(Group group, boolean createdGroup);

    void deleteByProgramId(Integer programId);

    void deleteByGradeId(Integer gradeId);

    void deleteBySection(Integer sectionId);

    Page<Course> getAllCourses(final Pageable pageable);
}
