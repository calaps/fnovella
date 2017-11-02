package org.fnovella.project.participant_contacts.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class ParticipantContacts {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max = 20)
	private String firstName;
	@Length(max = 20)
	private String secondName;
	@Length(max = 20)
	private String firstLastname;
	@Length(max = 20)
	private String secondLastname;
	@Length(max = 15)
	private String documentType;
	@Length(max = 50)
	private String documentValue;
	private Integer tellphone;
	private Integer cellphone;
	@Length(max = 50)
	private String email;
	@Length(max = 100)
	private String address;
	private Integer participantId;
	private boolean photo;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getSecondName() {
		return secondName;
	}
	public void setSecondName(String secondName) {
		this.secondName = secondName;
	}
	public String getFirstLastname() {
		return firstLastname;
	}
	public void setFirstLastname(String firstLastname) {
		this.firstLastname = firstLastname;
	}
	public String getSecondLastname() {
		return secondLastname;
	}
	public void setSecondLastname(String secondLastName) {
		this.secondLastname = secondLastName;
	}
	public String getDocumentType() {
		return documentType;
	}
	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}
	public String getDocumentValue() {
		return documentValue;
	}
	public void setDocumentValue(String documentValue) {
		this.documentValue = documentValue;
	}
	public Integer getTellphone() {
		return tellphone;
	}
	public void setTellphone(Integer tellphone) {
		this.tellphone = tellphone;
	}
	public Integer getCellphone() {
		return cellphone;
	}
	public void setCellphone(Integer cellphone) {
		this.cellphone = cellphone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Integer getParticipantId() {
		return participantId;
	}
	public void setParticipantId(Integer participantId) {
		this.participantId = participantId;
	}
	public boolean isPhoto() {
		return photo;
	}
	public void setPhoto(boolean photo) {
		this.photo = photo;
	}
	public ParticipantContacts(String firstName, String secondName, String firstLastname, String secondLastName,
			String documentType, String documentValue, Integer tellphone, Integer cellphone, String email,
			String address, Integer participantId, boolean photo) {
		super();
		this.firstName = firstName;
		this.secondName = secondName;
		this.firstLastname = firstLastname;
		this.secondLastname = secondLastName;
		this.documentType = documentType;
		this.documentValue = documentValue;
		this.tellphone = tellphone;
		this.cellphone = cellphone;
		this.email = email;
		this.address = address;
		this.participantId = participantId;
		this.photo = photo;
	}
	public ParticipantContacts() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.firstName)) errors.add("First name is required");
		if (!APIUtility.isNotNullOrEmpty(this.secondName)) errors.add("Second name is required");
		if (!APIUtility.isNotNullOrEmpty(this.firstLastname)) errors.add("First last name is required");
		if (!APIUtility.isNotNullOrEmpty(this.secondLastname)) errors.add("Second last name is required");
		if (!APIUtility.isNotNullOrEmpty(this.documentType)) errors.add("Document Type is required");
		if (!APIUtility.isNotNullOrEmpty(this.documentValue)) errors.add("Document Value is required");
		if (this.tellphone == null || this.tellphone <= 0) errors.add("Tellphone is required");
		if (!APIUtility.isNotNullOrEmpty(this.email)) errors.add("Email is required");
		if (!APIUtility.isNotNullOrEmpty(this.address)) errors.add("Address is required");
		if (this.participantId == null || this.participantId <= 0) errors.add("Participants is required");
		return errors;
	}
	public void setUpdateFields(ParticipantContacts participantContacts) {
		if (APIUtility.isNotNullOrEmpty(participantContacts.firstName)) this.firstName = participantContacts.firstName;
		if (APIUtility.isNotNullOrEmpty(participantContacts.secondName)) this.secondName = participantContacts.secondName;
		if (APIUtility.isNotNullOrEmpty(participantContacts.firstLastname)) this.firstLastname = participantContacts.firstLastname;
		if (APIUtility.isNotNullOrEmpty(participantContacts.secondLastname)) this.secondLastname = participantContacts.secondLastname;
		if (APIUtility.isNotNullOrEmpty(participantContacts.documentType)) this.documentType = participantContacts.documentType;
		if (APIUtility.isNotNullOrEmpty(participantContacts.documentValue)) this.documentValue = participantContacts.documentValue;
		if (participantContacts.tellphone != null && participantContacts.tellphone > 0) this.tellphone = participantContacts.tellphone;
		if (participantContacts.cellphone != null && participantContacts.cellphone > 0) this.cellphone = participantContacts.cellphone;
		if (APIUtility.isNotNullOrEmpty(participantContacts.email)) this.email = participantContacts.email;
		if (APIUtility.isNotNullOrEmpty(participantContacts.address)) this.address = participantContacts.address;
		if (participantContacts.participantId != null && participantContacts.participantId > 0) this.participantId = participantContacts.participantId;
		this.photo = participantContacts.photo;
	}
}