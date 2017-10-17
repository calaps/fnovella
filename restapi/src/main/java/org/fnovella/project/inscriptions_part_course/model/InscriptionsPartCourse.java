package org.fnovella.project.inscriptions_part_course.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class InscriptionsPartCourse {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer participantId;
	private Integer status;
	private Integer period;
	private Integer year;
	private Integer courseId;
	@Length(max = 20)
	private String groupId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getParticipantId() {
		return participantId;
	}
	public void setParticipantId(Integer participantId) {
		this.participantId = participantId;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
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
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public InscriptionsPartCourse(Integer participantId, Integer status, Integer period, Integer year, Integer courseId,
			String groupId) {
		super();
		this.participantId = participantId;
		this.status = status;
		this.period = period;
		this.year = year;
		this.courseId = courseId;
		this.groupId = groupId;
	}
	public InscriptionsPartCourse() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.groupId)) errors.add("Group is required");
		if (this.participantId <= 0) errors.add("Participant is required");
		if (this.status <= 0) errors.add("Status is required");
		if (this.period <= 0) errors.add("Period is required");
		if (this.year <= 0) errors.add("Year is required");
		if (this.courseId <= 0) errors.add("Course is required");
		return errors;
	}
	public void setUpdateFields(InscriptionsPartCourse inscriptionsPartCourse) {
		if (!APIUtility.isNotNullOrEmpty(inscriptionsPartCourse.groupId)) this.groupId = inscriptionsPartCourse.groupId;
		if (inscriptionsPartCourse.participantId > 0) this.participantId = inscriptionsPartCourse.participantId;
		if (inscriptionsPartCourse.status > 0) this.status = inscriptionsPartCourse.status;
		if (inscriptionsPartCourse.period > 0) this.period = inscriptionsPartCourse.period;
		if (inscriptionsPartCourse.year > 0) this.year = inscriptionsPartCourse.year;
		if (inscriptionsPartCourse.courseId > 0) this.courseId = inscriptionsPartCourse.courseId;
	}
}