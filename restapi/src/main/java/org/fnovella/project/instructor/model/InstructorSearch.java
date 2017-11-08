package org.fnovella.project.instructor.model;

import org.fnovella.project.instructor.repository.InstructorRepository;
import org.fnovella.project.utility.APIUtility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
			return instructorRepository.findByFirstNameAndAppCodeAndId(this.firstName, this.appCode, this.id, pageable);
		} else if (useName && useAppCode) {
			return instructorRepository.findByFirstNameAndAppCode(this.firstName, this.appCode, pageable);
		} else if (useName && useId) {
			return instructorRepository.findByFirstNameAndId(this.firstName, this.id, pageable);
		}  else if (useAppCode && useId) {
			return instructorRepository.findByAppCodeAndId(this.appCode, this.id, pageable);
		}  else if (useName) {
			return instructorRepository.findByFirstName(this.firstName, pageable);
		}  else if (useAppCode) {
			return instructorRepository.findByAppCode(this.appCode, pageable);
		}  else if (useId) {
			return instructorRepository.findById(this.id, pageable);
		} else {
			return instructorRepository.findAll(pageable);
		}
	}
}
