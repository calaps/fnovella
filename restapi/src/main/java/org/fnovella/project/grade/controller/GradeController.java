package org.fnovella.project.grade.controller;

import java.util.ArrayList;

import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.grade.model.Grade;
import org.fnovella.project.grade.repository.GradeRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/grade/")
public class GradeController {
	
	@Autowired
	private GradeRepository gradeRepository;
	@Autowired
	private CourseRepository courseRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization) {
		return new APIResponse(this.gradeRepository.findAll(), null);
	}
	
	@RequestMapping(value = "{gradeId}/courses", method = RequestMethod.GET)
	public APIResponse getByGradeId(@PathVariable("gradeId") Integer gradeId, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.courseRepository.findByGrade(gradeId), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Grade grade = this.gradeRepository.findOne(id);
		if (grade != null) {
			return new APIResponse(this.gradeRepository.findOne(id), null);
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
			return new APIResponse(this.gradeRepository.saveAndFlush(grade), null);
		}
		errors.add("Grade doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Grade toDelete = this.gradeRepository.findOne(id);
		if (toDelete != null) {
			this.courseRepository.deleteByGrade(toDelete.getId());
			this.gradeRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Course doesn't exist");
		return new APIResponse(null, errors);
	}
}