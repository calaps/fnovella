package org.fnovella.project.participant.repository;

import org.fnovella.project.participant.model.Participant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
	Participant findByEmail(String email);

	@Query(value = "SELECT * FROM PARTICIPANT where first_name like ?1% COLLATE Latin1_General_CI_AI", nativeQuery = true)
	List<Participant> findByFirstNameStartingWith(String firstName);
	Page<Participant> findByAppCode(String appCode, Pageable pageable);
	Page<Participant> findById(Integer id, Pageable pageable);
	@Query(value = "SELECT * FROM PARTICIPANT where first_name COLLATE Latin1_General_CI_AI like ?1% AND id = ?2", nativeQuery = true)
	List<Participant> findByFirstNameStartingWithAndId(String firstName, Integer id);
	@Query(value = "SELECT * FROM PARTICIPANT where first_name COLLATE Latin1_General_CI_AI like ?1% AND app_code = ?2", nativeQuery = true)
	List<Participant> findByFirstNameStartingWithAndAppCode(String firstName, String appCode);
	@Query(value = "SELECT * FROM PARTICIPANT where first_name COLLATE Latin1_General_CI_AI like ?1% AND app_code = ?2 AND id = ?3", nativeQuery = true)
	List<Participant> findByFirstNameStartingWithAndAppCodeAndId(String firstName, String appCode, Integer id);
	Page<Participant> findByAppCodeAndId(String appCode, Integer id, Pageable pageable);

}