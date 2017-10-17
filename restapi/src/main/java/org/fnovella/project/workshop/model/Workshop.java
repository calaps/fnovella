package org.fnovella.project.workshop.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;

@Entity
public class Workshop {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String name;
	private Integer location;
	private String description;
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
	public Integer getLocation() {
		return location;
	}
	public void setLocation(Integer location) {
		this.location = location;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Workshop(String name, Integer location, String description) {
		super();
		this.name = name;
		this.location = location;
		this.description = description;
	}
	public Workshop() {
		super();
	}
	public ArrayList<String> validate(){
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		if (this.location == null || this.location <= 0) errors.add("Location is required");
		if (!APIUtility.isNotNullOrEmpty(this.description)) errors.add("Description is required");
		return errors;
	}
	public void setUpdateFields(Workshop workshop) {
		if (APIUtility.isNotNullOrEmpty(workshop.name)) this.name = workshop.name;
		if (APIUtility.isNotNullOrEmpty(workshop.description)) this.description = workshop.description;
		if (workshop.location != null && workshop.location > 0) this.location = workshop.location;
	}
}