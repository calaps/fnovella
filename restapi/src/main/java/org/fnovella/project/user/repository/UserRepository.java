package org.fnovella.project.user.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.user.model.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	List<AppUser> findByPrivilege(Integer privileId);
	AppUser findByEmailAndPassword(String email, String password);
	AppUser findByEmail(String email);
	@Query(value = "SELECT * FROM APP_USER where first_name like ?1% COLLATE Latin1_General_CI_AI", nativeQuery = true)
	List<AppUser> findByFirstNameStartingWith(String firstName);
	Page<AppUser> findByAppCode(String appCode, Pageable pageable);
	Page<AppUser> findById(Integer id, Pageable pageable);
	@Query(value = "SELECT * FROM APP_USER where first_name like ?1% COLLATE Latin1_General_CI_AI AND id = ?2", nativeQuery = true)
	List<AppUser> findByFirstNameStartingWithAndId(String firstName, Integer id);
	@Query(value = "SELECT * FROM APP_USER where first_name like ?1% COLLATE Latin1_General_CI_AI AND app_code = ?2", nativeQuery = true)
	List<AppUser> findByFirstNameStartingWithAndAppCode(String firstName, String appCode);
	@Query(value = "SELECT * FROM APP_USER where first_name like ?1% COLLATE Latin1_General_CI_AI AND app_code = ?2 AND id = ?3", nativeQuery = true)
	List<AppUser> findByFirstNameStartingWithAndAppCodeAndId(String firstName, String appCode, Integer id);
	Page<AppUser> findByAppCodeAndId(String appCode, Integer id, Pageable pageable);
}