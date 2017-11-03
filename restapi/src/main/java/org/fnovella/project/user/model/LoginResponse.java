package org.fnovella.project.user.model;

import java.util.List;

public class LoginResponse {

	public AppUser user;
	public String token;
	public List<String> errors;
	
	public AppUser getUser() {
		return user;
	}
	public void setUser(AppUser user) {
		this.user = user;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public List<String> getErrors() {
		return errors;
	}
	public void setError(List<String> errors) {
		this.errors = errors;
	}
	public LoginResponse(AppUser user, String token, List<String> errors) {
		super();
		this.user = user;
		this.token = token;
		this.errors = errors;
	}
	public LoginResponse() {
		super();
	}
	
}
