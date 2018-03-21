package org.fnovella.project.user.repository;

import java.util.List;

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
	List<AppUser> findByPrivilege(Integer privileId);
	AppUser findByEmailAndPassword(String email, String password);
	AppUser findByEmail(String email);
	AppUser findByDocumentValue(String documentValue);
	@Query(value = "SELECT * FROM APP_USER WHERE first_name LIKE ?1% COLLATE Latin1_General_CI_AI "
	        + "AND second_name LIKE ?2% COLLATE Latin1_General_CI_AI "
	        + "AND first_lastname LIKE ?3% COLLATE Latin1_General_CI_AI "
	        + "AND second_lastname LIKE ?4% COLLATE Latin1_General_CI_AI ", nativeQuery = true)
	List<AppUser> findByNamesStartingWith(
	        String firstName, String secondName, String firstLastName, String secondLastName);
	@Query(value = "SELECT * FROM APP_USER WHERE first_name LIKE ?1% COLLATE Latin1_General_CI_AI "
	        + "AND second_name LIKE ?2% COLLATE Latin1_General_CI_AI "
            + "AND first_lastname LIKE ?3% COLLATE Latin1_General_CI_AI "
            + "AND second_lastname LIKE ?4% COLLATE Latin1_General_CI_AI "
	        + "AND document_value = ?5", nativeQuery = true)
	List<AppUser> findByNamesStartingWithAndDocumentValue(
	        String firstName, String secondName, String firstLastName, String secondLastName, String documentValue);
	@Query(value = "SELECT * FROM APP_USER WHERE first_name LIKE ?1% COLLATE Latin1_General_CI_AI "
	        + "AND second_name LIKE ?2% COLLATE Latin1_General_CI_AI "
            + "AND first_lastname LIKE ?3% COLLATE Latin1_General_CI_AI "
            + "AND second_lastname LIKE ?4% COLLATE Latin1_General_CI_AI "
	        + "AND app_code = ?5", nativeQuery = true)
	List<AppUser> findByNamesStartingWithAndAppCode(
	        String firstName, String secondName, String firstLastName, String secondLastName, String appCode);
	@Query(value = "SELECT * FROM APP_USER WHERE first_name LIKE ?1% COLLATE Latin1_General_CI_AI "
	        + "AND second_name LIKE ?2% COLLATE Latin1_General_CI_AI "
            + "AND first_lastname LIKE ?3% COLLATE Latin1_General_CI_AI "
            + "AND second_lastname LIKE ?4% COLLATE Latin1_General_CI_AI "
	        + "AND app_code = ?5 "
	        + "AND document_value = ?6", nativeQuery = true)
	List<AppUser> findByNamesStartingWithAndAppCodeAndDocumentValue(
	        String firstName, String secondName, String firstLastName, String secondLastName, String appCode, String documentValue);
}