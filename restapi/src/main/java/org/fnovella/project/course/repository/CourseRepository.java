package org.fnovella.project.course.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.course.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
	List<Course> findBySection(Integer section);

	List<Course> findByGrade(Integer grade);
	@Modifying
    @Transactional
    @Query("delete from Course where grade = ?1")
	void deleteByGrade(Integer grade);
	
	List<Course> findByProgramId(Integer programId);
	@Modifying
    @Transactional
    @Query("delete from Course where programId = ?1")
	void deleteByProgramId(Integer idProgram);
}