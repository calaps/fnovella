package org.fnovella.project.section.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class Section {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer grade;
	@Length(max = 20)
	private String name;
	@Length(max = 50)
	private String code;
	@Length(max = 50)
	private String jornada;
	private Integer location;
	private boolean createdGroup;
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getJornada() {
		return jornada;
	}

	public void setJornada(String jornada) {
		this.jornada = jornada;
	}

	public Integer getLocation() {
		return location;
	}

	public void setLocation(Integer location) {
		this.location = location;
	}

	public boolean isCreatedGroup() {
		return createdGroup;
	}

	public void setCreatedGroup(boolean createdGroup) {
		this.createdGroup = createdGroup;
	}

	public Section(Integer grade, String name, String code, String jornada, Integer location, boolean createdGroup) {
		this.grade = grade;
		this.name = name;
		this.code = code;
		this.jornada = jornada;
		this.location = location;
		this.createdGroup = createdGroup;
	}

	public Section() {
		super();
	}
	
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.jornada)) errors.add("Jornada is required");
		if (!APIUtility.isNotNullOrEmpty(this.code)) errors.add("Code is required");
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		if (this.grade == null || this.grade <= 0) errors.add("Grade is required");
		if (this.location == null || this.location <= 0) errors.add("Location is required");
		return errors;
	}
	
	public void setUpdateFields(Section section) {
		if (APIUtility.isNotNullOrEmpty(section.jornada)) this.jornada = section.jornada;
		if (APIUtility.isNotNullOrEmpty(section.code)) this.code = section.code;
		if (APIUtility.isNotNullOrEmpty(section.name)) this.name = section.name;
		if (section.grade != null && section.grade > 0) this.grade = section.grade;
		if (section.location != null && section.location > 0) this.location = section.location;
		this.createdGroup = section.createdGroup;
	}
	
}