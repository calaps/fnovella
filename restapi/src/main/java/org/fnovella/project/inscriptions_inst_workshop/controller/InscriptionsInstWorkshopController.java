package org.fnovella.project.inscriptions_inst_workshop.controller;

import java.util.ArrayList;

import org.fnovella.project.inscriptions_inst_workshop.model.InscriptionsInstWorkshop;
import org.fnovella.project.inscriptions_inst_workshop.repository.InscriptionsInstWorkshopRepository;
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
@RequestMapping("/inscriptions_inst_workshop/")
public class InscriptionsInstWorkshopController {

	@Autowired
	private InscriptionsInstWorkshopRepository inscriptionsInstWorkshopRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.inscriptionsInstWorkshopRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstWorkshopRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "workshop/{id}", method = RequestMethod.GET)
	public APIResponse getByWorkshopId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstWorkshopRepository.findByWorkshopId(id), null);
	}
	
	@RequestMapping(value = "instructor/{id}", method = RequestMethod.GET)
	public APIResponse getByInstructorId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstWorkshopRepository.findByInstructorId(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsInstWorkshop inscriptionsInstWorkshop) {
		ArrayList<String> errors = inscriptionsInstWorkshop.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.inscriptionsInstWorkshopRepository.save(inscriptionsInstWorkshop), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsInstWorkshop inscriptionsInstWorkshop,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsInstWorkshop toUpdate = this.inscriptionsInstWorkshopRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(inscriptionsInstWorkshop);
			return new APIResponse(this.inscriptionsInstWorkshopRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Inscriptions Inst Workshop doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse create(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsInstWorkshop toDelete = this.inscriptionsInstWorkshopRepository.findOne(id);
		if (toDelete != null) {
			this.inscriptionsInstWorkshopRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Inscriptions Inst Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
}