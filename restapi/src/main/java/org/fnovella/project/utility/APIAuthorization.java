package org.fnovella.project.utility;

import org.fnovella.project.user.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class APIAuthorization {

	@Autowired
	private AppUserRepository appUserRepository;
	
	public boolean isAuthorized(String authToken) {
		return this.appUserRepository.findByToken(authToken) != null;
	}
	
}