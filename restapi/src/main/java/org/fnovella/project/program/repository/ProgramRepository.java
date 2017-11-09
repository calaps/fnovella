package org.fnovella.project.program.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.program.model.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProgramRepository extends JpaRepository<Program, Integer> {
	Page<Program> findByType(Pageable pageable, boolean type);
	List<Program> findByResponsable(Integer responsable);
	@Query("delete from Program where responsable = ?1")
	@Transactional
	void deleteByResponsable(Integer responsable);
}