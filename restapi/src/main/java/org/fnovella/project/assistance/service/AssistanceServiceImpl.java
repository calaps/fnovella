package org.fnovella.project.assistance.service;

import org.fnovella.project.assistance.model.Assistance;
import org.fnovella.project.assistance.model.AssistanceInsight;
import org.fnovella.project.assistance.repository.AssistanceRepository;
import org.fnovella.project.assistance_participant.repository.AssistanceParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AssistanceServiceImpl implements AssistanceService {

    @Autowired
    private AssistanceRepository assistanceRepository;
    @Autowired
    private AssistanceParticipantRepository assistanceParticipantRepository;
    @Autowired
    private EntityManager em;

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

    @Override
    public AssistanceInsight getAssistanceInsight(Integer groupId) {
        AssistanceInsight insight = new AssistanceInsight();
        StoredProcedureQuery query = em.createStoredProcedureQuery("accomplishment");
        query.registerStoredProcedureParameter("group_id", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("accomplishment", Integer.class, ParameterMode.OUT);
        query.registerStoredProcedureParameter("total_assistance", Integer.class, ParameterMode.OUT);
        query.registerStoredProcedureParameter("session_assistance", Integer.class, ParameterMode.OUT);
        query.setParameter("group_id", groupId);
        query.execute();
        insight.setAccomplishment(query.getOutputParameterValue("accomplishment") != null ? (Integer) query.getOutputParameterValue("accomplishment") : 0);
        insight.setSessionAssistance(query.getOutputParameterValue("total_assistance") != null ? (Integer) query.getOutputParameterValue("total_assistance") : 0);
        insight.setTotalAssistance(query.getOutputParameterValue("session_assistance") != null ? (Integer) query.getOutputParameterValue("session_assistance") : 0);
        return insight;
    }
}
