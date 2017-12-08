package org.fnovella.project.group.service;

import org.fnovella.project.group.model.Group;

public interface GroupService {
    void updateCategoryStructureAfterCreate(Group group);

    void updateCategoryStructureAfterDelete(Group group);
}
