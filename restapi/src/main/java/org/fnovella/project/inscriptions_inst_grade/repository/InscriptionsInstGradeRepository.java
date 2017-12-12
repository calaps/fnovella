package org.fnovella.project.inscriptions_inst_grade.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.inscriptions_inst_grade.model.InscriptionsInstGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InscriptionsInstGradeRepository extends JpaRepository<InscriptionsInstGrade, Integer> {
	List<InscriptionsInstGrade> findByInstructorId(Integer instructorId);
	List<InscriptionsInstGrade> findByGradeId(Integer gradeId);
	@Transactional
	void deleteByGradeId(Integer courseId);
}