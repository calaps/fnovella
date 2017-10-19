package org.fnovella.project.inscriptions_part_workshop.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class InscriptionsPartWorkshop {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer participantId;
	@Length(max = 10)
	private String status;
	private Integer period;
	private Integer year;
	private Integer workshopId;
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
	public void setCourseId(Integer gradeId) {
		this.workshopId = gradeId;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public InscriptionsPartWorkshop(Integer participantId, String status, Integer period, Integer year, Integer workshopId,
		String groupId) {
		super();
		this.participantId = participantId;
		this.status = status;
		this.period = period;
		this.year = year;
		this.workshopId = workshopId;
		this.groupId = groupId;
	}
	public InscriptionsPartWorkshop() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.groupId)) errors.add("Group is required");
		if (!APIUtility.isNotNullOrEmpty(this.status)) errors.add("Status is required");
		if (this.participantId != null && this.participantId <= 0) errors.add("Participant is required");
		if (this.period != null && this.period <= 0) errors.add("Period is required");
		if (this.year != null && this.year <= 0) errors.add("Year is required");
		if (this.workshopId != null && this.workshopId <= 0) errors.add("Workshop is required");
		return errors;
	}
	public void setUpdateFields(InscriptionsPartWorkshop inscriptionsPartWorkshop) {
		if (!APIUtility.isNotNullOrEmpty(inscriptionsPartWorkshop.groupId)) this.groupId = inscriptionsPartWorkshop.groupId;
		if (!APIUtility.isNotNullOrEmpty(inscriptionsPartWorkshop.status)) this.status = inscriptionsPartWorkshop.status;
		if (inscriptionsPartWorkshop.participantId != null && inscriptionsPartWorkshop.participantId > 0) this.participantId = inscriptionsPartWorkshop.participantId;
		if (inscriptionsPartWorkshop.period != null && inscriptionsPartWorkshop.period > 0) this.period = inscriptionsPartWorkshop.period;
		if (inscriptionsPartWorkshop.year != null && inscriptionsPartWorkshop.year > 0) this.year = inscriptionsPartWorkshop.year;
		if (inscriptionsPartWorkshop.workshopId != null && inscriptionsPartWorkshop.workshopId > 0) this.workshopId = inscriptionsPartWorkshop.workshopId;
	}
}