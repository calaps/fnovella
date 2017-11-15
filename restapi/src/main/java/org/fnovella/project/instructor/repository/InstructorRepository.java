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

@Repository("instructorRepository")
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
	Instructor findByEmail(String email);
	Page<Instructor> findByFirstName(String firstName, Pageable pageable);
	Page<Instructor> findByAppCode(String appCode, Pageable pageable);
	Page<Instructor> findById(Integer id, Pageable pageable);
	Page<Instructor> findByFirstNameAndId(String firstName, Integer id, Pageable pageable);
	Page<Instructor> findByFirstNameAndAppCode(String firstName, String appCode, Pageable pageable);
	Page<Instructor> findByFirstNameAndAppCodeAndId(String firstName, String appCode, Integer id, Pageable pageable);
	Page<Instructor> findByAppCodeAndId(String appCode, Integer id, Pageable pageable);
	Instructor findByEmailAndPassword(String email, String password);
	
	@Modifying
    @Transactional
    @Query("delete from Instructor where privilege = ?1")
	void deleteByPrivilegeId(Integer privilege);
	List<Instructor> findByPrivilege(Integer privileId);
}