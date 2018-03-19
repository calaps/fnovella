package org.fnovella.project.evaluation_activity_instructor.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
public class EvaluationActivityInstructor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer instructor;
	private Integer activity;
	@Column(name="grade_inital")
	private Integer gradeInitial;
	private Integer gradeFinal;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getInstructor() {
		return instructor;
	}
	public void setInstructor(Integer instructor) {
		this.instructor = instructor;
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
	public EvaluationActivityInstructor(Integer instructor, Integer activity, Integer gradeInitial,
			Integer gradeFinal) {
		super();
		this.instructor = instructor;
		this.activity = activity;
		this.gradeInitial = gradeInitial;
		this.gradeFinal = gradeFinal;
	}
	public EvaluationActivityInstructor() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.instructor == null || this.instructor < 0) errors.add("Instructor is required");
		if (this.activity == null || this.activity < 0) errors.add("Activity is required");
		if (this.gradeInitial == null || this.gradeInitial < 0) errors.add("Grade Initial is required");
		if (this.gradeFinal == null || this.gradeFinal < 0) errors.add("Grade Final is required");
		return errors;
	}
	public void setUpdateFields(EvaluationActivityInstructor eai) {
		if (eai.instructor != null && eai.instructor > 0) 
			this.instructor = eai.instructor;
		if (eai.activity != null && eai.activity > 0) 
			this.activity = eai.activity;
		if (eai.gradeInitial != null && eai.gradeInitial > 0) 
			this.gradeInitial = eai.gradeInitial;
		if (eai.gradeFinal != null && eai.gradeFinal > 0) 
			this.gradeFinal = eai.gradeFinal;
	}
}