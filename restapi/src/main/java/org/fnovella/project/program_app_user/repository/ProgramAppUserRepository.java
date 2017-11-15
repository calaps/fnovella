package org.fnovella.project.program_app_user.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.program_app_user.model.ProgramAppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("programAppUserRepository")
public interface ProgramAppUserRepository extends JpaRepository<ProgramAppUser, Integer> {
	List<ProgramAppUser> findByAppUser(Integer appUser);
	@Query("delete from ProgramAppUser where appUser = ?1")
	@Transactional
	void deleteByAppUser(Integer appUser);
	
	List<ProgramAppUser> findByProgram(Integer programId);
	@Modifying
    @Transactional
    @Query("delete from ProgramAppUser where program = ?1")
	void deleteByProgram(Integer programId);
}