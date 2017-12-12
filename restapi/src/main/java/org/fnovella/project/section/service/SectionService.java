package org.fnovella.project.section.service;

import org.fnovella.project.group.model.Group;

public interface SectionService {
    void updateCreatedGroup(Group group, boolean createdGroup);

    void deleteByGradeId(Integer gradeId);
}
