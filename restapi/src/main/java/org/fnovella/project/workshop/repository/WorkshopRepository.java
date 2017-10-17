package org.fnovella.project.workshop.repository;

import javax.transaction.Transactional;

import org.fnovella.project.workshop.model.Workshop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("workshopRepository")
public interface WorkshopRepository extends JpaRepository<Workshop, Integer> {
	@Modifying
    @Transactional
    @Query("delete from Workshop where location = ?1")
	void deleteByLocationId(Integer id);
}