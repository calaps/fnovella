package org.fnovella.project.instructor.model;

import java.util.ArrayList;
import java.util.GregorianCalendar;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class Instructor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max = 50)
	private String firstName;
	@Length(max = 50)
	private String secondName;
	@Length(max = 50)
	private String firstLastname;
	@Length(max = 50)
	private String secondLastname;
	private GregorianCalendar bornDate;
	@Length(max = 50)
	private String documentType;
	@Length(max = 50)
	private String documentValue;
	@Length(max = 50)
	private String nacionality;
	@Length(max = 50)
	private String department;
	@Length(max = 50)
	private String municipality;
	@Length(max = 50)
	private String community;
	@Length(max = 50)
	private String profession;
	@Length(max = 50)
	private String address;
	private Integer phone;
	private Integer cellphone;
	@Length(max = 50)
	private String email;
	@Length(max = 50)
	private String appCode;
	@Length(max = 10)
	private String gender;
	private String password;
	private Integer privilege;
	private String colony;
	private String zone;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getPrivilege() {
		return privilege;
	}
	public void setPrivilege(Integer privilege) {
		this.privilege = privilege;
	}
	public String getColony() {
		return colony;
	}
	public void setColony(String colony) {
		this.colony = colony;
	}
	public String getZone() {
		return zone;
	}
	public void setZone(String zone) {
		this.zone = zone;
	}
	public Instructor() {
		super();
	}
	public Instructor(String firstName, String secondName, String firstLastname, String secondLastname,
			GregorianCalendar bornDate, String documentType, String documentValue, String nacionality,
			String department, String municipality, String community, String profession, String address, Integer phone,
			Integer cellphone, String email, String appCode, String gender, String password, Integer privilege,
			String colony, String zone) {
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
		this.cellphone = cellphone;
		this.email = email;
		this.appCode = appCode;
		this.gender = gender;
		this.password = password;
		this.privilege = privilege;
		this.colony = colony;
		this.zone = zone;
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.firstName)) errors.add("First Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.secondName)) errors.add("Second Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.firstLastname)) errors.add("First Last Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.secondLastname)) errors.add("Second Last Name is required");
		if (this.bornDate == null) errors.add("Bor Date is required");
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
		if (!APIUtility.isNotNullOrEmpty(this.gender)) errors.add("Gender Code is required");
		if (!APIUtility.isNotNullOrEmpty(this.password)) errors.add("Password is required");
		if (!APIUtility.isNotNullOrEmpty(this.colony)) errors.add("Colony is required");
		if (!APIUtility.isNotNullOrEmpty(this.zone)) errors.add("Zone is required");
		if (this.privilege == null || this.privilege <= 0) errors.add("Privilege is required");
		return errors;
	}
	
	public void setUpdateFields(Instructor instructor) {
		if (APIUtility.isNotNullOrEmpty(instructor.firstName)) this.firstName = instructor.firstName;
		if (APIUtility.isNotNullOrEmpty(instructor.secondName)) this.secondName = instructor.secondName;
		if (APIUtility.isNotNullOrEmpty(instructor.firstLastname)) this.firstLastname = instructor.firstLastname;
		if (APIUtility.isNotNullOrEmpty(instructor.secondLastname)) this.secondLastname = instructor.secondLastname;
		if (instructor.bornDate != null) this.bornDate = instructor.bornDate;
		if (APIUtility.isNotNullOrEmpty(instructor.documentType)) this.documentType = instructor.documentType;
		if (APIUtility.isNotNullOrEmpty(instructor.documentValue)) this.documentValue = instructor.documentValue;
		if (APIUtility.isNotNullOrEmpty(instructor.nacionality)) this.nacionality = instructor.nacionality;
		if (APIUtility.isNotNullOrEmpty(instructor.department)) this.department = instructor.department;
		if (APIUtility.isNotNullOrEmpty(instructor.municipality)) this.municipality = instructor.municipality;
		if (APIUtility.isNotNullOrEmpty(instructor.community)) this.community = instructor.community;
		if (APIUtility.isNotNullOrEmpty(instructor.profession)) this.profession = instructor.profession;
		if (APIUtility.isNotNullOrEmpty(instructor.address)) this.address = instructor.address;
		if (APIUtility.isNotNullOrEmpty(instructor.email)) this.email = instructor.email;
		if (APIUtility.isNotNullOrEmpty(instructor.appCode)) this.appCode = instructor.appCode;
		if (APIUtility.isNotNullOrEmpty(instructor.gender)) this.gender = instructor.gender;
		if (APIUtility.isNotNullOrEmpty(instructor.password)) this.password = instructor.password;
		if (APIUtility.isNotNullOrEmpty(instructor.colony)) this.colony = instructor.colony;
		if (APIUtility.isNotNullOrEmpty(instructor.zone)) this.zone = instructor.zone;
		if (instructor.privilege != null && instructor.privilege > 0) this.privilege = instructor.privilege;
		if (instructor.phone != null && instructor.phone > 0) this.phone = instructor.phone;
		if (instructor.cellphone != null && instructor.cellphone > 0) this.cellphone = instructor.cellphone;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Instructor instructor = (Instructor) o;

		return id.equals(instructor.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}
