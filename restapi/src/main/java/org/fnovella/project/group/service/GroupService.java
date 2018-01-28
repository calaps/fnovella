package org.fnovella.project.group.service;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.model.InsightGroupDTO;

public interface GroupService {
    void updateCategoryStructureAfterCreate(Group group);

    void updateCategoryStructureAfterDelete(Group group);

    void delete(Group group);

    InsightGroupDTO getInsight(Integer idGroup);

    long getApprovedParticipants(Integer idGroup);
}
