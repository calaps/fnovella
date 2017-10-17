package org.fnovella.project.inscriptions_part_workshop.controller;

import java.util.ArrayList;

import org.fnovella.project.inscriptions_part_workshop.model.InscriptionsPartWorkshop;
import org.fnovella.project.inscriptions_part_workshop.repository.InscriptionsPartWorkshopRepository;
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
@RequestMapping("/inscriptions_part_workshop/")
public class InscriptionsPartWorkshopController {

	@Autowired
	private InscriptionsPartWorkshopRepository inscriptionsPartWorkshopRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.inscriptionsPartWorkshopRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartWorkshopRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "participant/{id}", method = RequestMethod.GET)
	public APIResponse getByParticipantId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartWorkshopRepository.findByParticipantId(id), null);
	}
	
	@RequestMapping(value = "workshop/{id}", method = RequestMethod.GET)
	public APIResponse getByWorkshopId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartWorkshopRepository.findByWorkshopId(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse getByCourseId(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsPartWorkshop inscriptionsPartWorkshop) {
		ArrayList<String> errors = inscriptionsPartWorkshop.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.inscriptionsPartWorkshopRepository.save(inscriptionsPartWorkshop), null);	
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsPartWorkshop inscriptionsPartWorkshop,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsPartWorkshop toUpdate = this.inscriptionsPartWorkshopRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(inscriptionsPartWorkshop);
			return new APIResponse(this.inscriptionsPartWorkshopRepository.saveAndFlush(toUpdate), null);	
		}
		errors.add("Inscriptions Part Workshop doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsPartWorkshop toDelete = this.inscriptionsPartWorkshopRepository.findOne(id);
		if (toDelete != null) {
			this.inscriptionsPartWorkshopRepository.delete(toDelete);
			return new APIResponse(true, null);	
		}
		errors.add("Inscriptions Part Workshop doesn't exist");
		return new APIResponse(null, errors);
	}
	
}