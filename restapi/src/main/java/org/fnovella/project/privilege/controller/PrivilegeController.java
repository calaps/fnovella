package org.fnovella.project.privilege.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.instructor.repository.InstructorRepository;
import org.fnovella.project.privilege.model.UserPrivileges;
import org.fnovella.project.privilege.repository.PrivilegeRepository;
import org.fnovella.project.user.model.AppUser;
import org.fnovella.project.user.repository.AppUserRepository;
import org.fnovella.project.user.repository.UserRepository;
import org.fnovella.project.utility.APIUtility;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/privilege/")
public class PrivilegeController {
	
	private PrivilegeRepository privilegeRepository;
	private UserRepository userRepository;
	private AppUserRepository appUserRepository;
	private InstructorRepository instructorRepository;
	
	public PrivilegeController(PrivilegeRepository privilegeRepository, UserRepository userRepository, 
			AppUserRepository appUserRepository, InstructorRepository instructorRepository) {
		this.privilegeRepository = privilegeRepository;
		this.userRepository = userRepository;
		this.appUserRepository = appUserRepository;
		this.instructorRepository = instructorRepository;
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getPermissions(@RequestHeader("authorization") String authorization) {
		AppUser authorizedUser = APIUtility.authorizeAppUser(authorization, this.appUserRepository, this.userRepository);
		ArrayList<String> errors = new ArrayList<String>();
		if (authorizedUser != null) {
			return new APIResponse(this.privilegeRepository.findOne(authorizedUser.getPrivilege()), null);
		}
		errors.add("Not authorizaded");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		UserPrivileges userPrivilege = this.privilegeRepository.findOne(id);
		if (userPrivilege != null) {
			return new APIResponse(userPrivilege, null);
		}
		errors.add("Privilege doesn' exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "all", method = RequestMethod.GET)
	public APIResponse getAllPermissions(@RequestHeader("authorization") String authorization) {
		return new APIResponse(this.privilegeRepository.findAll(), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestBody UserPrivileges privilege, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.privilegeRepository.save(privilege), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestBody UserPrivileges privilege, @PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		UserPrivileges toUpdate = this.privilegeRepository.findOne(id);
		if (toUpdate != null) {
			APIUtility.copyProperties(privilege, toUpdate);
			toUpdate.setId(id);
			return new APIResponse(this.privilegeRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Privilege doesn' exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		UserPrivileges toDelete = this.privilegeRepository.findOne(id);
		if (toDelete != null) {
			this.delete(id, true);
			this.privilegeRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Privilege doesn' exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value="delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.delete(id, false), null);
	}
	
	private boolean delete(Integer id, boolean delete) {
		boolean toDelete = true;
		List<?> list = this.userRepository.findByPrivilege(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.userRepository.deleteByPrivilegeId(id);
			}
		}
		list = this.instructorRepository.findByPrivilege(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.instructorRepository.deleteByPrivilegeId(id);
			}
		}
		return toDelete;
	}
	
}