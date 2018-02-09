package org.fnovella.project.participant.service;

import org.fnovella.project.utility.APIUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private EntityManager em;

    @Override
    public Integer getActiveParticipant(Integer groupId) {
        List<Integer> participants = this.getParticipants(groupId);
        Integer countActive = 0;
        if (CollectionUtils.isEmpty(participants)) {
            return 0;
        } else {
            for (Integer participantId : participants) {
                countActive += this.isActiveParticipant(participantId);
            }
            return countActive * 100 / participants.size();
        }        
    }

    private Integer isActiveParticipant(Integer idParticipant) {
        StoredProcedureQuery query = em.createStoredProcedureQuery("active_participants");
        query.registerStoredProcedureParameter("participant_id", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("is_active", Integer.class, ParameterMode.OUT);
        query.setParameter("participant_id", idParticipant);
        query.execute();
        return (Integer) query.getOutputParameterValue("is_active");
    }

    @Override
    public Integer getTotalParticipant(Integer groupId) {
        return this.getParticipants(groupId).size();
    }

    private List<Integer> getParticipants(Integer groupId) {
        StoredProcedureQuery query = em.createStoredProcedureQuery("total_participants");
        query.registerStoredProcedureParameter("group_id", Integer.class, ParameterMode.IN);
        query.setParameter("group_id", groupId);
        query.execute();
        return (List<Integer>) query.getResultList();
    }

    @Override
    public Integer getSustainedParticipant(Integer groupId) {
        return APIUtility.participantOperation(em, "sustained", groupId);
    }

    @Override
    public Integer getJustifiedParticipant(Integer groupId) {
        return APIUtility.participantOperation(em, "justified", groupId);
    }
}
