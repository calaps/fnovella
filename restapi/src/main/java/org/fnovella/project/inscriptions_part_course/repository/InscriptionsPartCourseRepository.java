package org.fnovella.project.inscriptions_part_course.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.inscriptions_part_course.model.InscriptionsPartCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("inscriptionsPartCourseRepository")
public interface InscriptionsPartCourseRepository extends JpaRepository<InscriptionsPartCourse, Integer> {
	List<InscriptionsPartCourse> findByParticipantId(Integer participantId);
	List<InscriptionsPartCourse> findByCourseId(Integer courseId);
	@Transactional
	@Query("delete from InscriptionsPartCourse where participantId = ?1")
	void deleteByParticipantId(Integer participantId);
	@Transactional
	@Query("delete from InscriptionsPartCourse where courseId = ?1")
	void deleteByCourseId(Integer courseId);
}