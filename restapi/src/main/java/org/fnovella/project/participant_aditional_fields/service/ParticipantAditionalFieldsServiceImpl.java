package org.fnovella.project.participant_aditional_fields.service;

import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.service.ParticipantService;
import org.fnovella.project.participant_aditional_fields.model.ParticipantAditionalFields;
import org.fnovella.project.participant_aditional_fields.repository.ParticipantAditionalFieldsRepository;
import org.fnovella.project.participant_aditional_fields_values.repository.ParticipantAditionalFieldsValuesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ParticipantAditionalFieldsServiceImpl implements ParticipantAditionalFieldsService {

    @Autowired
    private ParticipantAditionalFieldsRepository participantAditionalFieldsRepository;
    @Autowired
    private ParticipantAditionalFieldsValuesRepository participantAditionalFieldsValuesRepository;
    @Autowired
    private ParticipantService participantService;

    @Override
    public void deleteByGroupIdIfExist(Integer groupId) {

        List<ParticipantAditionalFields> participantAditionalFieldsList = participantAditionalFieldsRepository
                .findByGroup(groupId);
        participantAditionalFieldsList.forEach(participantAditionalFields -> {
            participantAditionalFieldsValuesRepository.deleteByAditionalFieldId(participantAditionalFields.getId());
        });
        if (!participantAditionalFieldsList.isEmpty()) {
            participantAditionalFieldsRepository.deleteByGroup(groupId);
        }
    }

    /*
     * @Override public List<ParticipantAditionalFields>
     * getParticipantsBygroupId(final Integer groupId) { return
     * this.participantAditionalFieldsRepository.findByGroup(groupId); }
     */

    @Override
    public List<Participant> getParticipantsByGroupId(final Integer groupId) {
        final List<Participant> participants = new ArrayList<>();
        final List<ParticipantAditionalFields> participantAditionalFields = this.participantAditionalFieldsRepository
                .findByGroup(groupId);
        for (final ParticipantAditionalFields participantAditionalField : participantAditionalFields) {
            participants.add(this.participantService.getParticipantById(participantAditionalField.getParticipant()));
        }
        return participants;
    }

    @Override
    public List<Integer> getGroupIdsEnrolled(final Integer participantId) {
        final List<Integer> groupsEnrolled = new ArrayList<>();
        final List<ParticipantAditionalFields> participantAditionalFields = this.participantAditionalFieldsRepository
                .findByParticipant(participantId);
        for (final ParticipantAditionalFields fields : participantAditionalFields) {
            groupsEnrolled.add(fields.getGroup());
        }
        return groupsEnrolled;
    }

}
