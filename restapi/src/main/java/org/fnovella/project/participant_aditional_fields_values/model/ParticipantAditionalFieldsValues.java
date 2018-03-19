package org.fnovella.project.participant_aditional_fields_values.model;


import org.fnovella.project.utility.APIUtility;
import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import org.fnovella.project.category.model.Category;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Id;

@Entity
public class ParticipantAditionalFieldsValues {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer aditionalFieldId;
	private String intialValue;
	private String finalValue;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getaAitionalFieldId() {
		return aditionalFieldId;
	}

	public void setAditionalFieldId(Integer aditionalFieldId) {
		this.aditionalFieldId = aditionalFieldId;
	}

	public String getIntialValue() {
		return intialValue;
	}

	public void setIntialValue(String intialValue) {
		this.intialValue = intialValue;
	}

	public String getFinalValue() {
		return finalValue;
	}

	public void setFinalValue(String finalValue) {
		this.finalValue = finalValue;
	}

	public ParticipantAditionalFieldsValues(Integer aditionalFieldId, String intialValue, String finalValue) {
		super();
		this.aditionalFieldId = aditionalFieldId;
		this.intialValue = intialValue;
		this.finalValue = finalValue;
	}

	public ParticipantAditionalFieldsValues() {
		super();
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.aditionalFieldId == null || this.aditionalFieldId <= 0) errors.add("Aditional Id is required");
		if (!APIUtility.isNotNullOrEmpty(this.intialValue)) errors.add("Initial Value is required");
		if (!APIUtility.isNotNullOrEmpty(this.finalValue)) errors.add("Final Value is required");
		return errors;
	}

	public void setUpdateFields(ParticipantAditionalFieldsValues pafv) {
		if (pafv.aditionalFieldId != null && pafv.aditionalFieldId > 0) this.aditionalFieldId = pafv.aditionalFieldId;
		if (!APIUtility.isNotNullOrEmpty(pafv.intialValue)) this.intialValue = pafv.intialValue;
		if (!APIUtility.isNotNullOrEmpty(pafv.finalValue)) this.finalValue = pafv.finalValue;
	}

}