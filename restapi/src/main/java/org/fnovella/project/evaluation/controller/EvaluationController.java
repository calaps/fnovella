package org.fnovella.project.evaluation.controller;

import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation.repository.EvaluationRepository;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.repository.GroupRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/evaluation/")
public class EvaluationController {

	@Autowired
	private EvaluationRepository evaluationRepository;
	@Autowired
	private GroupRepository groupRepository;

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

	@RequestMapping(value = "by-group/{groupId}", method = RequestMethod.GET)
	public APIResponse byGroup(@RequestHeader("authorization") String authorization, @PathVariable("groupId") Integer groupId) {
		Group group = this.groupRepository.findOne(groupId);
		if (group == null) {
			List<String> errors = new ArrayList<>();
			errors.add("Group with id :" + groupId + " cannot be found");
			return new APIResponse(null, errors);
		}
		List<Evaluation> evaluations = this.evaluationRepository.findByGroup(groupId);
		return new APIResponse(evaluations, null);
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