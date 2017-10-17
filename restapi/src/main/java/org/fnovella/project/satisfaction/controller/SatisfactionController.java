package org.fnovella.project.satisfaction.controller;

import java.util.ArrayList;

import org.fnovella.project.satisfaction.model.Satisfaction;
import org.fnovella.project.satisfaction.repository.SatisfactionRepository;
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
@RequestMapping("/satisfaction/")
public class SatisfactionController {

	@Autowired
	private SatisfactionRepository satisfactionRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.satisfactionRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Satisfaction satisfaction = this.satisfactionRepository.findOne(id);
		if (satisfaction != null) {
			return new APIResponse(satisfaction, null);
		}
		errors.add("Satisfcation doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Satisfaction satisfaction) {
		ArrayList<String> errors = satisfaction.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.satisfactionRepository.save(satisfaction), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody Satisfaction satisfaction,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Satisfaction toUpdate = this.satisfactionRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(satisfaction);
			return new APIResponse(this.satisfactionRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Satisfcation doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Satisfaction satisfaction = this.satisfactionRepository.findOne(id);
		if (satisfaction != null) {
			this.satisfactionRepository.delete(satisfaction);
			return new APIResponse(true, null);
		}
		errors.add("Satisfcation doesn't exist");
		return new APIResponse(null, errors);
	}
}