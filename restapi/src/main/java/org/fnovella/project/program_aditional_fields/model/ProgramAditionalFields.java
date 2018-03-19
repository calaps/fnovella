package org.fnovella.project.program_aditional_fields.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import org.fnovella.project.category.model.Category;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Id;

@Entity
public class ProgramAditionalFields {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer program;
	private Integer category;
	
	@ManyToOne()
	@JoinColumn(name="category", updatable=false, insertable=false)
	private Category categoryData;

	public Integer getId() {
		return id;
	}


	public void setCategoryData(Category categoryData) {
		this.categoryData = categoryData;
	}

	public Category getCategoryData() {
		return categoryData;
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

	public Integer getCategory() {
		return category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}

	public ProgramAditionalFields(Integer program, Integer category, Category categoryData) {
		super();
		this.program = program;
		this.category = category;
		this.categoryData = categoryData;
	}

	public ProgramAditionalFields() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.program == null || this.program <= 0) errors.add("Program is required");
		if (this.category == null || this.category <= 0) errors.add("Category is required");
		return errors;
	}

	public void setUpdateFields(ProgramAditionalFields programAditionalFields) {
		if (programAditionalFields.program != null && programAditionalFields.program > 0) this.program = programAditionalFields.program;
		if (programAditionalFields.category != null && programAditionalFields.category > 0) this.category = programAditionalFields.category;
	}

}