package org.fnovella.project.inscriptions_part_workshop.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.inscriptions_part_workshop.model.InscriptionsPartWorkshop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InscriptionsPartWorkshopRepository extends JpaRepository<InscriptionsPartWorkshop, Integer> {
	List<InscriptionsPartWorkshop> findByParticipantId(Integer participantId);
	List<InscriptionsPartWorkshop> findByWorkshopId(Integer WorkshopId);
	@Transactional
	void deleteByParticipantId(Integer participantId);
	@Transactional
	void deleteByWorkshopId(Integer workshopId);
}