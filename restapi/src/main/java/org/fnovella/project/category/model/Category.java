package org.fnovella.project.category.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Length(max = 50)
	private String name;
	@Length(max = 180)
	private String description;
	private boolean aditionalField;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isAdditionalField() {
		return aditionalField;
	}
	public void setAdditionalField(boolean additionalField) {
		this.aditionalField = additionalField;
	}
	public Category(String name, String description, boolean additionalField) {
		super();
		this.name = name;
		this.description = description;
		this.aditionalField = additionalField;
	}
	public Category() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.description)) errors.add("Description is required");
		return errors;
	}
	public void setUpdateFields(Category category) {
		if (APIUtility.isNotNullOrEmpty(category.name)) this.name = category.name;
		if (APIUtility.isNotNullOrEmpty(category.description)) this.description = category.description;
		this.aditionalField = category.aditionalField;
	}
}