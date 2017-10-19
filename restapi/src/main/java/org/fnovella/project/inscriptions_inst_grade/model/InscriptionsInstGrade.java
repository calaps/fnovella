package org.fnovella.project.inscriptions_inst_grade.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class InscriptionsInstGrade {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer instructorId;
	@Length(max = 10)
	private String status;
	private Integer period;
	private Integer year;
	private Integer gradeId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getInstructorId() {
		return instructorId;
	}
	public void setInstructorId(Integer instructorId) {
		this.instructorId = instructorId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getPeriod() {
		return period;
	}
	public void setPeriod(Integer period) {
		this.period = period;
	}
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public Integer getGradeId() {
		return gradeId;
	}
	public void setGradeId(Integer gradeId) {
		this.gradeId = gradeId;
	}
	public InscriptionsInstGrade(Integer instructorId, String status, Integer period, Integer year, Integer gradeId) {
		super();
		this.instructorId = instructorId;
		this.status = status;
		this.period = period;
		this.year = year;
		this.gradeId = gradeId;
	}
	public InscriptionsInstGrade() {
		super();
	}
	public ArrayList<String> validate() {
   		ArrayList<String> errors = new ArrayList<String>();
   		if (!APIUtility.isNotNullOrEmpty(this.status)) errors.add("Status is required");
   		if (this.instructorId != null && this.instructorId <= 0) errors.add("Instructor is required");
   		if (this.period != null && this.period <= 0) errors.add("Period is required");
   		if (this.year != null && this.year <= 0) errors.add("Year is required");
    	if (this.gradeId != null && this.gradeId <= 0) errors.add("Grade is required");
    	return errors;
	}
	public void setUpdateFields(InscriptionsInstGrade inscriptionsInstGrade) {
    	if (APIUtility.isNotNullOrEmpty(inscriptionsInstGrade.status)) this.status = inscriptionsInstGrade.status;
		if (inscriptionsInstGrade.instructorId != null && inscriptionsInstGrade.instructorId > 0) this.instructorId = inscriptionsInstGrade.instructorId;
		if (inscriptionsInstGrade.period != null && inscriptionsInstGrade.period > 0) this.period = inscriptionsInstGrade.period;
   		if (inscriptionsInstGrade.year != null && inscriptionsInstGrade.year > 0) this.year = inscriptionsInstGrade.year;
    	if (inscriptionsInstGrade.gradeId != null && inscriptionsInstGrade.gradeId > 0) this.gradeId = inscriptionsInstGrade.gradeId;
	}
}