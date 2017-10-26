package org.fnovella.project.catalog.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class Catalog {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max=50)
	private String name;
	@Length(max=50)
	private String type;
	private Integer category;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getCategory() {
		return category;
	}
	public void setCategory(Integer category) {
		this.category = category;
	}
	public Catalog(Integer id, String name, String type, Integer category) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.category = category;
	}
	public Catalog() {
		super();
	}
	
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.type)) errors.add("Type is required");
		if (this.category == null || this.category <= 0) errors.add("Category is required");
		return errors;
	}
	
	public void setUpdateFields(Catalog catalog) {
		if (APIUtility.isNotNullOrEmpty(catalog.name)) this.name = catalog.name;
		if (APIUtility.isNotNullOrEmpty(catalog.type)) this.type = catalog.type;
		if (this.category != null && this.category > 0) this.category = catalog.category;
	}
	
}
