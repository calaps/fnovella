package org.fnovella.project.user.repository;

import javax.transaction.Transactional;

import org.fnovella.project.user.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<AppUser, Integer> {
	@Modifying
    @Transactional
    @Query("delete from AppUser where privilege = ?1")
	void deleteByPrivilegeId(Integer privileId);
	AppUser findByEmailAndPassword(String email, String password);
	AppUser findByEmail(String email);
}