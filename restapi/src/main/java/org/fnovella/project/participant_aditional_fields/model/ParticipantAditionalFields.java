package org.fnovella.project.participant_aditional_fields.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

import org.fnovella.project.utility.APIUtility;

@Entity
public class ParticipantAditionalFields {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(name="[group]")
	private Integer group;
	private Integer participant;
	private Integer catalog;
	private Integer period;
	private Integer  year;

	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getGroup() {
		return this.group;
	}
	public void setGroup(Integer group) {
		this.group = group;
	}
	public Integer getParticipant() {
		return this.participant;
	}
	public void setParticipant(Integer participant) {
		this.participant = participant;
	}
	public Integer getCatalog() {
		return this.catalog;
	}
	public void setCatalog(Integer catalog) {
		this.catalog = catalog;
	}
	public Integer getPeriod() {
		return this.period;
	}
	public void setPeriod(Integer period) {
		this.period = period;
	}
	public Integer  getYear() {
		return this.year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public ParticipantAditionalFields(Integer id, Integer group, Integer participant, Integer catalog, Integer period, Integer  year){
		this.id = id;
		this.group = group;
		this.participant = participant;
		this.catalog = catalog;
		this.period = period;
		this.year = year;
	}
	public ParticipantAditionalFields(){
		super();
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.group == null || this.group < 0) errors.add("Group is required");
		if (this.participant == null || this.participant < 0) errors.add("Participant is required");
		if (this.catalog == null || this.catalog < 0) errors.add("Catalog is required");
		if (this.period == null || this.period < 0) errors.add("Period is required");
		if (this.year == null || this.year < 0) errors.add("Year is required");
		return errors;
	}
	public void setUpdateFields(ParticipantAditionalFields paf) {
		if (paf.group != null && paf.group > 0) this.group = paf.group;
		if (paf.participant != null && paf.participant > 0) this.participant = paf.participant;
		if (paf.catalog != null && paf.catalog > 0) this.catalog = paf.catalog;
		if (paf.period != null && paf.period > 0) this.period = paf.period;
		if (paf.year != null && paf.year > 0) this.year = paf.year;
	}

}