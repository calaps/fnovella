package org.fnovella.project.inscriptions_inst_course.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class InscriptionsInstCourse {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer instructorId;
	@Length(max = 10)
	private String status;
	private Integer period;
	private Integer year;
	private Integer courseId;
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
	public Integer getCourseId() {
		return courseId;
	}
	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}
	public InscriptionsInstCourse(Integer instructorId, String status, Integer period, Integer year, Integer courseId) {
		super();
		this.instructorId = instructorId;
		this.status = status;
		this.period = period;
		this.year = year;
		this.courseId = courseId;
	}
	public InscriptionsInstCourse() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.status)) errors.add("Status is required");
		if (this.instructorId <= 0) errors.add("Instructor is required");
		if (this.period <= 0) errors.add("Period is required");
		if (this.year <= 0) errors.add("Year is required");
		if (this.courseId <= 0) errors.add("Course is required");
		return errors;
	}
	public void setUpdateFields(InscriptionsInstCourse inscriptionsInstCourse) {
		if (APIUtility.isNotNullOrEmpty(inscriptionsInstCourse.status)) this.status = inscriptionsInstCourse.status;
		if (inscriptionsInstCourse.instructorId > 0) this.instructorId = inscriptionsInstCourse.instructorId;
		if (inscriptionsInstCourse.period > 0) this.period = inscriptionsInstCourse.period;
		if (inscriptionsInstCourse.year > 0) this.year = inscriptionsInstCourse.year;
		if (inscriptionsInstCourse.courseId > 0) this.courseId = inscriptionsInstCourse.courseId;
	}
}