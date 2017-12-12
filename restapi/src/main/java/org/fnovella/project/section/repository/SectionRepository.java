package org.fnovella.project.section.repository;

import org.fnovella.project.section.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<Section, Integer> {
	List<Section> findByGrade(Integer grade);

	void deleteByGrade(Integer gradeId);
}