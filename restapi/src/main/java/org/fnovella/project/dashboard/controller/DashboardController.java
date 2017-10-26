package org.fnovella.project.dashboard.controller;

import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.dashboard.model.Dashboard;
import org.fnovella.project.instructor.repository.InstructorRepository;
import org.fnovella.project.participant.repository.ParticipantRepository;
import org.fnovella.project.program.repository.ProgramRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard/")
public class DashboardController {

	@Autowired
	private ProgramRepository programRepository;
	@Autowired
	private ParticipantRepository participantRepository;
	@Autowired
	private InstructorRepository instructorRepository;
	@Autowired
	private CourseRepository courseRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization) {
		Dashboard dashboard = new Dashboard();
		dashboard.setPrograms(programRepository.count());
		dashboard.setStudents(participantRepository.count());
		dashboard.setInstructors(instructorRepository.count());
		dashboard.setCourses(courseRepository.count());
		return new APIResponse(dashboard, null);
	}
	
}