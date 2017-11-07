package org.fnovella.project.program_location.repository;

import org.fnovella.project.program_location.model.ProgramLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("programLocationRepository")
public interface ProgramLocationRepository extends JpaRepository<ProgramLocation, Integer> {
	
}