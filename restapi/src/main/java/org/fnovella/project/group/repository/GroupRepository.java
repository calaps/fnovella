package org.fnovella.project.group.repository;

import java.util.List;

import org.fnovella.project.group.model.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {

    Page<Group> findByCourseId(Integer course, Pageable pageable);
    Page<Group> findByWorkshopId(Integer workshopId, Pageable pageable);
    Page<Group> findByDivisionId(Integer divisionId, Pageable pageable);
    Page<Group> findBySection(Integer section, Pageable pageable);
    Page<Group> findByInstructor(Integer instructor, Pageable pageable);
    List<Group> findByWorkshopId(Integer workshopId);
    List<Group> findByCourseId(Integer courseId);
    List<Group> findByDivisionId(Integer divisionId);
    List<Group> findBySection(Integer sectionId);

}