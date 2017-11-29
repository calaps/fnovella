package org.fnovella.project.evaluation_activity_instructor.controller;

import java.util.ArrayList;

import org.fnovella.project.evaluation_activity_instructor.model.EvaluationActivityInstructor;
import org.fnovella.project.evaluation_activity_instructor.repository.EvaluationActivityInstructorRepository;
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
@RequestMapping("/evaluation_activity_instructor/")
public class EvaluationActivityInstructorController {

	@Autowired
	private EvaluationActivityInstructorRepository evaluationActivityInstructorRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.evaluationActivityInstructorRepository.findAll(pageable), null);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.evaluationActivityInstructorRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody EvaluationActivityInstructor eti) {
		ArrayList<String> errors = eti.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.evaluationActivityInstructorRepository.save(eti), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody EvaluationActivityInstructor eti,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivityInstructor toUpdate = this.evaluationActivityInstructorRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(eti);
			return new APIResponse(this.evaluationActivityInstructorRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Object doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivityInstructor toDelete = this.evaluationActivityInstructorRepository.findOne(id);
		if (toDelete != null) {
			this.evaluationActivityInstructorRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Object doesn't exist");
		return new APIResponse(null, errors);
	}
	
}