package org.fnovella.project.program.model;

import java.util.ArrayList;

import javax.persistence.*;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class Program {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max=50)
	private String name;
	@Length(max=50)
	private String type;
	@Length(max=50)
	private String audience;
	@Length(max=50)
	private String description;
	private boolean provider;
	@Length(max=50)
	private String clasification;
	private boolean freeCourses;
	private boolean activationStatus;
	@Length(max=50)
	private String genderAudience;
	@Length(max=10)
	private String gender;
	private Integer category;
	private Integer audienceMin;
	private Integer audienceMax;
	@Length(max=50)
	private String implementationLocation;
	@Length(max=50)
	private String evaluationType;
	private boolean evaluationPerformmance;
	private Integer monthsTotal;
	private Integer evaluationPeriod;
	private boolean indicatorsEvaluation;
	private boolean indicatorsPerformmance;
	private boolean indicatorsSatisfaction;

	private Integer responsable;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getAudience() {
		return audience;
	}
	public void setAudience(String audience) {
		this.audience = audience;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isProvider() {
		return provider;
	}
	public void setProvider(boolean provider) {
		this.provider = provider;
	}
	public String getClasification() {
		return clasification;
	}
	public void setClasification(String clasification) {
		this.clasification = clasification;
	}
	public boolean isFreeCourses() {
		return freeCourses;
	}
	public void setFreeCourses(boolean freeCourses) {
		this.freeCourses = freeCourses;
	}
	public boolean isActivationStatus() {
		return activationStatus;
	}
	public void setActivationStatus(boolean activationStatus) {
		this.activationStatus = activationStatus;
	}
	public String getGenderAudience() {
		return genderAudience;
	}
	public void setGenderAudience(String genderAudience) {
		this.genderAudience = genderAudience;
	}
	public Integer getCategory() {
		return category;
	}
	public void setCategory(Integer category) {
		this.category = category;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Integer getAudienceMin() {
		return audienceMin;
	}
	public void setAudienceMin(Integer audienceMin) {
		this.audienceMin = audienceMin;
	}
	public Integer getAudienceMax() {
		return audienceMax;
	}

	public Integer getResponsable() {
		return responsable;
	}

	public void setResponsable(Integer responsable) {
		this.responsable = responsable;
	}

	public void setAudienceMax(Integer audienceMax) {
		this.audienceMax = audienceMax;
	}
	public String getImplementationLocation() {
		return implementationLocation;
	}
	public void setImplementationLocation(String implementationLocation) {
		this.implementationLocation = implementationLocation;
	}

	public String getEvaluationType() {
		return evaluationType;
	}
	public void setEvaluationType(String evaluationType) {
		this.evaluationType = evaluationType;
	}
	public boolean isEvaluationPerformmance() {
		return evaluationPerformmance;
	}
	public void setEvaluationPerformmance(boolean evaluationPerformmance) {
		this.evaluationPerformmance = evaluationPerformmance;
	}
	public Integer getMonthsTotal() {
		return monthsTotal;
	}
	public void setMonthsTotal(Integer monthsTotal) {
		this.monthsTotal = monthsTotal;
	}
	public Integer getEvaluationPeriod() {
		return evaluationPeriod;
	}
	public void setEvaluationPeriod(Integer evaluationPeriod) {
		this.evaluationPeriod = evaluationPeriod;
	}
	public boolean isIndicatorsEvaluation() {
		return indicatorsEvaluation;
	}
	public void setIndicatorsEvaluation(boolean indicatorsEvaluation) {
		this.indicatorsEvaluation = indicatorsEvaluation;
	}
	public boolean isIndicatorsPerformmance() {
		return indicatorsPerformmance;
	}
	public void setIndicatorsPerformmance(boolean indicatorsPerformmance) {
		this.indicatorsPerformmance = indicatorsPerformmance;
	}
	public boolean isIndicatorsSatisfaction() {
		return indicatorsSatisfaction;
	}
	public void setIndicatorsSatisfaction(boolean indicatorsSatisfaction) {
		this.indicatorsSatisfaction = indicatorsSatisfaction;
	}
	public Program(String name, String type, String audience, String description, boolean provider,
			String clasification, boolean freeCourses, boolean activationStatus, String genderAudience, String gender,
			Integer category, Integer audienceMin, Integer audienceMax, String implementationLocation,
			Integer responsable, String evaluationType, boolean evaluationPerformmance, Integer monthsTotal,
			Integer evaluationPeriod, boolean indicatorsEvaluation, boolean indicatorsPerformmance,
			boolean indicatorsSatisfaction) {
		super();
		this.name = name;
		this.type = type;
		this.audience = audience;
		this.description = description;
		this.provider = provider;
		this.clasification = clasification;
		this.freeCourses = freeCourses;
		this.activationStatus = activationStatus;
		this.genderAudience = genderAudience;
		this.gender = gender;
		this.category = category;
		this.audienceMin = audienceMin;
		this.audienceMax = audienceMax;
		this.implementationLocation = implementationLocation;
		this.responsable = responsable;
		this.evaluationType = evaluationType;
		this.evaluationPerformmance = evaluationPerformmance;
		this.monthsTotal = monthsTotal;
		this.evaluationPeriod = evaluationPeriod;
		this.indicatorsEvaluation = indicatorsEvaluation;
		this.indicatorsPerformmance = indicatorsPerformmance;
		this.indicatorsSatisfaction = indicatorsSatisfaction;
	}
	public Program() {
		super();
	}
	public ArrayList<String> validate() {
		 ArrayList<String> errors = new  ArrayList<String>();
		 if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Nombre es requerido");
		 if (!APIUtility.isNotNullOrEmpty(this.audience)) errors.add("Audiencia es requerido");
		 if (!APIUtility.isNotNullOrEmpty(this.description)) errors.add("Descripción es requerido");
		 if (!APIUtility.isNotNullOrEmpty(this.clasification)) errors.add("Clasificación es requerido");
		 if (!APIUtility.isNotNullOrEmpty(this.genderAudience)) errors.add("Género de la Audiencia es requerido");
		 if (!APIUtility.isNotNullOrEmpty(this.type)) errors.add("Tipo es requerido");
		 if (!APIUtility.isNotNullOrEmpty(this.gender)) errors.add("Género es requerido");
		 if (!APIUtility.isNotNullOrEmpty(this.evaluationType)) errors.add("Tipo de Evaluación es requerido");
		 if (this.audienceMin == null || this.audienceMin < 0) errors.add("Mínimo de Audiencia es requerido");
		 if (this.audienceMax == null || this.audienceMax < 0) errors.add("Máximo de Audiencia es requerido");
		 if (this.responsable == null || this.responsable <= 0) errors.add("Responsable es requerido");
		 if (this.monthsTotal == null || this.monthsTotal <= 0) errors.add("Total de Meses es requerido");
		 if (this.evaluationPeriod == null || this.evaluationPeriod <= 0) errors.add("Periodo de Evaluación es requerido");
		 if (this.category == null || this.category <= 0) errors.add("Categoría es requerido");
		 return errors;
	}
	
	public void setUpdateFields(Program program) {
		if (APIUtility.isNotNullOrEmpty(program.name)) this.name = program.name;
		if (APIUtility.isNotNullOrEmpty(program.audience)) this.audience = program.audience;
		if (APIUtility.isNotNullOrEmpty(program.description)) this.description = program.description;
		if (APIUtility.isNotNullOrEmpty(program.clasification)) this.clasification = program.clasification;
		if (APIUtility.isNotNullOrEmpty(program.genderAudience)) this.genderAudience = program.genderAudience;
		if (APIUtility.isNotNullOrEmpty(program.type)) this.type = program.type;
		if (APIUtility.isNotNullOrEmpty(program.gender)) this.gender = program.gender;
		if (APIUtility.isNotNullOrEmpty(program.evaluationType)) this.evaluationType = program.evaluationType;
		if (program.audienceMin != null && this.audienceMin > 0) this.audienceMin = program.audienceMin;
		if (program.audienceMax != null && this.audienceMax > 0) this.audienceMax = program.audienceMax;
		if (program.responsable != null && this.responsable > 0) this.responsable = program.responsable;
		if (program.monthsTotal != null && this.monthsTotal > 0) this.monthsTotal = program.monthsTotal;
		if (program.evaluationPeriod != null && this.evaluationPeriod > 0) this.evaluationPeriod = program.evaluationPeriod;
		if (program.category != null && program.category > 0) this.category = program.category; 
		this.activationStatus = program.activationStatus;
		this.provider = program.provider;
		this.freeCourses = program.freeCourses;
		this.evaluationPerformmance = program.evaluationPerformmance;
		this.indicatorsEvaluation = program.indicatorsEvaluation;
		this.indicatorsPerformmance = program.indicatorsPerformmance;
		this.indicatorsSatisfaction = program.indicatorsSatisfaction;
	}
	
}