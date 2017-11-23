package org.fnovella.project.evaluation_actvitiy_participant_instructor.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "evaluation_activity_participant-intructor")
public class EvaluationActivityParticipantInstructor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer participant;
	private Integer intructor;
	private Integer activity;
	private Integer gradeInitial;
	private Integer gradeFinal;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getParticipant() {
		return participant;
	}
	public void setParticipant(Integer participant) {
		this.participant = participant;
	}
	public Integer getIntructor() {
		return intructor;
	}
	public void setIntructor(Integer intructor) {
		this.intructor = intructor;
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
	public EvaluationActivityParticipantInstructor() {
		super();
		// TODO Auto-generated constructor stub
	}
	public EvaluationActivityParticipantInstructor(Integer participant, Integer intructor, Integer activity,
			Integer gradeInitial, Integer gradeFinal) {
		super();
		this.participant = participant;
		this.intructor = intructor;
		this.activity = activity;
		this.gradeInitial = gradeInitial;
		this.gradeFinal = gradeFinal;
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.participant == null || this.participant < 0)
			errors.add("Participant is required");
		if (this.intructor == null || this.intructor < 0)
			errors.add("Instructor is required");
		if (this.activity == null || this.activity < 0)
			errors.add("Activity is required");
		if (this.gradeInitial == null || this.gradeInitial < 0)
			errors.add("Grade Initial is required");
		if (this.gradeFinal == null || this.gradeFinal < 0)
			errors.add("Grade Final is required");
		return errors;
	}
	public void setUpdateFields(EvaluationActivityParticipantInstructor eapi) {
		if (eapi.participant != null && eapi.participant > 0)
			this.participant = eapi.participant;
		if (eapi.intructor != null && eapi.intructor > 0)
			this.intructor = eapi.intructor;
		if (eapi.activity != null && eapi.activity > 0)
			this.activity = eapi.activity;
		if (eapi.gradeInitial != null && eapi.gradeInitial > 0)
			this.gradeInitial = eapi.gradeInitial;
		if (eapi.gradeFinal != null && eapi.gradeFinal > 0)
			this.gradeFinal = eapi.gradeFinal;
	}
}