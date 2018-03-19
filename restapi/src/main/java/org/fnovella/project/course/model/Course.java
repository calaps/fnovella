package org.fnovella.project.course.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Transient;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.fnovella.project.utility.inter.Agroupation;
import org.hibernate.validator.constraints.Length;

@Entity
public class Course implements Agroupation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Length(max = 50)
	private String name;
	private Integer location;
	@Length(max = 140)
	private String description;
	private boolean openCourse;
	private Integer grade;
	private Integer section;
	private Integer programId;
	private Integer instructorId;
	private boolean createdGroup;
	@Transient
	private boolean groupExists;
	@Transient
	private String programName;
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	
	public Integer getGrade() {
		return grade;
	}
	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public Integer getSection() {
		return section;
	}
	public void setSection(Integer section) {
		this.section = section;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getLocation() {
		return location;
	}
	public void setLocation(Integer location) {
		this.location = location;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isOpenCourse() {
		return openCourse;
	}
	public void setOpenCourse(boolean openCourse) {
		this.openCourse = openCourse;
	}
	public Integer getProgramId() {
		return programId;
	}
	public void setProgramId(Integer programId) {
		this.programId = programId;
	}
	public Integer getInstructorId() {
		return instructorId;
	}
	public void setInstructorId(Integer instructorId) {
		this.instructorId = instructorId;
	}
	public boolean getCreatedGroup() {
		return createdGroup;
	}
	public void setCreatedGroup(boolean createdGroup) {
		this.createdGroup = createdGroup;
	}
	public boolean isGroupExists() {
        return groupExists;
    }
    public void setGroupExists(boolean groupExists) {
        this.groupExists = groupExists;
    }
	public Course(String name, Integer location, String description, boolean openCourse, Integer grade,
			Integer programId, Integer instructorId, boolean createdGroup, Integer section) {
		super();
		this.name = name;
		this.location = location;
		this.description = description;
		this.openCourse = openCourse;
		this.grade = grade;
		this.programId = programId;
		this.instructorId = instructorId;
		this.createdGroup = createdGroup;
		this.section = section;
	}
	public Course() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.name)) errors.add("Name is required");
		if (!APIUtility.isNotNullOrEmpty(this.description)) errors.add("Description is required");
		if (this.location == null || this.location <= 0) errors.add("Location is required");
		if (this.programId == null || this.programId <= 0) errors.add("Program is required");
		return errors;
	}
	public void setUpdateFields(Course course) {
		if (APIUtility.isNotNullOrEmpty(course.name)) this.name = course.name;
		if (APIUtility.isNotNullOrEmpty(course.description)) this.description = course.description;
		if (course.location != null && course.location > 0) this.location = course.location;
		if (course.grade != null && course.grade > 0) this.grade = course.grade;
		if (course.programId != null && course.programId > 0) this.programId = course.programId;
		if (course.instructorId != null && course.instructorId > 0) this.instructorId = course.instructorId;
		if (course.section != null && course.section > 0) this.section = course.section;
		this.openCourse = course.openCourse;
		this.createdGroup = course.createdGroup;
	}
}