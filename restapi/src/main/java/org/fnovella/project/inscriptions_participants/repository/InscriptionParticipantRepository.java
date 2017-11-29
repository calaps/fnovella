package org.fnovella.project.inscriptions_participants.repository;

import org.fnovella.project.inscriptions_participants.model.InscriptionParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InscriptionParticipantRepository extends JpaRepository<InscriptionParticipant, Integer> {
    List<InscriptionParticipant> findByInscription(Integer inscription);

    List<InscriptionParticipant> findByParticipant(Integer participant);
}
