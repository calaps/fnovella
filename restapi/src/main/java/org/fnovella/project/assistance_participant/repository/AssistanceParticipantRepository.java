package org.fnovella.project.assistance_participant.repository;

import org.fnovella.project.assistance_participant.model.AssistanceParticipant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AssistanceParticipantRepository extends JpaRepository<AssistanceParticipant, Integer>{
    @Transactional
    void deleteByAssistance(Integer assistanceId);

    Page<AssistanceParticipant> findByAssistanceIn(List<Integer> assistanceIds, Pageable pageable);
}
