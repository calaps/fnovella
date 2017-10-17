package org.fnovella.project.satisfaction.repository;

import org.fnovella.project.satisfaction.model.Satisfaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("satisfactionRepository")
public interface SatisfactionRepository extends JpaRepository<Satisfaction, Integer> {
}