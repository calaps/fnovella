package org.fnovella.project.participant_aditional_fields.service;

import org.fnovella.project.participant_aditional_fields.model.ParticipantAditionalFields;
import org.fnovella.project.participant_aditional_fields.repository.ParticipantAditionalFieldsRepository;
import org.fnovella.project.participant_aditional_fields_values.repository.ParticipantAditionalFieldsValuesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ParticipantAditionalFieldsServiceImpl implements ParticipantAditionalFieldsService {

    @Autowired
    private ParticipantAditionalFieldsRepository participantAditionalFieldsRepository;
    @Autowired
    private ParticipantAditionalFieldsValuesRepository participantAditionalFieldsValuesRepository;

    @Override
    public void deleteByGroupIdIfExist(Integer groupId) {

        List<ParticipantAditionalFields> participantAditionalFieldsList =
                participantAditionalFieldsRepository.findByGroup(groupId);
        participantAditionalFieldsList
                .forEach(participantAditionalFields -> {
                    participantAditionalFieldsValuesRepository
                            .deleteByAditionalFieldId(participantAditionalFields.getId());
                });
        if (!participantAditionalFieldsList.isEmpty()) {
            participantAditionalFieldsRepository.deleteByGroup(groupId);
        }
    }
}
