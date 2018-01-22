package org.fnovella.project.instructor.model;

import org.fnovella.project.instructor.repository.InstructorRepository;
import org.fnovella.project.utility.APIUtility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class InstructorSearch {
	private String documentValue;
	private String firstName;
	private String appCode;

	public String getDocumentValue() {
		return documentValue;
	}

	public void setDocumentValue(String documentValue) {
		this.documentValue = documentValue;
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
		boolean useDocument = this.documentValue != null && !this.documentValue.trim().equals("");
		boolean useName = APIUtility.isNotNullOrEmpty(this.firstName);
		boolean useAppCode = APIUtility.isNotNullOrEmpty(this.appCode);
		if (useName && useAppCode && useDocument) {
			List<Instructor> instructors = instructorRepository.findByFirstNameStartingWithAndAppCodeAndDocumentValue(this.firstName, this.appCode, this.documentValue);
			return new PageImpl<>(instructors, pageable, instructors.size());
		} else if (useName && useAppCode) {
			List<Instructor> instructors = instructorRepository.findByFirstNameStartingWithAndAppCode(this.firstName, this.appCode);
			return new PageImpl<>(instructors, pageable, instructors.size());
		} else if (useName && useDocument) {
			List<Instructor> instructors = instructorRepository.findByFirstNameStartingWithAndDocumentValue(this.firstName, this.documentValue);
			return new PageImpl<>(instructors, pageable, instructors.size());
		}  else if (useAppCode && useDocument) {
			return instructorRepository.findByAppCodeAndDocumentValue(this.appCode, this.documentValue, pageable);
		}  else if (useName) {
			List<Instructor> instructors = instructorRepository.findByFirstNameStartingWith(this.firstName);
			return new PageImpl<>(instructors, pageable, instructors.size());
		}  else if (useAppCode) {
			return instructorRepository.findByAppCode(this.appCode, pageable);
		}  else if (useDocument) {
			return instructorRepository.findByDocumentValue(this.documentValue, pageable);
		} else {
			return instructorRepository.findAll(pageable);
		}
	}
}
