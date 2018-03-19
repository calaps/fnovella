package org.fnovella.project.evaluation_subtype.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.fnovella.project.utility.APIUtility;

@Entity
@Table(name="[evaluation_subtype]")
public class EvaluationSubtype {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String name;
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
	public EvaluationSubtype(String name) {
		super();
		this.name = name;
	}
	public EvaluationSubtype() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		return errors;
	}
	public void setUpdateFields(EvaluationSubtype est) {
		if (APIUtility.isNotNullOrEmpty(est.name)) this.name = est.name;
	}
	
}
