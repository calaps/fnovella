package org.fnovella.project.participant_aditional_fields.controller;

import java.util.ArrayList;

import org.fnovella.project.participant_aditional_fields.model.ParticipantAditionalFields;
import org.fnovella.project.participant_aditional_fields_values.model.ParticipantAditionalFieldsValues;
import org.fnovella.project.participant_aditional_fields.model.ParticipantAditionalFieldsObject;
import org.fnovella.project.participant_aditional_fields.repository.ParticipantAditionalFieldsRepository;
import org.fnovella.project.participant_aditional_fields_values.repository.ParticipantAditionalFieldsValuesRepository;
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
@RequestMapping("/participant_aditional_fields/")
public class ParticipantAditionalFieldsController {

	@Autowired
	private ParticipantAditionalFieldsRepository participantAditionalFieldsRepository;
	@Autowired
    private ParticipantAditionalFieldsValuesRepository participantAditionalFieldsValuesRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.participantAditionalFieldsRepository.findAll(pageable), null);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.participantAditionalFieldsRepository.findOne(id), null);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ParticipantAditionalFieldsObject es) {
		ArrayList<String> errors = es.getParticipantAditionalFields().validate();
		if (errors.isEmpty()) {
			ParticipantAditionalFieldsObject response = new ParticipantAditionalFieldsObject();
			response.setParticipantAditionalFields(this.participantAditionalFieldsRepository.save(es.getParticipantAditionalFields()));
			response.setParticipantAditionalFieldsValues(new ArrayList<ParticipantAditionalFieldsValues>());
			if (es.getParticipantAditionalFieldsValues() != null && !es.getParticipantAditionalFieldsValues().isEmpty()){ 
				for (ParticipantAditionalFieldsValues value : es.getParticipantAditionalFieldsValues()) {
					value.setAditionalFieldId(response.getParticipantAditionalFields().getId());
					response.getParticipantAditionalFieldsValues().add(this.participantAditionalFieldsValuesRepository.save(value));
				}
			}
			return new APIResponse(response, null);
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody ParticipantAditionalFieldsObject es,
		@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ParticipantAditionalFields toUpdate = this.participantAditionalFieldsRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(es.getParticipantAditionalFields());
			ParticipantAditionalFieldsObject response = new ParticipantAditionalFieldsObject();
			response.setParticipantAditionalFields(this.participantAditionalFieldsRepository.saveAndFlush(toUpdate));
			response.setParticipantAditionalFieldsValues(new ArrayList<ParticipantAditionalFieldsValues>());
			this.participantAditionalFieldsValuesRepository.deleteByAditionalFieldId(response.getParticipantAditionalFields().getId());
			if (es.getParticipantAditionalFieldsValues() != null && !es.getParticipantAditionalFieldsValues().isEmpty()){ 
				for (ParticipantAditionalFieldsValues value : es.getParticipantAditionalFieldsValues()) {
					value.setAditionalFieldId(response.getParticipantAditionalFields().getId());
					response.getParticipantAditionalFieldsValues().add(this.participantAditionalFieldsValuesRepository.save(value));
				}	
			}
			return new APIResponse(response, null);
		}
		errors.add("Object doens't exist");
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ParticipantAditionalFields toDelete = this.participantAditionalFieldsRepository.findOne(id);
		if (toDelete != null) {
			this.participantAditionalFieldsRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Object doens't exist");
		return new APIResponse(null, errors);
	}

}