package org.fnovella.project.evaluation_activity_participant.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class EvaluationActivityParticipant {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer activity;
	@Column(name="grade_inital")
	private Integer gradeInitial;
	private Integer gradeFinal;
	private Integer participant;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getActivity() {
		return activity;
	}
	public void setActivity(Integer activity) {
		this.activity = activity;
	}
	public Integer getGradeInitial() {
		return gradeInitial;
	}
	public void setGradeInitial(Integer gradeInitial) {
		this.gradeInitial = gradeInitial;
	}
	public Integer getGradeFinal() {
		return gradeFinal;
	}
	public void setGradeFinal(Integer gradeFinal) {
		this.gradeFinal = gradeFinal;
	}
	public Integer getParticipant() {
		return participant;
	}
	public void setParticipant(Integer participant) {
		this.participant = participant;
	}
	public EvaluationActivityParticipant(Integer activity, Integer gradeInitial, Integer gradeFinal, Integer participant) {
		super();
		this.activity = activity;
		this.gradeInitial = gradeInitial;
		this.gradeFinal = gradeFinal;
		this.participant = participant;
	}
	public EvaluationActivityParticipant() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.activity == null || this.activity < 0)
			errors.add("Activity is required");
		if (this.gradeInitial == null || this.gradeInitial < 0)
			errors.add("Grade Initial is required");
		if (this.gradeFinal == null || this.gradeFinal < 0)
			errors.add("Grade Final is required");
		if (this.participant == null || this.participant < 0)
			errors.add("Participant is required");
		return errors;
	}
	public void setUpdateField(EvaluationActivityParticipant eap) {
		if (eap.activity != null && eap.activity > 0)
			this.activity = eap.activity;
		if (eap.gradeInitial != null && eap.gradeInitial > 0)
			this.gradeInitial = eap.gradeInitial;
		if (eap.gradeFinal != null && eap.gradeFinal > 0)
			this.gradeFinal = eap.gradeFinal;
		if (eap.participant != null && eap.participant > 0)
			this.participant = eap.participant;
	}
	
}