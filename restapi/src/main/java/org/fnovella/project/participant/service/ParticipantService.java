package org.fnovella.project.participant.service;

import java.util.List;

import org.fnovella.project.participant.model.Participant;

public interface ParticipantService {

    Integer getActiveParticipant(Integer groupId);
    Integer getTotalParticipant(Integer groupId);
    Integer getSustainedParticipant(Integer groupId);
    Integer getJustifiedParticipant(Integer groupId);
    Participant getParticipantById(Integer participantId);
}
