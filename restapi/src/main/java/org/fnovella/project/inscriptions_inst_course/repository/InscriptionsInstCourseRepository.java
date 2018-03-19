package org.fnovella.project.inscriptions_inst_course.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.inscriptions_inst_course.model.InscriptionsInstCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InscriptionsInstCourseRepository extends JpaRepository<InscriptionsInstCourse, Integer> {
	List<InscriptionsInstCourse> findByInstructorId(Integer instructorId);
	List<InscriptionsInstCourse> findByCourseId(Integer courseId);
	@Transactional
	void deleteByInstructorId(Integer instructorId);
	@Transactional
	void deleteByCourseId(Integer courseId);
}