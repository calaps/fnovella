package org.fnovella.project.user.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AppUserSession {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private int idAppUser;
	private String token;
	private boolean isAppUser;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getIdAppUser() {
		return idAppUser;
	}

	public void setIdAppUser(int idAppUser) {
		this.idAppUser = idAppUser;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	public boolean isAppUser() {
		return isAppUser;
	}

	public void setAppUser(boolean isAppUser) {
		this.isAppUser = isAppUser;
	}

	public AppUserSession(int idAppUser, String token, boolean isAppUser) {
		super();
		this.idAppUser = idAppUser;
		this.token = token;
		this.isAppUser = isAppUser;
	}

	public AppUserSession() {
		super();
	}
	
	//private AppUser appUser;
	
	/*@ManyToOne
	@JoinColumn(name = "id")
	public AppUser getAppUser() {
		return this.appUser;
	}*/
}