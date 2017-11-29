package org.fnovella.project.program_instructor.controller;

import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.fnovella.project.program_instructor.repository.ProgramInstructorRepository;
import org.fnovella.project.program_instructor.service.ProgramInstructorService;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/program_instructor/")
public class ProgramInstructorController {

	@Autowired
	private ProgramInstructorRepository programInstructorRepository;

	@Autowired
	private ProgramInstructorService programInstructorService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		Page<ProgramInstructor> programInstructors = this.programInstructorRepository.findAll(pageable);
		programInstructorService.addNameInstructorTo(programInstructors);
		return new APIResponse(programInstructors, null);
	}
	
	@RequestMapping(value = "{id}/instructor_id", method = RequestMethod.GET)
	public APIResponse getByInstructorId(@RequestHeader("authorization") String authorization, Pageable pageable,
			@PathVariable("id") Integer id) {
		Page<ProgramInstructor> programInstructors = this.programInstructorRepository.findByInstructor(id, pageable);
		programInstructorService.addNameInstructorTo(programInstructors);
		return new APIResponse(programInstructors, null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramInstructor programInstructor = this.programInstructorRepository.findOne(id);
		if (programInstructor != null) {
			programInstructorService.setInstructorNameFor(programInstructor);
			return new APIResponse(programInstructor, null);
		}
		errors.add("Program Instructor doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ProgramInstructor programInstructor) {
		ArrayList<String> errors = programInstructor.validate();
		if (errors.size() == 0) {
			ProgramInstructor savedProgramInstructor = this.programInstructorRepository.save(programInstructor);
			programInstructorService.setInstructorNameFor(savedProgramInstructor);
			return new APIResponse(savedProgramInstructor, null);
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
			ProgramInstructor updatedProgramInstructor = this.programInstructorRepository.saveAndFlush(toUpdate);
			programInstructorService.setInstructorNameFor(updatedProgramInstructor);
			return new APIResponse(updatedProgramInstructor, null);
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