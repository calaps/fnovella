package org.fnovella.project.participant.model;

import java.util.ArrayList;
import java.util.GregorianCalendar;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class Participant {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max=50)
	private String firstName;
	@Length(max=50)
	private String secondName;
	@Length(max=50)
	private String firstLastname;
	@Length(max=50)
	private String secondLastname;
	private GregorianCalendar bornDate;
	@Length(max=50)
	private String documentType;
	@Length(max=50)
	private String documentValue;
	@Length(max=50)
	private String nacionality;
	@Length(max=50)
	private String department;
	@Length(max=50)
	private String municipality;
	@Length(max=50)
	private String community;
	@Length(max=50)
	private String profession;
	@Length(max=50)
	private String address;
	private Integer phone;
	private Integer cellPhone;
	@Length(max=50)
	private String email;
	@Length(max=50)
	private String appCode;
	@Length(max=10)
	private String gender;
	@Length(max=50)
	private String zone;
	@Length(max=50)
	private String colony;
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
	public void setSecondLastname(String secondLastname) {
		this.secondLastname = secondLastname;
	}
	public GregorianCalendar getBornDate() {
		return bornDate;
	}
	public void setBornDate(GregorianCalendar bornDate) {
		this.bornDate = bornDate;
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
	public String getNacionality() {
		return nacionality;
	}
	public void setNacionality(String nacionality) {
		this.nacionality = nacionality;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getMunicipality() {
		return municipality;
	}
	public void setMunicipality(String municipality) {
		this.municipality = municipality;
	}
	public String getCommunity() {
		return community;
	}
	public void setCommunity(String community) {
		this.community = community;
	}
	public String getProfession() {
		return profession;
	}
	public void setProfession(String profession) {
		this.profession = profession;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Integer getPhone() {
		return phone;
	}
	public void setPhone(Integer phone) {
		this.phone = phone;
	}
	public Integer getCellPhone() {
		return cellPhone;
	}
	public void setCellPhone(Integer cellPhone) {
		this.cellPhone = cellPhone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAppCode() {
		return appCode;
	}
	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getZone() {
		return zone;
	}
	public void setZone(String zone) {
		this.zone = zone;
	}
	public String getColony() {
		return colony;
	}
	public void setColony(String colony) {
		this.colony = colony;
	}
	public Participant(String firstName, String secondName, String firstLastname, String secondLastname,
			GregorianCalendar bornDate, String documentType, String documentValue, String nacionality,
			String department, String municipality, String community, String profession, String address, Integer phone,
			Integer cellPhone, String email, String appCode, String gender, String zone, String colony) {
		super();
		this.firstName = firstName;
		this.secondName = secondName;
		this.firstLastname = firstLastname;
		this.secondLastname = secondLastname;
		this.bornDate = bornDate;
		this.documentType = documentType;
		this.documentValue = documentValue;
		this.nacionality = nacionality;
		this.department = department;
		this.municipality = municipality;
		this.community = community;
		this.profession = profession;
		this.address = address;
		this.phone = phone;
		this.cellPhone = cellPhone;
		this.email = email;
		this.appCode = appCode;
		this.gender = gender;
		this.zone = zone;
		this.colony = colony;
	}
	public Participant() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.firstName)) errors.add("First Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.secondName)) errors.add("Second Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.firstLastname)) errors.add("First Last Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.secondLastname)) errors.add("Second Last Name is required");
		if (bornDate == null) errors.add("Born Date is required");
		if (!APIUtility.isNotNullOrEmpty(this.documentType)) errors.add("Document Type is required");
		if (!APIUtility.isNotNullOrEmpty(this.documentValue)) errors.add("Document Value is required");
		if (!APIUtility.isNotNullOrEmpty(this.nacionality)) errors.add("Nacionality is required");
		if (!APIUtility.isNotNullOrEmpty(this.department)) errors.add("Department is required");
		if (!APIUtility.isNotNullOrEmpty(this.municipality)) errors.add("Municipality is required");
		if (!APIUtility.isNotNullOrEmpty(this.community)) errors.add("Community is required");
		if (!APIUtility.isNotNullOrEmpty(this.profession)) errors.add("Profession is required");
		if (!APIUtility.isNotNullOrEmpty(this.address)) errors.add("Address is required");
		if (!APIUtility.isNotNullOrEmpty(this.email)) errors.add("Email is required");
		if (!APIUtility.isNotNullOrEmpty(this.appCode)) errors.add("App Code is required");
		if (!APIUtility.isNotNullOrEmpty(this.gender)) errors.add("Gender is required");
		if (!APIUtility.isNotNullOrEmpty(this.colony)) errors.add("Colony is required");
		if (!APIUtility.isNotNullOrEmpty(this.zone)) errors.add("Zone is required");
		return errors;
	}
	public void setUpdatedFields(Participant participant) {
		if (APIUtility.isNotNullOrEmpty(participant.firstName)) this.firstName = participant.firstName;
		if (APIUtility.isNotNullOrEmpty(participant.secondName)) this.secondName = participant.secondName;
		if (APIUtility.isNotNullOrEmpty(participant.firstLastname)) this.firstLastname = participant.firstLastname;
		if (APIUtility.isNotNullOrEmpty(participant.secondLastname)) this.secondLastname = participant.secondLastname;
		if (bornDate != null) this.bornDate = participant.bornDate;
		if (APIUtility.isNotNullOrEmpty(participant.documentType)) this.documentType = participant.documentType;
		if (APIUtility.isNotNullOrEmpty(participant.nacionality)) this.nacionality = participant.nacionality;
		if (APIUtility.isNotNullOrEmpty(participant.department)) this.department = participant.department;
		if (APIUtility.isNotNullOrEmpty(participant.municipality)) this.municipality = participant.municipality;
		if (APIUtility.isNotNullOrEmpty(participant.community)) this.community = participant.community;
		if (APIUtility.isNotNullOrEmpty(participant.profession)) this.profession = participant.profession;
		if (APIUtility.isNotNullOrEmpty(participant.address)) this.address = participant.address;
		if (APIUtility.isNotNullOrEmpty(participant.email)) this.email = participant.email;
		if (APIUtility.isNotNullOrEmpty(participant.appCode)) this.appCode = participant.appCode;
		if (APIUtility.isNotNullOrEmpty(participant.gender)) this.gender = participant.gender;
		if (APIUtility.isNotNullOrEmpty(participant.colony)) this.colony = participant.colony;
		if (APIUtility.isNotNullOrEmpty(participant.zone)) this.zone = participant.zone;
		if (participant.phone != null && participant.phone > 0) this.phone = participant.phone;
		if (participant.cellPhone != null && participant.cellPhone > 0) this.cellPhone = participant.cellPhone;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Participant participant = (Participant) o;

		return id.equals(participant.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}