package org.fnovella.project.program.repository;

import org.fnovella.project.program.model.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Integer> {
	Page<Program> findByType(Pageable pageable, boolean type);
}