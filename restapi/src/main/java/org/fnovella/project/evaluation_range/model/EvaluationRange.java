package org.fnovella.project.evaluation_range.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class EvaluationRange {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer min;
	private Integer max;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getMin() {
		return min;
	}
	public void setMin(Integer min) {
		this.min = min;
	}
	public Integer getMax() {
		return max;
	}
	public void setMax(Integer max) {
		this.max = max;
	}
	public EvaluationRange(Integer min, Integer max) {
		super();
		this.min = min;
		this.max = max;
	}
	public EvaluationRange() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.min == null || this.min < 0) errors.add("Min is required");
		if (this.max == null || this.max < 0) errors.add("Max is required");
		if (errors.isEmpty() && this.max < this.min) errors.add("Max should be higher than min");
		return errors;
	}
	public void setUpdateFields(EvaluationRange er) {
		if (er.min != null && er.min >=0) this.min = er.min;
		if (er.max != null && er.max >=0) this.max = er.min;
	}
}