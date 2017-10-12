package org.fnovella.project.program.repository;

import java.util.List;

import org.fnovella.project.program.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Integer> {

	List<Program> findByType(boolean type);
}