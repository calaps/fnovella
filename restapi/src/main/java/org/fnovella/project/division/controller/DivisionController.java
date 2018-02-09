package org.fnovella.project.division.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.division.model.Division;
import org.fnovella.project.division.repository.DivisionRepository;
import org.fnovella.project.division.service.DivisionService;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.fnovella.project.program.repository.ProgramRepository;

@RestController
@RequestMapping("/division/")
public class DivisionController {
	
	@Autowired
	private DivisionRepository divisionRepository;
	@Autowired
	private ProgramRepository programRepository;

	@Autowired
	private DivisionService divisionService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.divisionService.getAllDivisions(pageable), null);
	}

	@RequestMapping(value = "delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		Division division = this.divisionRepository.findOne(id);
		return new APIResponse(division == null, null);
	}

	@RequestMapping(value = "by-programa/{programa}", method = RequestMethod.GET)
	public APIResponse getDivisionByPrograma(@RequestHeader("authorization") String authorization, Pageable pageable, @PathVariable("programa") Integer programa) {
		List<Division> divisions = this.divisionRepository.findByPrograma(programa);
		return new APIResponse(new PageImpl<>(divisions, pageable, divisions.size()), null);
	}

	@RequestMapping(value = "by-location/{location}", method = RequestMethod.GET)
	public APIResponse getDivisionByLocation(@RequestHeader("authorization") String authorization, Pageable pageable, @PathVariable("location") Integer location) {
		Page<Division> divisions = this.divisionRepository.findByLocation(location, pageable);
		return new APIResponse(divisions, null);
	}


	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Division division = this.divisionRepository.findOne(id);
		if (division != null) {
			division.setProgramName(this.programRepository.findOne(division.getPrograma()).getName());
			return new APIResponse(division, null);
		}
		errors.add("Division doesn't exist");
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Division division) {
		ArrayList<String> errors = division.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.divisionRepository.save(division), null);	
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody Division division) {
		ArrayList<String> errors = new ArrayList<String>();
		Division toUpdate = this.divisionRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(division);
			return new APIResponse(this.divisionRepository.saveAndFlush(toUpdate), null);	
		}
		errors.add("Division doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Division toDelete = this.divisionRepository.findOne(id);
		if (toDelete != null) {
			this.divisionRepository.delete(toDelete);
			return new APIResponse(true, null);	
		}
		errors.add("Division doesn't exist");
		return new APIResponse(null, errors);
	}
	
}