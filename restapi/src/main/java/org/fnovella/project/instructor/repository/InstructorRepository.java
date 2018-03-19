package org.fnovella.project.instructor.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.instructor.model.Instructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
	Instructor findByEmail(String email);
	Instructor findByDocumentValue(String documentValue);

	@Query(value = "SELECT * FROM INSTRUCTOR where first_name like ?1% COLLATE Latin1_General_CI_AI", nativeQuery = true)
	List<Instructor> findByFirstNameStartingWith(String firstName);
	Page<Instructor> findByAppCode(String appCode, Pageable pageable);
	Page<Instructor> findByDocumentValue(String documentValue, Pageable pageable);
	@Query(value = "SELECT * FROM INSTRUCTOR where first_name like ?1% COLLATE Latin1_General_CI_AI AND document_value = ?2", nativeQuery = true)
	List<Instructor> findByFirstNameStartingWithAndDocumentValue(String firstName, String documentValue);
	@Query(value = "SELECT * FROM INSTRUCTOR where first_name like ?1% COLLATE Latin1_General_CI_AI AND app_code = ?2", nativeQuery = true)
	List<Instructor> findByFirstNameStartingWithAndAppCode(String firstName, String appCode);
	@Query(value = "SELECT * FROM INSTRUCTOR where first_name like ?1% COLLATE Latin1_General_CI_AI AND app_code = ?2 AND document_value = ?3", nativeQuery = true)
	List<Instructor> findByFirstNameStartingWithAndAppCodeAndDocumentValue(String firstName, String appCode, String documentValue);
	Page<Instructor> findByAppCodeAndDocumentValue(String appCode, String documentValue, Pageable pageable);
	Instructor findByEmailAndPassword(String email, String password);
	
	@Modifying
    @Transactional
    @Query("delete from Instructor where privilege = ?1")
	void deleteByPrivilegeId(Integer privilege);
	List<Instructor> findByPrivilege(Integer privileId);
}