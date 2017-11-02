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
		boolean useId = this.id != null && this.id > 0;
		boolean useName = APIUtility.isNotNullOrEmpty(this.firstName);
		boolean useAppCode = APIUtility.isNotNullOrEmpty(this.appCode);
		if (useName && useAppCode && useId) {
			return userRepository.findByFirstNameAndAppCodeAndId(this.firstName, this.appCode, this.id, pageable);
		} else if (useName && useAppCode) {
			return userRepository.findByFirstNameAndAppCode(this.firstName, this.appCode, pageable);
		} else if (useName && useId) {
			return userRepository.findByFirstNameAndId(this.firstName, this.id, pageable);
		}  else if (useAppCode && useId) {
			return userRepository.findByAppCodeAndId(this.appCode, this.id, pageable);
		}  else if (useName) {
			return userRepository.findByFirstName(this.firstName, pageable);
		}  else if (useAppCode) {
			return userRepository.findByAppCode(this.appCode, pageable);
		}  else if (useId) {
			return userRepository.findById(this.id, pageable);
		} else {
			return userRepository.findAll(pageable);
		}
	}
	
}