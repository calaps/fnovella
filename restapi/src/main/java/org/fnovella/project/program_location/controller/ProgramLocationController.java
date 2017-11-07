package org.fnovella.project.program_location.controller;

import java.util.ArrayList;

import org.fnovella.project.program_location.model.ProgramLocation;
import org.fnovella.project.program_location.repository.ProgramLocationRepository;
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
@RequestMapping("/program_location/")
public class ProgramLocationController {
	@Autowired
	private ProgramLocationRepository programLocationRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.programLocationRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramLocation programLocation = this.programLocationRepository.findOne(id);
		if (programLocation != null) {
			return new APIResponse(programLocation, null);
		}
		errors.add("Program Location doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ProgramLocation programLocation) {
		ArrayList<String> errors = programLocation.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.programLocationRepository.save(programLocation), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody ProgramLocation programLocation) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramLocation toUpdate = this.programLocationRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(programLocation);
			return new APIResponse(this.programLocationRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Program Location doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		ProgramLocation toDelete = this.programLocationRepository.findOne(id);
		if (toDelete != null) {
			this.programLocationRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Program Location doesn't exist");
		return new APIResponse(null, errors);
	}
}