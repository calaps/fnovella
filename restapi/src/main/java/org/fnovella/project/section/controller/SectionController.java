package org.fnovella.project.section.controller;

import java.util.ArrayList;

import org.fnovella.project.section.model.Section;
import org.fnovella.project.section.repository.SectionRepository;
import org.fnovella.project.section.service.SectionService;
import org.fnovella.project.utility.model.APIResponse;
import org.fnovella.project.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/section/")
public class SectionController {

	@Autowired
	private SectionRepository sectionRepository;
	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private SectionService sectionService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.sectionService.getAllSections(pageable), null);
	}

	@RequestMapping(value = "{id}/courses", method=RequestMethod.GET)
	public APIResponse getCourses(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.courseRepository.findBySection(id), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Section section = this.sectionRepository.findOne(id);
		if (section != null) {
			return new APIResponse(section, null);	
		}
		errors.add("Section doens't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Section section) {
		ArrayList<String> errors = section.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.sectionRepository.save(section), null);	
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody Section section) {
		ArrayList<String> errors = new ArrayList<String>();
		Section toUpdate = this.sectionRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(section);
			return new APIResponse(this.sectionRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Section doens't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Section toDelete = this.sectionRepository.findOne(id);
		if (toDelete != null) {
			this.sectionRepository.delete(toDelete);
			return new APIResponse(true, null);	
		}
		errors.add("Section doens't exist");
		return new APIResponse(null, errors);
	}
	
}