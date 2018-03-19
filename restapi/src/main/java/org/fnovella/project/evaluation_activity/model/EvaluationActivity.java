package org.fnovella.project.evaluation_activity.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.fnovella.project.utility.APIUtility;

@Entity
public class EvaluationActivity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer evaluation;
	private Integer percentage;
	private String name;
	private Integer range;
	private Integer parentId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getPercentage() {
		return percentage;
	}
	public void setPercentage(Integer percentage) {
		this.percentage = percentage;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getRange() {
		return range;
	}
	public void setRange(Integer range) {
		this.range = range;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public Integer getEvaluation() {
		return evaluation;
	}
	public void setEvaluation(Integer evaluation) {
		this.evaluation = evaluation;
	}
	public EvaluationActivity(Integer evaluation, Integer percentage, String name, Integer range, Integer parentId) {
		super();
		this.evaluation = evaluation;
		this.percentage = percentage;
		this.name = name;
		this.range = range;
		this.parentId = parentId;
	}
	public EvaluationActivity() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.evaluation == null || this.evaluation < 0) errors.add("Evaluation is required");
		if (this.percentage == null || this.percentage < 0) errors.add("Percentage is required");
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		if (this.range == null || this.range < 0) errors.add("Range is required");
		return errors;
	}
	public void setUpdateFields(EvaluationActivity evaluationActivity) {
		if (evaluationActivity.evaluation != null && evaluationActivity.evaluation > 0)
			this.evaluation = evaluationActivity.evaluation;
		if (evaluationActivity.percentage != null && evaluationActivity.percentage > 0)
			this.percentage = evaluationActivity.percentage;
		if (APIUtility.isNotNullOrEmpty(evaluationActivity.name))
			this.name = evaluationActivity.name;
		if (evaluationActivity.range != null && evaluationActivity.range > 0)
			this.range = evaluationActivity.range;
	}
}