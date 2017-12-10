package org.fnovella.project.inscriptions.service;

import org.fnovella.project.assistance.service.AssistanceService;
import org.fnovella.project.inscriptions.model.Inscription;
import org.fnovella.project.inscriptions.repository.InscriptionRepository;
import org.fnovella.project.inscriptions_participants.repository.InscriptionParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class InscriptionServiceImpl implements InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;
    @Autowired
    private InscriptionParticipantRepository inscriptionParticipantRepository;
    @Autowired
    private AssistanceService assistanceService;

    @Override
    public void deleteByGroupIdIfExist(Integer groupId) {
        List<Inscription> inscriptions = inscriptionRepository.findByGroup(groupId);
        inscriptions
                .forEach(inscription -> {
                    assistanceService.deleteByInscriptionIfExist(inscription.getId());
                    inscriptionParticipantRepository.deleteByInscription(inscription.getId());
                });
        if (!inscriptions.isEmpty()) {
            inscriptionRepository.deleteByGroup(groupId);
        }

    }
}
