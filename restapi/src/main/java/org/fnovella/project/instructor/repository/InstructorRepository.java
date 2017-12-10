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

	@Query(value = "SELECT * FROM INSTRUCTOR where first_name like ?1% COLLATE Latin1_General_CI_AI", nativeQuery = true)
	List<Instructor> findByFirstNameStartingWith(String firstName);
	Page<Instructor> findByAppCode(String appCode, Pageable pageable);
	Page<Instructor> findById(Integer id, Pageable pageable);
	@Query(value = "SELECT * FROM INSTRUCTOR where first_name like ?1% COLLATE Latin1_General_CI_AI AND id = ?2", nativeQuery = true)
	List<Instructor> findByFirstNameStartingWithAndId(String firstName, Integer id);
	@Query(value = "SELECT * FROM INSTRUCTOR where first_name like ?1% COLLATE Latin1_General_CI_AI AND app_code = ?2", nativeQuery = true)
	List<Instructor> findByFirstNameStartingWithAndAppCode(String firstName, String appCode);
	@Query(value = "SELECT * FROM INSTRUCTOR where first_name like ?1% COLLATE Latin1_General_CI_AI AND app_code = ?2 AND id = ?3", nativeQuery = true)
	List<Instructor> findByFirstNameStartingWithAndAppCodeAndId(String firstName, String appCode, Integer id);
	Page<Instructor> findByAppCodeAndId(String appCode, Integer id, Pageable pageable);
	Instructor findByEmailAndPassword(String email, String password);
	
	@Modifying
    @Transactional
    @Query("delete from Instructor where privilege = ?1")
	void deleteByPrivilegeId(Integer privilege);
	List<Instructor> findByPrivilege(Integer privileId);
}