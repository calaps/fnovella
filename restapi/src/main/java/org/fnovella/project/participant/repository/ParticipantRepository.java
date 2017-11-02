package org.fnovella.project.participant.repository;

import org.fnovella.project.participant.model.Participant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("participantRepository")
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
	Participant findByEmail(String email);
	Page<Participant> findByFirstName(String firstName, Pageable pageable);
	Page<Participant> findByAppCode(String appCode, Pageable pageable);
	Page<Participant> findById(Integer id, Pageable pageable);
	Page<Participant> findByFirstNameAndId(String firstName, Integer id, Pageable pageable);
	Page<Participant> findByFirstNameAndAppCode(String firstName, String appCode, Pageable pageable);
	Page<Participant> findByFirstNameAndAppCodeAndId(String firstName, String appCode, Integer id, Pageable pageable);
	Page<Participant> findByAppCodeAndId(String appCode, Integer id, Pageable pageable);
}