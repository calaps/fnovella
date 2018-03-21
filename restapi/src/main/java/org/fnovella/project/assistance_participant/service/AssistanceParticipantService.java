package org.fnovella.project.assistance_participant.service;

import java.util.List;

public interface AssistanceParticipantService {    
    List<Integer> getAssistancesByParticipantId(Integer participantId);
}
