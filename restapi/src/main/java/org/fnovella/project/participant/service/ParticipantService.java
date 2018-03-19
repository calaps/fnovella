package org.fnovella.project.participant.service;

public interface ParticipantService {

    Integer getActiveParticipant(Integer groupId);
    Integer getTotalParticipant(Integer groupId);
    Integer getSustainedParticipant(Integer groupId);
    Integer getJustifiedParticipant(Integer groupId);
}
