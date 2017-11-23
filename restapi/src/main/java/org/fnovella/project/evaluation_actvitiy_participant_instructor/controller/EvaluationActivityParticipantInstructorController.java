package org.fnovella.project.evaluation_actvitiy_participant_instructor.controller;

import java.util.ArrayList;

import org.fnovella.project.evaluation_actvitiy_participant_instructor.model.EvaluationActivityParticipantInstructor;
import org.fnovella.project.evaluation_actvitiy_participant_instructor.repository.EvaluationActivityParticipantInstructorRepository;
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
@RequestMapping("/evaluation_activity_participant_instructor/")
public class EvaluationActivityParticipantInstructorController {

	@Autowired
	private EvaluationActivityParticipantInstructorRepository evaluationActivityParticipantInstructorRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.evaluationActivityParticipantInstructorRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.evaluationActivityParticipantInstructorRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody EvaluationActivityParticipantInstructor eapi) {
		ArrayList<String> errors = eapi.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.evaluationActivityParticipantInstructorRepository.save(eapi), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody EvaluationActivityParticipantInstructor eapi,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivityParticipantInstructor toUpdate = this.evaluationActivityParticipantInstructorRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(eapi);
			return new APIResponse(this.evaluationActivityParticipantInstructorRepository.saveAndFlush(toUpdate), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		EvaluationActivityParticipantInstructor toDelete = this.evaluationActivityParticipantInstructorRepository.findOne(id);
		if (toDelete != null) {
			this.evaluationActivityParticipantInstructorRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Object doesn't exist");
		return new APIResponse(null, errors);
	}
}