package org.fnovella.project.participant_history.service;

import java.util.List;

import org.fnovella.project.participant_history.model.ParticipantHistory;
import org.fnovella.project.participant_history.model.ParticipantHistorySearch;
import org.fnovella.project.utility.exception.ProcessingException;

public interface ParticipantHistoryService {
    List<ParticipantHistory> getParticipantHistory(ParticipantHistorySearch ParticipantHistorySearch)
            throws ProcessingException;
}
