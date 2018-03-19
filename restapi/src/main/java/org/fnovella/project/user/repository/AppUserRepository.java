package org.fnovella.project.user.repository;

import javax.transaction.Transactional;

import org.fnovella.project.user.model.AppUserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("appUserRepository")
public interface AppUserRepository extends JpaRepository<AppUserSession, Long> {

	AppUserSession findByToken(String token);
	@Modifying
    @Transactional
    @Query("delete from AppUserSession where idAppUser = ?1")
	void deleteByIdAppUser(Integer id);
	
}