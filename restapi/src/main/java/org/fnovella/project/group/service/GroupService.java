package org.fnovella.project.group.service;

import java.util.List;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.model.InsightGroupDTO;
import org.fnovella.project.participant.model.Participant;

public interface GroupService {
    void updateCategoryStructureAfterCreate(Group group);

    void updateCategoryStructureAfterDelete(Group group);

    void delete(Group group);

    InsightGroupDTO getInsight(Integer idGroup);

    long getApprovedParticipants(Integer idGroup);

    boolean isGroupExistsForClassification(Integer classificationId, TypeCategory typeCategory);

    Group getByGroupId(Integer groupId);

    List<Group> getAllGroups();

    Group getGroupById(Integer groupId);

    List<Group> getByProgramId(Integer programId);
}
