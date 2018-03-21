package org.fnovella.project.assistance_participant.service;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.assistance_participant.model.AssistanceParticipant;
import org.fnovella.project.assistance_participant.repository.AssistanceParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssistanceParticipantServiceImpl implements AssistanceParticipantService {

    @Autowired
    private AssistanceParticipantRepository assistanceParticipantRepository;

    @Override
    public List<Integer> getAssistancesByParticipantId(final Integer participantId) {
        final List<Integer> assistances = new ArrayList<>();
        final List<AssistanceParticipant> assistanceParticipants = this.assistanceParticipantRepository
                .findByParticipant(participantId);
        for (final AssistanceParticipant assistanceParticipant : assistanceParticipants) {
            assistances.add(assistanceParticipant.getAssistance());
        }
        return assistances;
    }

}
