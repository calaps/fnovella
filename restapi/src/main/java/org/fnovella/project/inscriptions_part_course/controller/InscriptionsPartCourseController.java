package org.fnovella.project.inscriptions_part_course.controller;

import java.util.ArrayList;

import org.fnovella.project.inscriptions_part_course.model.InscriptionsPartCourse;
import org.fnovella.project.inscriptions_part_course.repository.InscriptionsPartCourseRepository;
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
@RequestMapping("/inscriptions_part_course/")
public class InscriptionsPartCourseController {

	@Autowired
	private InscriptionsPartCourseRepository inscriptionsPartCourseRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.inscriptionsPartCourseRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartCourseRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "participant/{id}", method = RequestMethod.GET)
	public APIResponse getByParticipantId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartCourseRepository.findByParticipantId(id), null);
	}
	
	@RequestMapping(value = "course/{id}", method = RequestMethod.GET)
	public APIResponse getByCourseId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartCourseRepository.findByCourseId(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsPartCourse inscriptionsPartCourse) {
		ArrayList<String> errors = inscriptionsPartCourse.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.inscriptionsPartCourseRepository.save(inscriptionsPartCourse), null);	
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsPartCourse inscriptionsPartCourse,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsPartCourse toUpdate = this.inscriptionsPartCourseRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(inscriptionsPartCourse);
			return new APIResponse(this.inscriptionsPartCourseRepository.saveAndFlush(toUpdate), null);	
		}
		errors.add("Inscriptions Part Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsPartCourse toDelete = this.inscriptionsPartCourseRepository.findOne(id);
		if (toDelete != null) {
			this.inscriptionsPartCourseRepository.delete(toDelete);
			return new APIResponse(true, null);	
		}
		errors.add("Inscriptions Part Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
}