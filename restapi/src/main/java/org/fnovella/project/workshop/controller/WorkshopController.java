package org.fnovella.project.workshop.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.inscriptions_inst_workshop.repository.InscriptionsInstWorkshopRepository;
import org.fnovella.project.inscriptions_part_workshop.repository.InscriptionsPartWorkshopRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.fnovella.project.workshop.model.Workshop;
import org.fnovella.project.workshop.repository.WorkshopRepository;
import org.fnovella.project.workshop.service.WorkshopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.fnovella.project.program.repository.ProgramRepository;

@RestController
@RequestMapping("/workshop/")
public class WorkshopController {

	@Autowired
	private WorkshopRepository workshopRepository;
	@Autowired
	private InscriptionsInstWorkshopRepository inscriptionsInstWorkshopRepository;
	@Autowired
	private InscriptionsPartWorkshopRepository inscriptionsPartWorkshopRepository;
	@Autowired
	private ProgramRepository programRepository;

	@Autowired
	private WorkshopService workshopService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.workshopService.getAllWorkshops(pageable), null);
	}

	@RequestMapping(value = "by-location/{location}", method = RequestMethod.GET)
	public APIResponse getWorkshopByLocation(@RequestHeader("authorization") String authorization,@PathVariable("location") Integer location, Pageable pageable) {
		return new APIResponse(this.workshopRepository.findByLocation(location, pageable), null);
	}

	@RequestMapping(value = "by-program/{programId}", method = RequestMethod.GET)
	public APIResponse getWorkshopByProgramId(@RequestHeader("authorization") String authorization,@PathVariable("programId") Integer programId, Pageable pageable) {
		return new APIResponse(this.workshopRepository.findByProgramId(programId, pageable), null);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Workshop workshop = this.workshopRepository.findOne(id);
		if (workshop != null) {
			workshop.setProgramName(this.programRepository.findOne(workshop.getProgramId()).getName());
			return new APIResponse(workshop, null);
		}
		errors.add("Workshop doesn't exist");
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		Workshop workshop = this.workshopRepository.findOne(id);
		return new APIResponse(workshop == null, null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Workshop workshop) {
		ArrayList<String> errors = workshop.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.workshopRepository.save(workshop), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id, 
			@RequestBody Workshop workshop) {
		ArrayList<String> errors = new ArrayList<String>();
		Workshop toUpdate = this.workshopRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(workshop);
			return new APIResponse(this.workshopRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Workshop doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Workshop workshop = this.workshopRepository.findOne(id);
		if (workshop != null) {
			List<?> list = this.inscriptionsPartWorkshopRepository.findByWorkshopId(id);
			if (list != null && !list.isEmpty())
				this.inscriptionsPartWorkshopRepository.deleteByWorkshopId(id);
			list = this.inscriptionsInstWorkshopRepository.findByWorkshopId(id);
			if (list != null && !list.isEmpty())
				this.inscriptionsInstWorkshopRepository.deleteByWorkshopId(id);
			this.workshopRepository.delete(workshop);
			return new APIResponse(true, null);
		}
		errors.add("Workshop doesn't exist");
		return new APIResponse(null, errors);
	}
}