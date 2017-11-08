package org.fnovella.project.program_app_user.controller;

import java.util.ArrayList;

import org.fnovella.project.program_app_user.model.ProgramAppUser;
import org.fnovella.project.program_app_user.repository.ProgramAppUserRepository;
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
@RequestMapping("/program_app_user/")
public class ProgramAppUserController {
	@Autowired
	private ProgramAppUserRepository programAppUserRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.programAppUserRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramAppUser programAppUser = this.programAppUserRepository.findOne(id);
		if (programAppUser != null) {
			return new APIResponse(programAppUser, null);
		}
		errors.add("Program App User doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ProgramAppUser programAppUser) {
		ArrayList<String> errors = programAppUser.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.programAppUserRepository.save(programAppUser), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody ProgramAppUser programAppUser) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramAppUser toUpdate = this.programAppUserRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(programAppUser);
			return new APIResponse(this.programAppUserRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Program App User doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramAppUser toDelete = this.programAppUserRepository.findOne(id);
		if (toDelete != null) {
			this.programAppUserRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Program App User doesn't exist");
		return new APIResponse(null, errors);
	}
}