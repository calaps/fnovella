package org.fnovella.project.program_location.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProgramLocation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer program;
	private Integer location;
	
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

	public Integer getLocation() {
		return location;
	}

	public void setLocation(Integer location) {
		this.location = location;
	}

	public ProgramLocation(Integer program, Integer location) {
		super();
		this.program = program;
		this.location = location;
	}

	public ProgramLocation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.program == null || this.program <= 0) errors.add("Program is required");
		if (this.location == null || this.location <= 0) errors.add("Location is required");
		return errors;
	}

	public void setUpdateFields(ProgramLocation programLocation) {
		if (programLocation.program != null && programLocation.program > 0) this.program = programLocation.program;
		if (programLocation.location != null && programLocation.location > 0) this.location = programLocation.location;
	}

}