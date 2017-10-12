package org.fnovella.project.location.controller;

import java.util.ArrayList;

import org.fnovella.project.grade.repository.GradeRepository;
import org.fnovella.project.location.model.Location;
import org.fnovella.project.location.repository.LocationRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/location/")
public class LocationController {

	@Autowired
	private LocationRepository locationRepository;
	@Autowired
	private GradeRepository gradeRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization) {
		return new APIResponse(this.locationRepository.findAll(), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.locationRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Location location) {
		ArrayList<String> errors = location.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.locationRepository.save(location), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody Location location,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Location toUpdate = this.locationRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(location);
			return new APIResponse(this.locationRepository.save(toUpdate), null);
		}
		errors.add("Location doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Location toUpdate = this.locationRepository.findOne(id);
		if (toUpdate != null) {
			this.gradeRepository.deleteByLocationId(id);
			this.locationRepository.delete(id);
			return new APIResponse(true, null);
		}
		errors.add("Location doesn't exist");
		return new APIResponse(null, errors);
	}
	
}