package org.fnovella.project.participant_aditional_fields.model;

import org.fnovella.project.participant_aditional_fields_values.model.ParticipantAditionalFieldsValues;

import java.util.ArrayList;

public class ParticipantAditionalFieldsObject {

	private ArrayList<ParticipantAditionalFieldsValues> participantAditionalFieldsValues;
	private ParticipantAditionalFields participantAditionalFields;

	public ArrayList<ParticipantAditionalFieldsValues> getParticipantAditionalFieldsValues() {
		return this.participantAditionalFieldsValues;
	}

	public void setParticipantAditionalFieldsValues(ArrayList<ParticipantAditionalFieldsValues> participantAditionalFieldsValues) {
		this.participantAditionalFieldsValues = participantAditionalFieldsValues;
	}

	public ParticipantAditionalFields getParticipantAditionalFields() {
		return this.participantAditionalFields;
	}

	public void setParticipantAditionalFields(ParticipantAditionalFields participantAditionalFields) {
		this.participantAditionalFields = participantAditionalFields;
	}

	public ParticipantAditionalFieldsObject() {
		super();
	}

	public ParticipantAditionalFieldsObject(ArrayList<ParticipantAditionalFieldsValues> participantAditionalFieldsValues, 
		ParticipantAditionalFields participantAditionalFields) {
		this.participantAditionalFieldsValues = participantAditionalFieldsValues;
		this.participantAditionalFields = participantAditionalFields;
	}

	public ArrayList<String> validate() {
		return this.participantAditionalFields.validate();
	}
	
}