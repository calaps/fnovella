package org.fnovella.project.course.repository;

import org.fnovella.project.course.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    List<Course> findBySection(Integer section);

    List<Course> findByGrade(Integer grade);
    @Transactional
    void deleteByGrade(Integer grade);

    List<Course> findByProgramId(Integer programId);
    @Transactional
    void deleteByProgramId(Integer idProgram);
    @Transactional
    void deleteBySection(Integer sectionId);
}