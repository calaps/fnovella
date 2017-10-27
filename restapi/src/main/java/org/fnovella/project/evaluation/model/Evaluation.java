package org.fnovella.project.evaluation.model;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

//@Entity
public class Evaluation {

	/*@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max = 50)
	private String item;
	@Length(max = 50)
	private String subject;
	@Length(max = 50)
	private String practice;
	@Column(name="column_5")
	private Integer column5;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getPractice() {
		return practice;
	}
	public void setPractice(String practice) {
		this.practice = practice;
	}
	public Integer getColumn5() {
		return column5;
	}
	public void setColumn5(Integer column5) {
		this.column5 = column5;
	}
	public Evaluation(String item, String subject, String practice, Integer column5) {
		super();
		this.item = item;
		this.subject = subject;
		this.practice = practice;
		this.column5 = column5;
	}
	public Evaluation() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.item)) errors.add("Item is required");
		if (!APIUtility.isNotNullOrEmpty(this.subject)) errors.add("Subject is required");
		if (!APIUtility.isNotNullOrEmpty(this.practice)) errors.add("Practice is required");
		return errors;
	}
	public void setUpdateFields(Evaluation evaluation) {
		if (APIUtility.isNotNullOrEmpty(evaluation.item)) this.item = evaluation.item;
		if (APIUtility.isNotNullOrEmpty(evaluation.subject)) this.subject = evaluation.subject;
		if (APIUtility.isNotNullOrEmpty(evaluation.practice)) this.practice = evaluation.practice;
		if (evaluation.column5 != null && evaluation.column5 > 0) this.column5 = evaluation.column5;
	}*/
}
