package org.fnovella.project.dashboard.model;

public class Dashboard {

	private long programs;
	private long students;
	private long instructors;
	private long courses;
	public long getPrograms() {
		return programs;
	}
	public void setPrograms(long programs) {
		this.programs = programs;
	}
	public long getStudents() {
		return students;
	}
	public void setStudents(long students) {
		this.students = students;
	}
	public long getInstructors() {
		return instructors;
	}
	public void setInstructors(long instructors) {
		this.instructors = instructors;
	}
	public long getCourses() {
		return courses;
	}
	public void setCourses(long courses) {
		this.courses = courses;
	}
	public Dashboard(long programs, long students, long instructors, long courses) {
		super();
		this.programs = programs;
		this.students = students;
		this.instructors = instructors;
		this.courses = courses;
	}
	public Dashboard() {
		super();
	}
}