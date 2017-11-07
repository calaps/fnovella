package org.fnovella.project.division.controller;

import java.util.ArrayList;

import org.fnovella.project.division.model.Division;
import org.fnovella.project.division.repository.DivisionRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/division/")
public class DivisionController {
	
	private DivisionRepository divisionRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.divisionRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Division division = this.divisionRepository.findOne(id);
		if (division != null) {
			return new APIResponse(this.divisionRepository.findOne(id), null);	
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
	public APIResponse dlete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
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