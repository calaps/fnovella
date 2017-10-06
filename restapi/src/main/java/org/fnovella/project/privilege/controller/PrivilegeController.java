package org.fnovella.project.privilege.controller;

import java.util.ArrayList;

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
	
	public PrivilegeController(PrivilegeRepository privilegeRepository, UserRepository userRepository, 
			AppUserRepository appUserRepository) {
		this.privilegeRepository = privilegeRepository;
		this.userRepository = userRepository;
		this.appUserRepository = appUserRepository;
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
			this.userRepository.deleteByPrivilegeId(toDelete.getId());
			this.privilegeRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Privilege doesn' exist");
		return new APIResponse(null, errors);
	}
	
}