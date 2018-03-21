package org.fnovella.project.participant_aditional_fields.service;

import java.util.List;

import org.fnovella.project.participant.model.Participant;

public interface ParticipantAditionalFieldsService {
    void deleteByGroupIdIfExist(Integer groupId);

    List<Integer> getGroupIdsEnrolled(Integer participantId);

    List<Participant> getParticipantsByGroupId(Integer groupId);
}
