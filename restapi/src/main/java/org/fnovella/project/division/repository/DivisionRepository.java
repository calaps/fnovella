package org.fnovella.project.division.repository;

import org.fnovella.project.division.model.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("divisionRepository")
public interface DivisionRepository extends JpaRepository<Division, Integer> {
	
}