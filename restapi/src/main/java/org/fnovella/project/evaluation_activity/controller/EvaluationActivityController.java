package org.fnovella.project.evaluation_activity.controller;

import java.util.ArrayList;

import org.fnovella.project.evaluation_activity.model.EvaluationActivity;
import org.fnovella.project.evaluation_activity.repository.EvaluationActivityRepository;
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
@RequestMapping("/evaluation_activity/")
public class EvaluationActivityController {

	@Autowired
	private EvaluationActivityRepository evaluationActivityRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.evaluationActivityRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivity evaluationActivity = this.evaluationActivityRepository.findOne(id);
		if (evaluationActivity != null) {
			return new APIResponse(evaluationActivity, null);
		}
		errors.add("Evaluation Activity doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody EvaluationActivity evaluationActivity) {
		ArrayList<String> errors = evaluationActivity.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.evaluationActivityRepository.save(evaluationActivity), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody EvaluationActivity evaluationActivity,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivity toUpdate = this.evaluationActivityRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(evaluationActivity);
			return new APIResponse(this.evaluationActivityRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Evaluation Activity doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivity toDelete = this.evaluationActivityRepository.findOne(id);
		if (toDelete != null) {
			this.evaluationActivityRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Evaluation Activity doesn't exist");
		return new APIResponse(null, errors);
	}
	
	
}