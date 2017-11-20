package org.fnovella.project.user.model;

import org.fnovella.project.user.repository.UserRepository;
import org.fnovella.project.utility.APIUtility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class UserSearch {

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
	
	public Page<AppUser> getResults(UserRepository userRepository, Pageable pageable) {
		String normalizeText = APIUtility.normalizeText(this.firstName);
		boolean useId = this.id != null && this.id > 0;
		boolean useName = APIUtility.isNotNullOrEmpty(this.firstName);
		boolean useAppCode = APIUtility.isNotNullOrEmpty(this.appCode);
		if (useName && useAppCode && useId) {
			Page<AppUser> result = userRepository.findByFirstNameStartingWithAndAppCodeAndId(this.firstName, this.appCode, this.id, pageable);
			Page<AppUser> normalizedResult = userRepository.findByFirstNameStartingWithAndAppCodeAndId(normalizeText, this.appCode, this.id, pageable);
			return APIUtility.mergePages(result, normalizedResult, pageable);
		} else if (useName && useAppCode) {
			Page<AppUser> result = userRepository.findByFirstNameStartingWithAndAppCode(this.firstName, this.appCode, pageable);
			Page<AppUser> normalizedResult = userRepository.findByFirstNameStartingWithAndAppCode(normalizeText, this.appCode, pageable);
			return APIUtility.mergePages(result, normalizedResult, pageable);
		} else if (useName && useId) {
			Page<AppUser> result = userRepository.findByFirstNameStartingWithAndId(this.firstName, this.id, pageable);
			Page<AppUser> normalizedResult = userRepository.findByFirstNameStartingWithAndId(normalizeText, this.id, pageable);
			return APIUtility.mergePages(result, normalizedResult, pageable);
		}  else if (useAppCode && useId) {
			return userRepository.findByAppCodeAndId(this.appCode, this.id, pageable);
		}  else if (useName) {
			Page<AppUser> result = userRepository.findByFirstNameStartingWith(this.firstName, pageable);
			Page<AppUser> normalizedResult = userRepository.findByFirstNameStartingWith(normalizeText, pageable);
			return APIUtility.mergePages(result, normalizedResult, pageable);
		}  else if (useAppCode) {
			return userRepository.findByAppCode(this.appCode, pageable);
		}  else if (useId) {
			return userRepository.findById(this.id, pageable);
		} else {
			return userRepository.findAll(pageable);
		}
	}



}