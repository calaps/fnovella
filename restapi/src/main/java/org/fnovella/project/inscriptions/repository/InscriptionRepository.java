package org.fnovella.project.inscriptions.repository;

import org.fnovella.project.inscriptions.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Integer> {
    List<Inscription> findByGroup(Integer group);
    @Transactional
    void deleteByGroup(Integer groupId);
}
