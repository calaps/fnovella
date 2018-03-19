package org.fnovella.project.evaluation.model;

import java.sql.Date;
import java.util.ArrayList;

import javax.persistence.*;

@Entity
public class Evaluation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(name = "`group`")
	private Integer group;
	private Integer session;
	private Integer evaluationType;
	private Integer evaluationSubtype;
	private Date dateStart;
	private Date dateEnd;
	private Integer range;
	private Integer approvalPercentage;
	@Column(name = "[programactivation]")
	private Integer programActivation;
	private Integer status;


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getApprovalPercentage() {
		return approvalPercentage;
	}

	public void setApprovalPercentage(Integer approvalPercentage) {
		this.approvalPercentage = approvalPercentage;
	}

	public Integer getGroup() {
		return group;
	}
	public void setGroup(Integer group) {
		this.group = group;
	}
	public Integer getSession() {
		return session;
	}
	public void setSession(Integer session) {
		this.session = session;
	}
	public Integer getEvaluationType() {
		return evaluationType;
	}
	public void setEvaluationType(Integer evaluationType) {
		this.evaluationType = evaluationType;
	}
	public Integer getEvaluationSubtype() {
		return evaluationSubtype;
	}
	public void setEvaluationSubtype(Integer evaluationSubtype) {
		this.evaluationSubtype = evaluationSubtype;
	}
	public Date getDateStart() {
		return dateStart;
	}
	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}
	public Date getDateEnd() {
		return dateEnd;
	}
	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}
	public Integer getRange() {
		return range;
	}
	public void setRange(Integer range) {
		this.range = range;
	}

	public Integer getProgramActivation() {
		return programActivation;
	}

	public void setProgramActivation(Integer programActivation) {
		this.programActivation = programActivation;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Evaluation() {
		super();
	}
	public Evaluation(Integer group, Integer session, Integer evaluationType, Integer evaluationSubtype, Date dateStart,
			Date dateEnd, Integer range, Integer approvalPercentage, Integer programActivation, Integer status) {
		super();
		this.approvalPercentage = approvalPercentage;
		this.group = group;
		this.session = session;
		this.evaluationType = evaluationType;
		this.evaluationSubtype = evaluationSubtype;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.range = range;
		this.programActivation = programActivation;
		this.status = status;
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if ((this.group == null || this.group < 0) && (this.programActivation == null || this.programActivation < 0) ) {
			errors.add("Group or Program Activation is required");
		}
		if (this.group != null && this.group > 0 && this.programActivation != null && this.programActivation > 0) {
			errors.add("You can only add Group or Program Activation, but not both.");
		}
		if (this.session == null || this.session < 0) errors.add("Session is required");
		if (this.evaluationType == null || this.evaluationType < 0) errors.add("Evaluation Type is required");
		if (this.evaluationSubtype == null || this.evaluationSubtype < 0) errors.add("Evaluation Sub Type is required");
		if (this.range == null || this.range < 0) errors.add("Range is required");
		if (this.status == null || this.status < 0) errors.add("Status is required");
		if (this.dateStart == null) errors.add("Date Start is required");
		if (this.dateEnd == null) errors.add("Date End is required");
		if (this.approvalPercentage == null) errors.add("Approval Percentage is required");
		return errors;
	}
	public void setUpdateFields(Evaluation evaluation) {
		if (evaluation.session != null && evaluation.session > 0) this.session = evaluation.session;
		if (evaluation.evaluationType != null && evaluation.evaluationType > 0) this.evaluationType = evaluation.evaluationType;
		if (evaluation.evaluationSubtype != null && evaluation.evaluationSubtype > 0) this.evaluationSubtype = evaluation.evaluationSubtype;
		if (evaluation.range != null && evaluation.range > 0) this.range = evaluation.range;
		if (evaluation.status != null && evaluation.status > 0) this.status = evaluation.status;
		if (evaluation.approvalPercentage != null && evaluation.approvalPercentage > 0) this.approvalPercentage = evaluation.approvalPercentage;
		if (evaluation.dateStart != null) this.dateStart = evaluation.dateStart;
		if (evaluation.dateEnd != null) this.dateEnd = evaluation.dateEnd;
		this.group = evaluation.group;
		this.programActivation = evaluation.programActivation;
	}
}