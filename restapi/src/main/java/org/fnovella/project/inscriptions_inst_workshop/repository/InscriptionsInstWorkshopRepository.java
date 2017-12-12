package org.fnovella.project.inscriptions_inst_workshop.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.inscriptions_inst_workshop.model.InscriptionsInstWorkshop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InscriptionsInstWorkshopRepository extends JpaRepository<InscriptionsInstWorkshop, Integer> {
	List<InscriptionsInstWorkshop> findByInstructorId(Integer instructorId);
	List<InscriptionsInstWorkshop> findByWorkshopId(Integer workshopId);
	@Transactional
	void deleteByWorkshopId(Integer workshopId);
}