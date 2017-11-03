package org.fnovella.project.inscriptions_part_grade.controller;

import java.util.ArrayList;

import org.fnovella.project.inscriptions_part_grade.model.InscriptionsPartGrade;
import org.fnovella.project.inscriptions_part_grade.repository.InscriptionsPartGradeRepository;
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
@RequestMapping("/inscriptions_part_grade/")
public class InscriptionsPartGradeController {

	@Autowired
	private InscriptionsPartGradeRepository inscriptionsPartGradeRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.inscriptionsPartGradeRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartGradeRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "participant/{id}", method = RequestMethod.GET)
	public APIResponse getByParticipantId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartGradeRepository.findByParticipantId(id), null);
	}
	
	@RequestMapping(value = "grade/{id}", method = RequestMethod.GET)
	public APIResponse getByGradeId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsPartGradeRepository.findByGradeId(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsPartGrade inscriptionsPartGrade) {
		ArrayList<String> errors = inscriptionsPartGrade.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.inscriptionsPartGradeRepository.save(inscriptionsPartGrade), null);	
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsPartGrade inscriptionsPartGrade,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsPartGrade toUpdate = this.inscriptionsPartGradeRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(inscriptionsPartGrade);
			return new APIResponse(this.inscriptionsPartGradeRepository.saveAndFlush(toUpdate), null);	
		}
		errors.add("Inscriptions Part Grade doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsPartGrade toDelete = this.inscriptionsPartGradeRepository.findOne(id);
		if (toDelete != null) {
			this.inscriptionsPartGradeRepository.delete(toDelete);
			return new APIResponse(true, null);	
		}
		errors.add("Inscriptions Part Workshop doesn't exist");
		return new APIResponse(null, errors);
	}
	
}