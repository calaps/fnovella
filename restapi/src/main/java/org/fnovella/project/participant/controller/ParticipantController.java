package org.fnovella.project.participant.controller;

import java.util.ArrayList;

import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.repository.ParticipantRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/participant/")
public class ParticipantController {

	@Autowired
	private ParticipantRepository participantRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization) {
		return new APIResponse(this.participantRepository.findAll(), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.participantRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestBody Participant participant, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		if (errors.size() == 0) {
			return new APIResponse(this.participantRepository.save(participant), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@PathVariable("id") Integer id, @RequestBody Participant participant, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Participant toUpdate = this.participantRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdatedFields(participant);
			toUpdate = this.participantRepository.saveAndFlush(participant);
			return new APIResponse(toUpdate, null);
		}
		errors.add("Participant doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Participant toDelete = this.participantRepository.findOne(id);
		if (toDelete != null) {
			this.participantRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Participant doesn't exist");
		return new APIResponse(null, errors);
	}
	
}