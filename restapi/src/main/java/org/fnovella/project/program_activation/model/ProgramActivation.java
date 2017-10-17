package org.fnovella.project.program_activation.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class ProgramActivation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer programId;
	@Length(max = 20)
	private String calPeriodsGrade;
	@Length(max = 20)
	private String calPeriodsCourse;
	@Length(max = 20)
	private String calPeriodsWorkshop;
	private Integer responsable;
	@Length(max = 20)
	private String evaluationStructure;
	@Length(max = 20)
	private String satisfactionStructure;
	@Length(max = 20)
	private String monitoringStructure;
	private Integer location;
	private boolean freeCourses;
	private Integer temporality;
	private Integer year;
	private boolean activationStatus;
	private Integer numberSessions;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getProgramId() {
		return programId;
	}
	public void setProgramId(Integer programId) {
		this.programId = programId;
	}
	public String getCalPeriodsGrade() {
		return calPeriodsGrade;
	}
	public void setCalPeriodsGrade(String calPeriodsGrade) {
		this.calPeriodsGrade = calPeriodsGrade;
	}
	public String getCalPeriodsCourse() {
		return calPeriodsCourse;
	}
	public void setCalPeriodsCourse(String calPeriodsCourse) {
		this.calPeriodsCourse = calPeriodsCourse;
	}
	public String getCalPeriodsWorkshop() {
		return calPeriodsWorkshop;
	}
	public void setCalPeriodsWorkshop(String calPeriodsWorkshop) {
		this.calPeriodsWorkshop = calPeriodsWorkshop;
	}
	public Integer getResponsable() {
		return responsable;
	}
	public void setResponsable(Integer responsable) {
		this.responsable = responsable;
	}
	public String getEvaluationStructure() {
		return evaluationStructure;
	}
	public void setEvaluationStructure(String evaluationStructure) {
		this.evaluationStructure = evaluationStructure;
	}
	public String getSatisfactionStructure() {
		return satisfactionStructure;
	}
	public void setSatisfactionStructure(String satisfactionStructure) {
		this.satisfactionStructure = satisfactionStructure;
	}
	public String getMonitoringStructure() {
		return monitoringStructure;
	}
	public void setMonitoringStructure(String monitoringStructure) {
		this.monitoringStructure = monitoringStructure;
	}
	public Integer getLocation() {
		return location;
	}
	public void setLocation(Integer location) {
		this.location = location;
	}
	public boolean isFreeCourses() {
		return freeCourses;
	}
	public void setFreeCourses(boolean freeCourses) {
		this.freeCourses = freeCourses;
	}
	public Integer getTemporality() {
		return temporality;
	}
	public void setTemporality(Integer temporality) {
		this.temporality = temporality;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public boolean isActivationStatus() {
		return activationStatus;
	}
	public void setActivationStatus(boolean activationStatus) {
		this.activationStatus = activationStatus;
	}
	public Integer getNumberSessions() {
		return numberSessions;
	}
	public void setNumberSessions(Integer numberSessions) {
		this.numberSessions = numberSessions;
	}
	public ProgramActivation(Integer programId, String calPeriodsGrade, String calPeriodsCourse,
			String calPeriodsWorkshop, Integer responsable, String evaluationStructure, String satisfactionStructure,
			String monitoringStructure, Integer location, boolean freeCourses, Integer temporality, int year,
			boolean activationStatus, Integer numberSessions) {
		super();
		this.programId = programId;
		this.calPeriodsGrade = calPeriodsGrade;
		this.calPeriodsCourse = calPeriodsCourse;
		this.calPeriodsWorkshop = calPeriodsWorkshop;
		this.responsable = responsable;
		this.evaluationStructure = evaluationStructure;
		this.satisfactionStructure = satisfactionStructure;
		this.monitoringStructure = monitoringStructure;
		this.location = location;
		this.freeCourses = freeCourses;
		this.temporality = temporality;
		this.year = year;
		this.activationStatus = activationStatus;
		this.numberSessions = numberSessions;
	}
	public ProgramActivation() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.programId == null || this.programId <= 0) errors.add("Program is required");
		if (!APIUtility.isNotNullOrEmpty(this.calPeriodsGrade)) errors.add("Cal Periods Grade is required");
		if (!APIUtility.isNotNullOrEmpty(this.calPeriodsCourse)) errors.add("Cal Periods Course is required");
		if (!APIUtility.isNotNullOrEmpty(this.calPeriodsWorkshop)) errors.add("Cal Periods Workshop is required");
		if (this.responsable == null || this.responsable <= 0) errors.add("Responsable is required");
		if (!APIUtility.isNotNullOrEmpty(this.evaluationStructure)) errors.add("Evaluation Structure is required");
		if (!APIUtility.isNotNullOrEmpty(this.satisfactionStructure)) errors.add("Satisfaction Structure is required");
		if (!APIUtility.isNotNullOrEmpty(this.monitoringStructure)) errors.add("Monitoring Structure is required");
		if (this.location == null || this.location <= 0) errors.add("Location is required");
		if (this.temporality == null || this.temporality <= 0) errors.add("Temporality is required");
		if (this.year == null || this.year <= 0) errors.add("Year is required");
		if (this.numberSessions == null || this.numberSessions <= 0) errors.add("Number Sessions is required");
		return errors;
	}
	public void setUpdateFields(ProgramActivation programActivation) {
		if (programActivation.programId > 0) this.programId = programActivation.programId;
		if (APIUtility.isNotNullOrEmpty(programActivation.calPeriodsGrade)) this.calPeriodsGrade = programActivation.calPeriodsGrade;
		if (APIUtility.isNotNullOrEmpty(programActivation.calPeriodsCourse)) this.calPeriodsCourse = programActivation.calPeriodsCourse;
		if (APIUtility.isNotNullOrEmpty(programActivation.calPeriodsWorkshop)) this.calPeriodsWorkshop = programActivation.calPeriodsWorkshop;
		if (programActivation.responsable > 0) this.responsable = programActivation.responsable;
		if (APIUtility.isNotNullOrEmpty(programActivation.evaluationStructure)) this.evaluationStructure = programActivation.evaluationStructure;
		if (APIUtility.isNotNullOrEmpty(programActivation.satisfactionStructure)) this.satisfactionStructure = programActivation.satisfactionStructure;
		if (APIUtility.isNotNullOrEmpty(programActivation.monitoringStructure)) this.monitoringStructure = programActivation.monitoringStructure;
		if (programActivation.location > 0) this.location = programActivation.location;
		if (programActivation.temporality > 0) this.temporality = programActivation.temporality;
		if (programActivation.year > 0) this.year = programActivation.year;
		if (programActivation.numberSessions > 0) this.numberSessions = programActivation.numberSessions;
		this.freeCourses = programActivation.freeCourses;
		this.activationStatus = programActivation.activationStatus;
	}
}