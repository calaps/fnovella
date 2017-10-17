package org.fnovella.project.program_activation.controller;

import java.util.ArrayList;

import org.fnovella.project.program_activation.model.ProgramActivation;
import org.fnovella.project.program_activation.repository.ProgramActivationRepository;
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
@RequestMapping("/program_activation/")
public class ProgramActivationController {

	@Autowired
	private ProgramActivationRepository programActivationRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.programActivationRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramActivation programActivation = this.programActivationRepository.findOne(id);
		if (programActivation != null) {
			return new APIResponse(programActivation, null);
		}
		errors.add("Program Activation doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ProgramActivation programActivation) {
		ArrayList<String> errors = programActivation.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.programActivationRepository.save(programActivation), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody ProgramActivation programActivation) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramActivation toUpdate = this.programActivationRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(programActivation);
			return new APIResponse(this.programActivationRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Program Activation doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramActivation programActivation = this.programActivationRepository.findOne(id);
		if (programActivation != null) {
			this.programActivationRepository.delete(programActivation);
			return new APIResponse(true, null);
		}
		errors.add("Program Activation doesn't exist");
		return new APIResponse(null, errors);
	}
}