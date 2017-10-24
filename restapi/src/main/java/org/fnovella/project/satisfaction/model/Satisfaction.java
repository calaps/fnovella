package org.fnovella.project.satisfaction.model;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

//@Entity
public class Satisfaction {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max = 50)
	private String description;
	@Column(name="column_3")
	private Integer column3;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getColumn3() {
		return column3;
	}
	public void setColumn3(Integer column3) {
		this.column3 = column3;
	}
	public Satisfaction(String description, Integer column3) {
		super();
		this.description = description;
		this.column3 = column3;
	}
	public Satisfaction() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.description)) errors.add("Description is required");
		if (this.column3 == null || this.column3 <= 0) errors.add("Column 3 is required");
		return errors;
	}
	public void setUpdateFields(Satisfaction satisfcation) {
		if (APIUtility.isNotNullOrEmpty(satisfcation.description)) this.description = satisfcation.description;
		if (satisfcation.column3 != null && satisfcation.column3 > 0) this.column3 = satisfcation.column3;
	}
}