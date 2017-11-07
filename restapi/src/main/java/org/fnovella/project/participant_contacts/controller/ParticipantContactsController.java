package org.fnovella.project.participant_contacts.controller;

import java.util.ArrayList;

import org.fnovella.project.participant_contacts.model.ParticipantContacts;
import org.fnovella.project.participant_contacts.repository.ParticipantContactsRepository;
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
@RequestMapping("/participant_contacts/")
public class ParticipantContactsController {

	@Autowired
	private ParticipantContactsRepository participantContactsRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.participantContactsRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable ("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ParticipantContacts participantContacts = this.participantContactsRepository.findOne(id);
		if (participantContacts != null) {
			return new APIResponse(participantContacts, null);
		}
		errors.add("Participant Contacts doesn't exist");
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{participant_id}/participant_id", method = RequestMethod.GET)
	public APIResponse getByParticipantId(@RequestHeader("authorization") String authorization, Pageable pageable,
		@PathVariable ("participant_id") Integer participantId) {
		return new APIResponse(this.participantContactsRepository.findByParticipantId(participantId, pageable), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ParticipantContacts participantContacts) {
		ArrayList<String> errors = participantContacts.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.participantContactsRepository.save(participantContacts), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable ("id") Integer id,
			@RequestBody ParticipantContacts participantContacts) {
		ArrayList<String> errors = new ArrayList<String>();
		ParticipantContacts toUpdate = this.participantContactsRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(participantContacts);
			return new APIResponse(this.participantContactsRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Participant Contacts doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable ("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ParticipantContacts participantContacts = this.participantContactsRepository.findOne(id);
		if (participantContacts != null) {
			this.participantContactsRepository.delete(participantContacts);
			return new APIResponse(true, null);
		}
		errors.add("Participant Contacts doesn't exist");
		return new APIResponse(null, errors);
	}
}