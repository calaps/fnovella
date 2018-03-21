package org.fnovella.project.participant_history.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.fnovella.project.participant_history.model.ParticipantHistory;
import org.fnovella.project.participant_history.model.ParticipantHistorySearch;
import org.fnovella.project.participant_history.service.ParticipantHistoryService;
import org.fnovella.project.utility.exception.ProcessingException;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/participant-history")
public class ParticipantHistoryController {

    @Autowired
    private ParticipantHistoryService participantHistoryService;

    @RequestMapping(value = "search", method = RequestMethod.POST)
    public APIResponse search(@RequestHeader("authorization") final String authorization, final Pageable pageable,
            final ParticipantHistorySearch participantHistorySearch) {
        try {
            final List<ParticipantHistory> participantHistories =
                    this.participantHistoryService.getParticipantHistory(participantHistorySearch);
            return new APIResponse(new PageImpl<>(participantHistories, pageable, participantHistories.size()), null);
        } catch (final ProcessingException e) {
            return new APIResponse(null, Arrays.asList(e.getMessage()));
        }
    }
}
