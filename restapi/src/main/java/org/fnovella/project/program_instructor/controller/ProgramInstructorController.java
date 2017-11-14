package org.fnovella.project.program_instructor.controller;

import java.util.ArrayList;

import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.fnovella.project.program_instructor.repository.ProgramInstructorRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/program_instructor/")
public class ProgramInstructorController {

	@Autowired
	private ProgramInstructorRepository programInstructorRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.programInstructorRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}/instructor_id", method = RequestMethod.GET)
	public APIResponse getByInstructorId(@RequestHeader("authorization") String authorization, Pageable pageable,
			@PathVariable("id") Integer id) {
		return new APIResponse(this.programInstructorRepository.findByInstructor(id, pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramInstructor programInstructor = this.programInstructorRepository.findOne(id);
		if (programInstructor != null) {
			return new APIResponse(programInstructor, null);
		}
		errors.add("Program Instructor doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ProgramInstructor programInstructor) {
		ArrayList<String> errors = programInstructor.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.programInstructorRepository.save(programInstructor), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody ProgramInstructor programInstructor) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramInstructor toUpdate = this.programInstructorRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(programInstructor);
			return new APIResponse(this.programInstructorRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Program Instructor doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramInstructor toDelete = this.programInstructorRepository.findOne(id);
		if (toDelete != null) {
			this.programInstructorRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Program Instructor doesn't exist");
		return new APIResponse(null, errors);
	}
	
}