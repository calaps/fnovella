package org.fnovella.project.inscriptions_inst_grade.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.inscriptions_inst_grade.model.InscriptionsInstGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("inscriptionsInstGradeRepository")
public interface InscriptionsInstGradeRepository extends JpaRepository<InscriptionsInstGrade, Integer> {
	List<InscriptionsInstGrade> findByInstructorId(Integer instructorId);
	List<InscriptionsInstGrade> findByGradeId(Integer gradeId);
	@Transactional
	@Query("delete from InscriptionsInstGrade where instructorId = ?1")
	void deleteByInstructorId(Integer instructorId);
	@Transactional
	@Query("delete from InscriptionsInstGrade where gradeId = ?1")
	void deleteByGradeId(Integer courseId);
}