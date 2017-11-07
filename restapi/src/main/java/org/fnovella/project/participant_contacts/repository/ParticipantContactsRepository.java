package org.fnovella.project.participant_contacts.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.participant_contacts.model.ParticipantContacts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository("participantContactsRepository")
public interface ParticipantContactsRepository extends JpaRepository<ParticipantContacts, Integer> {
	List<ParticipantContacts> findByParticipantId(Integer participantId);
	@Transactional
	@Query("delete from ParticipantContacts where participantId = ?1")
	void deleteByParticipantId(Integer participantId);
	Page<ParticipantContacts> findByParticipantId(Integer participantId, Pageable pageable);
}
