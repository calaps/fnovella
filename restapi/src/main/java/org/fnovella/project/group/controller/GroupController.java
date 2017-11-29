package org.fnovella.project.group.controller;

import java.util.ArrayList;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.repository.GroupRepository;
import org.fnovella.project.group.service.GroupService;
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
@RequestMapping("/group/")
public class GroupController {


	@Autowired
	private GroupRepository groupRepository;
	@Autowired
	private GroupService groupService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.groupRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Group group = this.groupRepository.findOne(id);
		if (group != null) {
			return new APIResponse(group, null);
		}
		errors.add("Group doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Group group) {
		ArrayList<String> errors = group.validate();
		if (errors.isEmpty()) {
			groupService.updateCategoryStructure(group);
			return new APIResponse(this.groupRepository.save(group), null);
		}
		return new APIResponse(null, errors);
	}


	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody Group group,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Group toUpdate = this.groupRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(group);
			return new APIResponse(this.groupRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Group doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Group group = this.groupRepository.findOne(id);
		if (group != null) {
			this.groupRepository.delete(group);
			return new APIResponse(true, null);
		}
		errors.add("Group doesn't exist");
		return new APIResponse(null, errors);
	}
	
}