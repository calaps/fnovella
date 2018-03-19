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
	AppUser findByDocumentValue(String documentValue);
	@Query(value = "SELECT * FROM APP_USER where first_name like ?1% COLLATE Latin1_General_CI_AI", nativeQuery = true)
	List<AppUser> findByFirstNameStartingWith(String firstName);
	Page<AppUser> findByAppCode(String appCode, Pageable pageable);
	Page<AppUser> findByDocumentValue(String documentValue, Pageable pageable);
	@Query(value = "SELECT * FROM APP_USER where first_name like ?1% COLLATE Latin1_General_CI_AI AND document_value = ?2", nativeQuery = true)
	List<AppUser> findByFirstNameStartingWithAndDocumentValue(String firstName, String documentValue);
	@Query(value = "SELECT * FROM APP_USER where first_name like ?1% COLLATE Latin1_General_CI_AI AND app_code = ?2", nativeQuery = true)
	List<AppUser> findByFirstNameStartingWithAndAppCode(String firstName, String appCode);
	@Query(value = "SELECT * FROM APP_USER where first_name like ?1% COLLATE Latin1_General_CI_AI AND app_code = ?2 AND document_value = ?3", nativeQuery = true)
	List<AppUser> findByFirstNameStartingWithAndAppCodeAndDocumentValue(String firstName, String appCode, String documentValue);
	Page<AppUser> findByAppCodeAndDocumentValue(String appCode, String documentValue, Pageable pageable);
}