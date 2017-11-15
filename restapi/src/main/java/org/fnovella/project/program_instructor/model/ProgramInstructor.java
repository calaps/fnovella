package org.fnovella.project.program_instructor.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.fnovella.project.program.model.Program;

@Entity
public class ProgramInstructor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer program;
	private Integer instructor;
	@ManyToOne()
	@JoinColumn(name="program", updatable=false, insertable=false)
	private Program programData;
	
	public Program getProgramData() {
		return programData;
	}

	public void setProgramData(Program programData) {
		this.programData = programData;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getProgram() {
		return program;
	}

	public void setProgram(Integer program) {
		this.program = program;
	}

	public Integer getInstructor() {
		return instructor;
	}

	public void setInstructor(Integer instructor) {
		this.instructor = instructor;
	}

	public ProgramInstructor(Integer program, Integer instructor) {
		super();
		this.program = program;
		this.instructor = instructor;
	}

	public ProgramInstructor() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.program == null || this.program <= 0) errors.add("Program is required");
		if (this.instructor == null || this.instructor <= 0) errors.add("Instructor is required");
		return errors;
	}

	public void setUpdateFields(ProgramInstructor programInstructor) {
		if (programInstructor.program != null && programInstructor.program > 0) this.program = programInstructor.program;
		if (programInstructor.instructor != null && programInstructor.instructor > 0) this.instructor = programInstructor.instructor;
	}

}