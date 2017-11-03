package org.fnovella.project.inscriptions_inst_grade.controller;

import java.util.ArrayList;

import org.fnovella.project.inscriptions_inst_grade.model.InscriptionsInstGrade;
import org.fnovella.project.inscriptions_inst_grade.repository.InscriptionsInstGradeRepository;
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
@RequestMapping("/inscriptions_inst_grade/")
public class InscriptionsInstGradeController {

	@Autowired
	private InscriptionsInstGradeRepository inscriptionsInstGradeRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.inscriptionsInstGradeRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstGradeRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "grade/{id}", method = RequestMethod.GET)
	public APIResponse getByCourseId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstGradeRepository.findByGradeId(id), null);
	}
	
	@RequestMapping(value = "instructor/{id}", method = RequestMethod.GET)
	public APIResponse getByInstructorId(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.inscriptionsInstGradeRepository.findByInstructorId(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsInstGrade inscriptionsInstGrade) {
		ArrayList<String> errors = inscriptionsInstGrade.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.inscriptionsInstGradeRepository.save(inscriptionsInstGrade), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody InscriptionsInstGrade inscriptionsInstGrade,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsInstGrade toUpdate = this.inscriptionsInstGradeRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(inscriptionsInstGrade);
			return new APIResponse(this.inscriptionsInstGradeRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Inscriptions Inst Grade doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse create(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		InscriptionsInstGrade toDelete = this.inscriptionsInstGradeRepository.findOne(id);
		if (toDelete != null) {
			this.inscriptionsInstGradeRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Inscriptions Inst Grade doesn't exist");
		return new APIResponse(null, errors);
	}
	
}