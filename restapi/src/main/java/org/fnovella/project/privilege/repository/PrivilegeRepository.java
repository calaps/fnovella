package org.fnovella.project.privilege.repository;

import org.fnovella.project.privilege.model.UserPrivileges;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("privilegeRepository")
public interface PrivilegeRepository extends JpaRepository<UserPrivileges, Integer> {

}