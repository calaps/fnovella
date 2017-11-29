package org.fnovella.project.evaluation_range.controller;

import java.util.ArrayList;

import org.fnovella.project.evaluation_range.model.EvaluationRange;
import org.fnovella.project.evaluation_range.repository.EvaluationRangeRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/evaluation_range/")
public class EvaluationRangeController {

	private EvaluationRangeRepository evaluationRangeRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.evaluationRangeRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.evaluationRangeRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody EvaluationRange er) {
		ArrayList<String> errors = er.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.evaluationRangeRepository.save(er), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody EvaluationRange er,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationRange toUpdate = this.evaluationRangeRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(er);
			return new APIResponse(this.evaluationRangeRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Object doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationRange toDelete = this.evaluationRangeRepository.findOne(id);
		if (toDelete != null) {
			this.evaluationRangeRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Object doesn't exist");
		return new APIResponse(null, errors);
	}
	
}