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
        String normalizedFirstName = APIUtility.normalizeText(this.firstName);

		boolean useId = this.id != null && this.id > 0;
		boolean useName = APIUtility.isNotNullOrEmpty(this.firstName);
		boolean useAppCode = APIUtility.isNotNullOrEmpty(this.appCode);
		if (useName && useAppCode && useId) {
			Page<Instructor> result = instructorRepository.findByFirstNameStartingWithAndAppCodeAndId(this.firstName, this.appCode, this.id, pageable);
			Page<Instructor> normalizedResult = instructorRepository.findByFirstNameStartingWithAndAppCodeAndId(normalizedFirstName, this.appCode, this.id, pageable);
			return APIUtility.mergePages(result, normalizedResult, pageable);
		} else if (useName && useAppCode) {
			Page<Instructor> result = instructorRepository.findByFirstNameStartingWithAndAppCode(this.firstName, this.appCode, pageable);
			Page<Instructor> normalizedResult = instructorRepository.findByFirstNameStartingWithAndAppCode(normalizedFirstName, this.appCode, pageable);
			return APIUtility.mergePages(result, normalizedResult, pageable);
		} else if (useName && useId) {
			Page<Instructor> result = instructorRepository.findByFirstNameStartingWithAndId(this.firstName, this.id, pageable);
			Page<Instructor> normalizedResult = instructorRepository.findByFirstNameStartingWithAndId(normalizedFirstName, this.id, pageable);
			return APIUtility.mergePages(result, normalizedResult, pageable);
		}  else if (useAppCode && useId) {
			return instructorRepository.findByAppCodeAndId(this.appCode, this.id, pageable);
		}  else if (useName) {
			Page<Instructor> result = instructorRepository.findByFirstNameStartingWith(this.firstName, pageable);
			Page<Instructor> normalizedResult = instructorRepository.findByFirstNameStartingWith(normalizedFirstName, pageable);
			return APIUtility.mergePages(result, normalizedResult, pageable);
		}  else if (useAppCode) {
			return instructorRepository.findByAppCode(this.appCode, pageable);
		}  else if (useId) {
			return instructorRepository.findById(this.id, pageable);
		} else {
			return instructorRepository.findAll(pageable);
		}
	}
}
