package org.fnovella.project.course.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.course.model.Course;
import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.inscriptions_inst_course.repository.InscriptionsInstCourseRepository;
import org.fnovella.project.inscriptions_part_course.repository.InscriptionsPartCourseRepository;
import org.fnovella.project.utility.model.APIResponse;
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
@RequestMapping("/course/")
public class CourseController {
	
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private InscriptionsInstCourseRepository inscriptionsInstCourseRepository;
	@Autowired
	private InscriptionsPartCourseRepository inscriptionsPartCourseRepository;
	@Autowired
	private ProgramRepository programRepository;

	@Autowired
	private CourseService courseService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.courseService.getAllCourses(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Course course = this.courseRepository.findOne(id);
		if (course != null) {
			course.setProgramName(this.programRepository.findOne(course.getProgramId()).getName());
			return new APIResponse(course, null);
		}
		errors.add("Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Course course) {
		ArrayList<String> errors = course.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.courseRepository.save(course), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody Course course,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Course toUpdate = this.courseRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(course);
			return new APIResponse(this.courseRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Course doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Course toDelete = this.courseRepository.findOne(id);
		if (toDelete != null) {
			this.delete(id, true);
			this.courseRepository.delete(toDelete);
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
		List<?> list = this.inscriptionsPartCourseRepository.findByCourseId(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.inscriptionsPartCourseRepository.deleteByCourseId(id);
			}
		}
		list = this.inscriptionsInstCourseRepository.findByCourseId(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.inscriptionsInstCourseRepository.deleteByCourseId(id);
			}
		}
		return toDelete;
	}
}