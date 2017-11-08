package org.fnovella.project.section.repository;

import org.fnovella.project.section.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("sectionRepository")
public interface SectionRepository extends JpaRepository<Section, Integer> {

}