package org.fnovella.project.instructor.model;

import org.fnovella.project.instructor.repository.InstructorRepository;
import org.fnovella.project.utility.APIUtility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class InstructorSearch {
	private Integer id;
	private String firstName;
	private String appCode;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getAppCode() {
		return appCode;
	}
	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}
	
	public Page<Instructor> getResults(InstructorRepository instructorRepository, Pageable pageable) {
		boolean useId = this.id != null && this.id > 0;
		boolean useName = APIUtility.isNotNullOrEmpty(this.firstName);
		boolean useAppCode = APIUtility.isNotNullOrEmpty(this.appCode);
		if (useName && useAppCode && useId) {
			List<Instructor> instructors = instructorRepository.findByFirstNameStartingWithAndAppCodeAndId(this.firstName, this.appCode, this.id);
			return new PageImpl<>(instructors, pageable, instructors.size());
		} else if (useName && useAppCode) {
			List<Instructor> instructors = instructorRepository.findByFirstNameStartingWithAndAppCode(this.firstName, this.appCode);
			return new PageImpl<>(instructors, pageable, instructors.size());
		} else if (useName && useId) {
			List<Instructor> instructors = instructorRepository.findByFirstNameStartingWithAndId(this.firstName, this.id);
			return new PageImpl<>(instructors, pageable, instructors.size());
		}  else if (useAppCode && useId) {
			return instructorRepository.findByAppCodeAndId(this.appCode, this.id, pageable);
		}  else if (useName) {
			List<Instructor> instructors = instructorRepository.findByFirstNameStartingWith(this.firstName);
			return new PageImpl<>(instructors, pageable, instructors.size());
		}  else if (useAppCode) {
			return instructorRepository.findByAppCode(this.appCode, pageable);
		}  else if (useId) {
			return instructorRepository.findById(this.id, pageable);
		} else {
			return instructorRepository.findAll(pageable);
		}
	}
}
