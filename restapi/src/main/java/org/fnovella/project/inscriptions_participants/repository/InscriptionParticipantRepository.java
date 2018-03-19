package org.fnovella.project.inscriptions_participants.repository;

import org.fnovella.project.inscriptions_participants.model.InscriptionParticipant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface InscriptionParticipantRepository extends JpaRepository<InscriptionParticipant, Integer> {
    Page<InscriptionParticipant> findByInscription(Integer inscription, Pageable pageable);

    Page<InscriptionParticipant> findByParticipant(Integer participant, Pageable pageable);
    @Transactional
    void deleteByInscription(Integer id);
}
