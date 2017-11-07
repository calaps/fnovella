package org.fnovella.project.grade.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;

@Entity
public class Grade {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String name;
	private String level;
	private String description;
	private Integer location;
	private Integer programId;
	private Integer instructorId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getLocation() {
		return location;
	}
	public void setLocation(Integer location) {
		this.location = location;
	}
	public Integer getProgramId() {
		return programId;
	}
	public void setProgramId(Integer programId) {
		this.programId = programId;
	}
	public Integer getInstructorId() {
		return instructorId;
	}
	public void setInstructorId(Integer instructorId) {
		this.instructorId = instructorId;
	}
	public Grade(String name, String level, String description, Integer location, Integer programId,
			Integer instructorId, Integer section) {
		super();
		this.name = name;
		this.level = level;
		this.description = description;
		this.location = location;
		this.programId = programId;
		this.instructorId = instructorId;
	}
	public Grade() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.level)) errors.add("Level is required");
		if (!APIUtility.isNotNullOrEmpty(this.description)) errors.add("Description is required");
		if (this.location == null || this.location <= 0) errors.add("Location is required");
		if (this.programId == null || this.programId <= 0) errors.add("Program is required");
		if (this.instructorId == null || this.instructorId <= 0) errors.add("Instructor is required");
		return errors;
	}
	public void setUpdateFields(Grade grade) {
		if (APIUtility.isNotNullOrEmpty(grade.name)) this.name = grade.name;
		if (APIUtility.isNotNullOrEmpty(grade.level)) this.level = grade.level;
		if (APIUtility.isNotNullOrEmpty(grade.description)) this.description = grade.description;
		if (grade.location != null && grade.location > 0) this.location = grade.location;
		if (grade.programId != null && grade.programId > 0) this.programId = grade.programId;
		if (grade.instructorId != null && grade.instructorId > 0) this.instructorId = grade.instructorId;
	}
}
