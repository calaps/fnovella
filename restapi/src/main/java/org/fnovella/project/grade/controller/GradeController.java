package org.fnovella.project.grade.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.grade.model.Grade;
import org.fnovella.project.grade.repository.GradeRepository;
import org.fnovella.project.inscriptions_inst_grade.repository.InscriptionsInstGradeRepository;
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
import org.fnovella.project.section.repository.SectionRepository;
import org.fnovella.project.program.repository.ProgramRepository;

@RestController
@RequestMapping("/grade/")
public class GradeController {
	
	@Autowired
	private GradeRepository gradeRepository;
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private InscriptionsInstGradeRepository inscriptionsInstGradeRepository;
	@Autowired
	private InscriptionsPartGradeRepository inscriptionsPartGradeRepository;
	@Autowired
	public SectionRepository sectionRepository;
	@Autowired
	private ProgramRepository programRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.gradeRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{gradeId}/courses", method = RequestMethod.GET)
	public APIResponse getByGradeId(@PathVariable("gradeId") Integer gradeId, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.courseRepository.findByGrade(gradeId), null);
	}

	@RequestMapping(value = "{id}/sections", method=RequestMethod.GET)
	public APIResponse getSections(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.sectionRepository.findByGrade(id), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Grade grade = this.gradeRepository.findOne(id);
		if (grade != null) {
			grade.setProgramName(this.programRepository.findOne(grade.getProgramId()).getName());
			return new APIResponse(grade, null);
		}
		errors.add("Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Grade grade) {
		ArrayList<String> errors = grade.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.gradeRepository.save(grade), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody Grade grade,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Grade toUpdate = this.gradeRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(grade);
			return new APIResponse(this.gradeRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Grade doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Grade toDelete = this.gradeRepository.findOne(id);
		if (toDelete != null) {
			this.delete(id, true);
			this.gradeRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value="delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.delete(id, false), null);
	}
	
	private boolean delete(Integer id, boolean delete) {
		boolean toDelete = true;
		List<?> list = this.inscriptionsPartGradeRepository.findByGradeId(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.inscriptionsPartGradeRepository.deleteByGradeId(id);
			}
		}
		list = this.inscriptionsInstGradeRepository.findByGradeId(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.inscriptionsInstGradeRepository.deleteByGradeId(id);
			}
		}
		list = this.courseRepository.findByGrade(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.courseRepository.deleteByGrade(id);
			}
		}
		return toDelete;
	}
}