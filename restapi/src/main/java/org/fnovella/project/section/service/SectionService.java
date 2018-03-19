package org.fnovella.project.section.service;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.section.model.Section;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SectionService {
    void updateCreatedGroup(Group group, boolean createdGroup);

    void deleteByGradeId(Integer gradeId);

    Page<Section> getAllSections(final Pageable pageable);
}
