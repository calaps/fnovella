package org.fnovella.project.program.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class Program {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max=50)
	private String name;
	private boolean type;
	@Length(max=50)
	private String audience;
	@Length(max=50)
	private String description;
	private boolean provider;
	@Length(max=50)
	private String clasification;
	private boolean freeCourses;
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
	public boolean getType() {
		return type;
	}
	public void setType(boolean type) {
		this.type = type;
	}
	public String getAudience() {
		return audience;
	}
	public void setAudience(String audience) {
		this.audience = audience;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isProvider() {
		return provider;
	}
	public void setProvider(boolean provider) {
		this.provider = provider;
	}
	public String getClasification() {
		return clasification;
	}
	public void setClasification(String clasification) {
		this.clasification = clasification;
	}
	public boolean isFreeCourses() {
		return freeCourses;
	}
	public void setFreeCourses(boolean freeCourses) {
		this.freeCourses = freeCourses;
	}
	public Program(String name, boolean type, String audience, String description, boolean provider,
			String clasification, boolean freeCourses) {
		super();
		this.name = name;
		this.type = type;
		this.audience = audience;
		this.description = description;
		this.provider = provider;
		this.clasification = clasification;
		this.freeCourses = freeCourses;
	}
	public Program() {
		super();
	}
	
	public ArrayList<String> validate() {
		 ArrayList<String> errors = new  ArrayList<String>();
		 if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		 if (!APIUtility.isNotNullOrEmpty(this.audience)) errors.add("Audience is required");
		 if (!APIUtility.isNotNullOrEmpty(this.description)) errors.add("Description is required");
		 if (!APIUtility.isNotNullOrEmpty(this.clasification)) errors.add("Clasification is required");
		 return errors;
	}
	
	public void setUpdateFields(Program program) {
		if (APIUtility.isNotNullOrEmpty(program.name)) this.name = program.name;
		if (APIUtility.isNotNullOrEmpty(program.audience)) this.audience = program.audience;
		if (APIUtility.isNotNullOrEmpty(program.description)) this.description = program.description;
		if (APIUtility.isNotNullOrEmpty(program.clasification)) this.clasification = program.clasification;
		this.provider = program.provider;
		this.freeCourses = program.freeCourses;
		this.type = program.type;
	}
	
}