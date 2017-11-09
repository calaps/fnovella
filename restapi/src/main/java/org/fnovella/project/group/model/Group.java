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
	private String typeCategory;
	private Integer type;
	@Length(max=50)
	private String correlativo;
	private Integer courseId;
	private Integer workshopId;
	private Integer divisionId;
	private Integer section;
	private Integer instructor;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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


	public String getTypeCategory() {
		return typeCategory;
	}

	public void setTypeCategory(String typeCategory) {
		this.typeCategory = typeCategory;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public Integer getWorkshopId() {
		return workshopId;
	}

	public void setWorkshopId(Integer workshopId) {
		this.workshopId = workshopId;
	}

	public Integer getDivisionId() {
		return divisionId;
	}

	public void setDivisionId(Integer divisionId) {
		this.divisionId = divisionId;
	}

	public Group(String typeCategory, Integer type, String correlativo, Integer courseId, Integer workshopId,
			Integer divisionId, Integer section, Integer instructor) {
		super();
		this.typeCategory = typeCategory;
		this.type = type;
		this.correlativo = correlativo;
		this.courseId = courseId;
		this.workshopId = workshopId;
		this.divisionId = divisionId;
		this.section = section;
		this.instructor = instructor;
	}

	public Group() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.typeCategory)) errors.add("Type cateogry is required");
		if (!APIUtility.isNotNullOrEmpty(this.correlativo)) errors.add("Correlativo is required");
		if (this.type == null || this.type <= 0) errors.add("Type is required");
		if (this.courseId == null || this.courseId <= 0) errors.add("Course is required");
		if (this.workshopId == null || this.workshopId <= 0) errors.add("Workshop is required");
		if (this.divisionId == null || this.divisionId <= 0) errors.add("Dvision is required");
		if (this.section == null || this.section <= 0) errors.add("Section is required");
		if (this.instructor == null || this.instructor <= 0) errors.add("Instructor is required");
		return errors;
	}

	public void setUpdateFields(Group group) {
		if (APIUtility.isNotNullOrEmpty(group.typeCategory)) this.typeCategory = group.typeCategory;
		if (APIUtility.isNotNullOrEmpty(group.correlativo)) this.correlativo = group.correlativo;
		if (group.type != null && this.type > 0) this.type = group.type;
		if (group.courseId != null && this.courseId > 0) this.courseId = group.courseId;
		if (group.workshopId != null && this.workshopId > 0) this.workshopId = group.workshopId;
		if (group.divisionId != null && this.divisionId > 0) this.divisionId = group.divisionId;
		if (group.section != null && this.section > 0) this.section = group.section;
		if (group.instructor != null && this.instructor > 0) this.instructor = group.instructor;
	}

}