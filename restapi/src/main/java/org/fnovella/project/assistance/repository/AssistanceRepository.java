package org.fnovella.project.assistance.repository;

import org.fnovella.project.assistance.model.Assistance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AssistanceRepository extends JpaRepository<Assistance, Integer> {
    Page<Assistance> findByInscription(Integer inscription, Pageable pageable);

    List<Assistance> findByInscription(Integer inscription);

    @Transactional
    void deleteByInscription(Integer inscriptionId);

    Page<Assistance> findByInscriptionIn(List<Integer> inscriptionIds, Pageable pageable);
    List<Assistance> findByInscriptionIn(List<Integer> inscriptionIds);
}
