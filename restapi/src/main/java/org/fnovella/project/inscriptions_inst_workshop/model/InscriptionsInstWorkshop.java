package org.fnovella.project.inscriptions_inst_workshop.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class InscriptionsInstWorkshop {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer instructorId;
	@Length(max = 10)
	private String status;
	private Integer period;
	private Integer year;
	private Integer workshopId;
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
		return workshopId;
	}
	public void setCourseId(Integer courseId) {
		this.workshopId = courseId;
	}
	public InscriptionsInstWorkshop(Integer instructorId, String status, Integer period, Integer year, Integer workshopId) {
		super();
		this.instructorId = instructorId;
		this.status = status;
		this.period = period;
		this.year = year;
		this.workshopId = workshopId;
	}
	public InscriptionsInstWorkshop() {
		super();
	}
	public ArrayList<String> validate() {
	    ArrayList<String> errors = new ArrayList<String>();
	    if (!APIUtility.isNotNullOrEmpty(this.status)) errors.add("Status is required");
	    if (this.instructorId != null && this.instructorId <= 0) errors.add("Instructor is required");
	    if (this.period != null && this.period <= 0) errors.add("Period is required");
	    if (this.year != null && this.year <= 0) errors.add("Year is required");
	    if (this.workshopId != null && this.workshopId <= 0) errors.add("Workshop is required");
	    return errors;
	}
	public void setUpdateFields(InscriptionsInstWorkshop inscriptionsInstWorkshop) {
	    if (APIUtility.isNotNullOrEmpty(inscriptionsInstWorkshop.status)) this.status = inscriptionsInstWorkshop.status;
	    if (inscriptionsInstWorkshop.instructorId != null && inscriptionsInstWorkshop.instructorId > 0) this.instructorId = inscriptionsInstWorkshop.instructorId;
	    if (inscriptionsInstWorkshop.period != null && inscriptionsInstWorkshop.period > 0) this.period = inscriptionsInstWorkshop.period;
	    if (inscriptionsInstWorkshop.year != null && inscriptionsInstWorkshop.year > 0) this.year = inscriptionsInstWorkshop.year;
	    if (inscriptionsInstWorkshop.workshopId != null && inscriptionsInstWorkshop.workshopId > 0) this.workshopId = inscriptionsInstWorkshop.workshopId;
	}
}