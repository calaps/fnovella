package org.fnovella.project.assistance.service;

import org.fnovella.project.assistance.model.Assistance;
import org.fnovella.project.assistance.repository.AssistanceRepository;
import org.fnovella.project.assistance_participant.repository.AssistanceParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AssistanceServiceImpl implements AssistanceService {

    @Autowired
    private AssistanceRepository assistanceRepository;
    @Autowired
    private AssistanceParticipantRepository assistanceParticipantRepository;

    @Override
    public void deleteByInscriptionIfExist(Integer inscriptionId) {
        List<Assistance> assistances = assistanceRepository.findByInscription(inscriptionId);
        assistances
                .forEach(assistance -> {
                    assistanceParticipantRepository.deleteByAssistance(assistance.getId());
                });
        if (!assistances.isEmpty()) {
            assistanceRepository.deleteByInscription(inscriptionId);
        }
    }
}
