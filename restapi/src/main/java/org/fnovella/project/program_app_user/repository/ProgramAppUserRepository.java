package org.fnovella.project.program_app_user.repository;


import org.fnovella.project.program_app_user.model.ProgramAppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("programAppUserRepository")
public interface ProgramAppUserRepository extends JpaRepository<ProgramAppUser, Integer> {

}