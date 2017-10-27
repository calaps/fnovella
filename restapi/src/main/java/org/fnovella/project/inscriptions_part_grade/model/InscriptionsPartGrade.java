package org.fnovella.project.inscriptions_part_grade.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class InscriptionsPartGrade {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer participantId;
	private Integer status;
	private Integer period;
	private Integer year;
	private Integer gradeId;
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
		return gradeId;
	}
	public void setCourseId(Integer gradeId) {
		this.gradeId = gradeId;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public InscriptionsPartGrade(Integer participantId, Integer status, Integer period, Integer year, Integer gradeId,
		String groupId) {
		super();
		this.participantId = participantId;
		this.status = status;
		this.period = period;
		this.year = year;
		this.gradeId = gradeId;
		this.groupId = groupId;
	}
	public InscriptionsPartGrade() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.groupId)) errors.add("Group is required");
		if (this.participantId == null || this.participantId <= 0) errors.add("Participant is required");
		if (this.status == null || this.status <= 0) errors.add("Status is required");
		if (this.period == null || this.period <= 0) errors.add("Period is required");
		if (this.year == null || this.year <= 0) errors.add("Year is required");
		if (this.gradeId == null || this.gradeId <= 0) errors.add("Grade is required");
		return errors;
	}
	public void setUpdateFields(InscriptionsPartGrade inscriptionsPartGrade) {
		if (!APIUtility.isNotNullOrEmpty(inscriptionsPartGrade.groupId)) this.groupId = inscriptionsPartGrade.groupId;
		if (inscriptionsPartGrade.participantId != null && inscriptionsPartGrade.participantId > 0) this.participantId = inscriptionsPartGrade.participantId;
		if (inscriptionsPartGrade.status != null && inscriptionsPartGrade.status > 0) this.status = inscriptionsPartGrade.status;
		if (inscriptionsPartGrade.period != null && inscriptionsPartGrade.period > 0) this.period = inscriptionsPartGrade.period;
		if (inscriptionsPartGrade.year != null && inscriptionsPartGrade.year > 0) this.year = inscriptionsPartGrade.year;
		if (inscriptionsPartGrade.gradeId != null && inscriptionsPartGrade.gradeId > 0) this.gradeId = inscriptionsPartGrade.gradeId;
	}
}