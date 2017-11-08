package org.fnovella.project.instructor.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.inscriptions_inst_course.model.InscriptionsInstCourse;
import org.fnovella.project.inscriptions_inst_course.repository.InscriptionsInstCourseRepository;
import org.fnovella.project.instructor.model.Instructor;
import org.fnovella.project.instructor.model.InstructorSearch;
import org.fnovella.project.instructor.repository.InstructorRepository;
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
@RequestMapping("/instructor/")
public class IntructorController {

	@Autowired
	private InstructorRepository instructorRepository;
	@Autowired
	private InscriptionsInstCourseRepository inscriptionsInstCourseRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.instructorRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.instructorRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "search", method = RequestMethod.POST)
	public APIResponse search(@RequestHeader("authorization") String authorization, Pageable pageable, InstructorSearch instructoSearch) {
		return new APIResponse(instructoSearch.getResults(this.instructorRepository, pageable), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestBody Instructor instructor, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = instructor.validate();
		if (errors.size() == 0) {
			if (this.instructorRepository.findByEmail(instructor.getEmail()) == null) {
				return new APIResponse(this.instructorRepository.save(instructor), null);	
			} else {
				errors.add("Email is already in use");
			}
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestBody Instructor instructor, @PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = instructor.validate();
		Instructor toUpdate = this.instructorRepository.findOne(id);
		if (toUpdate != null) {
			if ((toUpdate.getEmail().equals(instructor.getEmail())) || 
					(!toUpdate.getEmail().equals(instructor.getEmail()) && this.instructorRepository.findByEmail(instructor.getEmail()) == null)) {
				toUpdate.setUpdateFields(instructor);
				toUpdate = this.instructorRepository.saveAndFlush(toUpdate);
				return new APIResponse(toUpdate, null);
			} else {
				errors.add("Email is already in use");
			}
		} else {
			errors.add("Instructor doesn't exist");
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Instructor toDelete = this.instructorRepository.findOne(id);
		if (toDelete != null) {
			List<InscriptionsInstCourse> list = this.inscriptionsInstCourseRepository.findByInstructorId(id);
			if (list != null && !list.isEmpty())
				this.inscriptionsInstCourseRepository.deleteByInstructorId(id);
			this.instructorRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Instructor doesn't exist");
		return new APIResponse(null, errors);
	}
}