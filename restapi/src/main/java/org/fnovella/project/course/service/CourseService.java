package org.fnovella.project.course.service;

import org.fnovella.project.group.model.Group;

public interface CourseService {
    void updateCreatedGroup(Group group, boolean createdGroup);

    void deleteByProgramId(Integer programId);

    void deleteByGradeId(Integer gradeId);

    void deleteBySection(Integer sectionId);
}
