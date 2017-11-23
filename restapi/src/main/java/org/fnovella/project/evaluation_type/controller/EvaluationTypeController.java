package org.fnovella.project.evaluation_type.controller;

import java.util.ArrayList;

import org.fnovella.project.evaluation_type.model.EvaluationType;
import org.fnovella.project.evaluation_type.repository.EvaluationTypeRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/evaluation_type/")
public class EvaluationTypeController {

	private EvaluationTypeRepository evaluationTypeRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.evaluationTypeRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.evaluationTypeRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody EvaluationType es) {
		ArrayList<String> errors = es.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.evaluationTypeRepository.save(es), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody EvaluationType es,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationType toUpdate = this.evaluationTypeRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(es);
			return new APIResponse(this.evaluationTypeRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Object doens't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationType toDelete = this.evaluationTypeRepository.findOne(id);
		if (toDelete != null) {
			this.evaluationTypeRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Object doens't exist");
		return new APIResponse(null, errors);
	}
	
}