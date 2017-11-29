package org.fnovella.project.evaluation_activity_participant.controller;

import java.util.ArrayList;

import org.fnovella.project.evaluation_activity_participant.model.EvaluationActivityParticipant;
import org.fnovella.project.evaluation_activity_participant.repository.EvaluationActivityParticipantRepository;
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
@RequestMapping("/evaluation_activity_participant/")
public class EvaluationActivityParticipantController {

	@Autowired
	private EvaluationActivityParticipantRepository evaluationActivityParticipantRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.evaluationActivityParticipantRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.evaluationActivityParticipantRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody EvaluationActivityParticipant eap) {
		ArrayList<String> errors = eap.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.evaluationActivityParticipantRepository.save(eap), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody EvaluationActivityParticipant eap,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivityParticipant toUpdate = this.evaluationActivityParticipantRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateField(eap);
			return new APIResponse(this.evaluationActivityParticipantRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Object doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivityParticipant toDelete = this.evaluationActivityParticipantRepository.findOne(id);
		if (toDelete != null) {
			this.evaluationActivityParticipantRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Object doesn't exist");
		return new APIResponse(null, errors);
	}
	
}