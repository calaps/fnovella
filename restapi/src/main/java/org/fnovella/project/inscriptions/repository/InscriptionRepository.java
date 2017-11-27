package org.fnovella.project.inscriptions.repository;

import org.fnovella.project.inscriptions.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscriptionRepository extends JpaRepository<Inscription, Integer> {
    List<Inscription> findByGroup(Integer group);
}
