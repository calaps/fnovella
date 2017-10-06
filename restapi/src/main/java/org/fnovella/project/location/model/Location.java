package org.fnovella.project.location.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class Location {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max=50)
	private String name;
	@Length(max=50)
	private String address;
	@Length(max=50)
	private String alias;
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public Location(String name, String address, String alias) {
		super();
		this.name = name;
		this.address = address;
		this.alias = alias;
	}
	public Location() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.address)) errors.add("Address is required");
		if (!APIUtility.isNotNullOrEmpty(this.alias)) errors.add("Alias is required");
		return errors;
	}
	public void setUpdateFields(Location location) {
		if (APIUtility.isNotNullOrEmpty(location.name)) this.name = location.name;
		if (APIUtility.isNotNullOrEmpty(location.address)) this.address = location.address;
		if (APIUtility.isNotNullOrEmpty(location.alias)) this.alias = location.alias;
	}
}