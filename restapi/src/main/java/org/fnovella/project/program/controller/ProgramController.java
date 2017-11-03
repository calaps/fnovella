package org.fnovella.project.program.controller;

import java.util.ArrayList;

import org.fnovella.project.catalog_relation.repository.CatalogRelationRepository;
import org.fnovella.project.program.model.Program;
import org.fnovella.project.program.repository.ProgramRepository;
import org.fnovella.project.program_activation.repository.ProgramActivationRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/program/")
public class ProgramController {

	@Autowired
	private ProgramRepository programRepository;
	@Autowired
	private CatalogRelationRepository catalogRelationRepository;
	@Autowired
	private ProgramActivationRepository programActivationRepository;
	
	@RequestMapping(value = "", method=RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, @RequestParam("type") int type, 
			Pageable pageable) {
		Page<Program> programPage = null;
		switch (type) {
		case 0:
			programPage = this.programRepository.findByType(pageable, false);
			break;
		case 1:
			programPage = this.programRepository.findByType(pageable, true);
			break;
		case 2:
			programPage = this.programRepository.findAll(pageable);
			break;
		}
		return new APIResponse(programPage, null);
	}
	
	@RequestMapping(value = "{id}", method=RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.programRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "", method=RequestMethod.POST)
	public APIResponse create(@RequestBody Program program, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = program.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.programRepository.save(program), null);
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method=RequestMethod.PATCH)
	public APIResponse update(@RequestBody Program program, @RequestHeader("authorization") String authorization, 
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Program toUpdate = this.programRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(program);
			return new APIResponse(this.programRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Program doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method=RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		this.programActivationRepository.deleteByProgramId(id);
		this.catalogRelationRepository.deleteByIdProgram(id);
		this.programRepository.delete(id);
		return new APIResponse(true, null);
	}
	
}