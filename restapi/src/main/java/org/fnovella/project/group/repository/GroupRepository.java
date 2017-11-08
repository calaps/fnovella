package org.fnovella.project.group.repository;

import org.fnovella.project.group.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("groupRepository")
public interface GroupRepository extends JpaRepository<Group, Integer> {

}