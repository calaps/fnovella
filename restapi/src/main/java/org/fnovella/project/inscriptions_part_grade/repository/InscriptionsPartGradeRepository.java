package org.fnovella.project.inscriptions_part_grade.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.inscriptions_part_grade.model.InscriptionsPartGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InscriptionsPartGradeRepository extends JpaRepository<InscriptionsPartGrade, Integer> {
	List<InscriptionsPartGrade> findByParticipantId(Integer participantId);
	List<InscriptionsPartGrade> findByGradeId(Integer gradeId);
	@Transactional
	void deleteByParticipantId(Integer participantId);
	@Transactional
	void deleteByGradeId(Integer gradeId);
}