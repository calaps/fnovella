package org.fnovella.project.instructor.model;

import java.util.ArrayList;
import java.util.List;

public class InstructorProgram {

	private Instructor instructor;
	private List<Integer> programIds;
	public Instructor getInstructor() {
		return instructor;
	}
	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}
	public List<Integer> getProgramIds() {
		return programIds;
	}
	public void setProgramIds(List<Integer> programIds) {
		this.programIds = programIds;
	}
	public InstructorProgram(Instructor instructor, List<Integer> programIds) {
		super();
		this.instructor = instructor;
		this.programIds = programIds;
	}
	public InstructorProgram() {
		super();
	}
	
	public ArrayList<String> validate() {
		return this.instructor.validate();
	}
	
}