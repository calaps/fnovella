package org.fnovella.project.program_aditional_fields.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.program_aditional_fields.model.ProgramAditionalFields;
import org.fnovella.project.program_aditional_fields.repository.ProgramAditionalFieldsRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/program_aditional_fields/")
public class ProgramAditionalFieldsController {
	
	@Autowired
	private ProgramAditionalFieldsRepository programAditionalFieldsRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.programAditionalFieldsRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramAditionalFields programAditionalFields = this.programAditionalFieldsRepository.findOne(id);
		if (programAditionalFields != null) {
			return new APIResponse(programAditionalFields, null);
		}
		errors.add("Program Aditional Field doesn't exist");
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "by_program_id/{programId}", method = RequestMethod.GET)
	public APIResponse getByProgramId(@RequestHeader("authorization") String authorization, Pageable pageable , @PathVariable("programId") Integer programId) {
        List<ProgramAditionalFields> programAditionalFields = this.programAditionalFieldsRepository.findByProgram(programId);
        return new APIResponse(new PageImpl<>(programAditionalFields, pageable, programAditionalFields.size()), null);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ProgramAditionalFields programAditionalFields) {
		ArrayList<String> errors = programAditionalFields.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.programAditionalFieldsRepository.save(programAditionalFields), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody ProgramAditionalFields programAditionalFields) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramAditionalFields toUpdate = this.programAditionalFieldsRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(programAditionalFields);
			return new APIResponse(this.programAditionalFieldsRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Program Aditional Field doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramAditionalFields toDelete = this.programAditionalFieldsRepository.findOne(id);
		if (toDelete != null) {
			this.programAditionalFieldsRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Program Aditional Field doesn't exist");
		return new APIResponse(null, errors);
	}
	
}