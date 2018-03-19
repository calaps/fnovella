package org.fnovella.project.program_app_user.model;

import org.fnovella.project.user.model.AppUser;

import java.util.ArrayList;

import javax.persistence.*;

@Entity
public class ProgramAppUser {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer program;

	private Integer appUser;

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getProgram() {
		return program;
	}

	public void setProgram(Integer program) {
		this.program = program;
	}

	public Integer getAppUser() {
		return appUser;
	}

	public void setAppUser(Integer appUser) {
		this.appUser = appUser;
	}

	public ProgramAppUser(Integer id, Integer program, Integer appUser) {
		super();
		this.id = id;
		this.program = program;
		this.appUser = appUser;
	}

	public ProgramAppUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.program == null || this.program <= 0) errors.add("Program is required");
		if (this.appUser == null || this.appUser <= 0) errors.add("App User is required");
		return errors;
	}

	public void setUpdateFields(ProgramAppUser programAppUser) {
		if (programAppUser.program != null && programAppUser.program > 0) this.program = programAppUser.program;
		if (programAppUser.appUser != null && programAppUser.appUser > 0) this.appUser = programAppUser.appUser;
	}

}