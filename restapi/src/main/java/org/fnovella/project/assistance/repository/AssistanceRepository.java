package org.fnovella.project.assistance.repository;

import org.fnovella.project.assistance.model.Assistance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssistanceRepository extends JpaRepository<Assistance, Integer> {
}
