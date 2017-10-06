package org.fnovella.project.instructor.repository;

import org.fnovella.project.instructor.model.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("instructorRepository")
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {

}
