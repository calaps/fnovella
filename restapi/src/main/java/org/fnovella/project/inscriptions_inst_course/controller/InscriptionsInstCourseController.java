package org.fnovella.project.inscriptions_inst_course.controller;

import java.util.ArrayList;

import org.fnovella.project.inscriptions_inst_course.model.InscriptionsInstCourse;
import org.fnovella.project.inscriptions_inst_course.repository.InscriptionsInstCourseRepository;
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
@RequestMapping("/inscriptions_inst_course/")
public class InscriptionsInstCourseController {

	@Autowired
	private InscriptionsInstCourseRepository inscriptionsInstCourseRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.inscriptionsInstCourseRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstCourseRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "course/{id}", method = RequestMethod.GET)
	public APIResponse getByCourseId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstCourseRepository.findByCourseId(id), null);
	}
	
	@RequestMapping(value = "instructor/{id}", method = RequestMethod.GET)
	public APIResponse getByInstructorId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstCourseRepository.findByInstructorId(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsInstCourse inscriptionsInstCourse) {
		ArrayList<String> errors = inscriptionsInstCourse.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.inscriptionsInstCourseRepository.save(inscriptionsInstCourse), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsInstCourse inscriptionsInstCourse,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsInstCourse toUpdate = this.inscriptionsInstCourseRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(inscriptionsInstCourse);
			return new APIResponse(this.inscriptionsInstCourseRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Inscriptions Inst Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse create(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsInstCourse toDelete = this.inscriptionsInstCourseRepository.findOne(id);
		if (toDelete != null) {
			this.inscriptionsInstCourseRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Inscriptions Inst Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
}