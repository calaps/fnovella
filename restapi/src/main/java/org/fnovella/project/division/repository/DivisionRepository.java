package org.fnovella.project.division.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.division.model.Division;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DivisionRepository extends JpaRepository<Division, Integer> {
	
	List<Division> findByPrograma(Integer programId);

	@Transactional
	void deleteByPrograma(Integer idProgram);

    Page<Division> findByLocation(Integer location, Pageable pageable);
}