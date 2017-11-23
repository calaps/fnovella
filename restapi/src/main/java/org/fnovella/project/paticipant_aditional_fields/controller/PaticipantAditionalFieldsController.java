package org.fnovella.project.paticipant_aditional_fields.controller;

import java.util.ArrayList;

import org.fnovella.project.paticipant_aditional_fields.model.PaticipantAditionalFields;
import org.fnovella.project.paticipant_aditional_fields.repository.PaticipantAditionalFieldsRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/participant_aditional_fields/")
public class PaticipantAditionalFieldsController {

	private PaticipantAditionalFieldsRepository paticipantAditionalFieldsRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.paticipantAditionalFieldsRepository.findAll(pageable), null);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.paticipantAditionalFieldsRepository.findOne(id), null);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody PaticipantAditionalFields es) {
		ArrayList<String> errors = es.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.paticipantAditionalFieldsRepository.save(es), null);
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody PaticipantAditionalFields es,
		@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		PaticipantAditionalFields toUpdate = this.paticipantAditionalFieldsRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(es);
			return new APIResponse(this.paticipantAditionalFieldsRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Object doens't exist");
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		PaticipantAditionalFields toDelete = this.paticipantAditionalFieldsRepository.findOne(id);
		if (toDelete != null) {
			this.paticipantAditionalFieldsRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Object doens't exist");
		return new APIResponse(null, errors);
	}

}