package org.fnovella.project.user.model;

import org.fnovella.project.user.repository.UserRepository;
import org.fnovella.project.utility.APIUtility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class UserSearch {

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
	
	public Page<AppUser> getResults(UserRepository userRepository, Pageable pageable) {

		boolean useDocument = this.documentValue != null && !this.documentValue.trim().equals("");
		boolean useName = APIUtility.isNotNullOrEmpty(this.firstName);
		boolean useAppCode = APIUtility.isNotNullOrEmpty(this.appCode);
		if (useName && useAppCode && useDocument) {
			List<AppUser> users = userRepository.findByFirstNameStartingWithAndAppCodeAndDocumentValue(this.firstName, this.appCode, this.documentValue);
			return new PageImpl<>(users, pageable, users.size());
		} else if (useName && useAppCode) {
			List<AppUser> users = userRepository.findByFirstNameStartingWithAndAppCode(this.firstName, this.appCode);
			return new PageImpl<>(users, pageable, users.size());
		} else if (useName && useDocument) {
			List<AppUser> users = userRepository.findByFirstNameStartingWithAndDocumentValue(this.firstName, this.documentValue);
			return new PageImpl<>(users, pageable, users.size());
		}  else if (useAppCode && useDocument) {
			return userRepository.findByAppCodeAndDocumentValue(this.appCode, this.documentValue, pageable);
		}  else if (useName) {
			List<AppUser> users = userRepository.findByFirstNameStartingWith(this.firstName);
			return new PageImpl<>(users, pageable, users.size());
		}  else if (useAppCode) {
			return userRepository.findByAppCode(this.appCode, pageable);
		}  else if (useDocument) {
			return userRepository.findByDocumentValue(this.documentValue, pageable);
		} else {
			return userRepository.findAll(pageable);
		}
	}



}