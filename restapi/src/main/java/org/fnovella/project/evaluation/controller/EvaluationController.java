package org.fnovella.project.evaluation.controller;

import java.util.ArrayList;

import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation.repository.EvaluationRepository;
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
@RequestMapping("/evaluation/")
public class EvaluationController {

	@Autowired
	private EvaluationRepository evaluationRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.evaluationRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Evaluation evaluation = this.evaluationRepository.findOne(id);
		if (evaluation != null)
			return new APIResponse(evaluation, null);
		errors.add("Evaluation doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Evaluation evaluation) {
		ArrayList<String> errors = evaluation.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.evaluationRepository.save(evaluation), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id, 
			@RequestBody Evaluation evaluation) {
		ArrayList<String> errors = new ArrayList<String>();
		Evaluation toUpdate = this.evaluationRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(evaluation);
			return new APIResponse(this.evaluationRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Evaluation doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Evaluation evaluation = this.evaluationRepository.findOne(id);
		if (evaluation != null) {
			this.evaluationRepository.delete(evaluation);
			return new APIResponse(true, null);	
		}
		errors.add("Evaluation doesn't exist");
		return new APIResponse(null, errors);
	}
}