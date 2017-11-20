package org.fnovella.project.program.model;

import java.util.ArrayList;
import java.util.List;

public class ProgramLocationCategory {

	private Program program;
	private List<Integer> locationIds;
	private List<Integer> categoryIds;
	public Program getProgram() {
		return program;
	}
	public void setProgram(Program program) {
		this.program = program;
	}
	public List<Integer> getLocationIds() {
		return locationIds;
	}
	public void setLocationIds(List<Integer> locationIds) {
		this.locationIds = locationIds;
	}
	public List<Integer> getCategoryIds() {
		return categoryIds;
	}
	public void setCategoryIds(List<Integer> categoryIds) {
		this.categoryIds = categoryIds;
	}
	public ProgramLocationCategory(Program program, List<Integer> locationIds, List<Integer> categoryIds) {
		super();
		this.program = program;
		this.locationIds = locationIds;
		this.categoryIds = categoryIds;
	}
	public ProgramLocationCategory() {
		super();
	}
	
	public ArrayList<String> validate() {
		return this.program.validate();
	}
	
}