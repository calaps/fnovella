package org.fnovella.project.inscriptions_part_grade.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.inscriptions_part_grade.model.InscriptionsPartGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("inscriptionsPartGradeRepository")
public interface InscriptionsPartGradeRepository extends JpaRepository<InscriptionsPartGrade, Integer> {
	List<InscriptionsPartGrade> findByParticipantId(Integer participantId);
	List<InscriptionsPartGrade> findByGradeId(Integer gradeId);
	@Transactional
	@Query("delete from InscriptionsPartGrade where participantId = ?1")
	void deleteByParticipantId(Integer participantId);
	@Transactional
	@Query("delete from InscriptionsPartGrade where gradeId = ?1")
	void deleteByGradeId(Integer gradeId);
}