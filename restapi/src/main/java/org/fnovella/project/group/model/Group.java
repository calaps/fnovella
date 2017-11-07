package org.fnovella.project.group.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name="[group]")
public class Group {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max=50)
	private String type_category;
	private Integer type;
	@Length(max=50)
	private String correlativo;
	private Integer course_id;
	private Integer workshop_id;
	private Integer division_id;
	private Integer section;
	private Integer instructor;

	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType_category() {
		return type_category;
	}

	public void setType_category(String type_category) {
		this.type_category = type_category;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getCorrelativo() {
		return correlativo;
	}

	public void setCorrelativo(String correlativo) {
		this.correlativo = correlativo;
	}

	public Integer getCourse_id() {
		return course_id;
	}

	public void setCourse_id(Integer course_id) {
		this.course_id = course_id;
	}

	public Integer getWorkshop_id() {
		return workshop_id;
	}

	public void setWorkshop_id(Integer workshop_id) {
		this.workshop_id = workshop_id;
	}

	public Integer getDivision_id() {
		return division_id;
	}

	public void setDivision_id(Integer division_id) {
		this.division_id = division_id;
	}

	public Integer getSection() {
		return section;
	}

	public void setSection(Integer section) {
		this.section = section;
	}

	public Integer getInstructor() {
		return instructor;
	}

	public void setInstructor(Integer instructor) {
		this.instructor = instructor;
	}

	public Group(String type_category, Integer type, String correlativo, Integer course_id, Integer workshop_id,
			Integer division_id, Integer section, Integer instructor) {
		super();
		this.type_category = type_category;
		this.type = type;
		this.correlativo = correlativo;
		this.course_id = course_id;
		this.workshop_id = workshop_id;
		this.division_id = division_id;
		this.section = section;
		this.instructor = instructor;
	}

	public Group() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.type_category)) errors.add("Type cateogry is required");
		if (!APIUtility.isNotNullOrEmpty(this.correlativo)) errors.add("Correlativo is required");
		if (this.type == null || this.type <= 0) errors.add("Type is required");
		if (this.course_id == null || this.course_id <= 0) errors.add("Course is required");
		if (this.workshop_id == null || this.workshop_id <= 0) errors.add("Workshop is required");
		if (this.division_id == null || this.division_id <= 0) errors.add("Dvision is required");
		if (this.section == null || this.section <= 0) errors.add("Section is required");
		if (this.instructor == null || this.instructor <= 0) errors.add("Instructor is required");
		return errors;
	}

	public void setUpdateFields(Group group) {
		if (APIUtility.isNotNullOrEmpty(group.type_category)) this.type_category = group.type_category;
		if (APIUtility.isNotNullOrEmpty(group.correlativo)) this.correlativo = group.correlativo;
		if (group.type != null && this.type > 0) this.type = group.type;
		if (group.course_id != null && this.course_id > 0) this.course_id = group.course_id;
		if (group.workshop_id != null && this.workshop_id > 0) this.workshop_id = group.workshop_id;
		if (group.division_id != null && this.division_id > 0) this.division_id = group.division_id;
		if (group.section != null && this.section > 0) this.section = group.section;
		if (group.instructor != null && this.instructor > 0) this.instructor = group.instructor;
	}

}