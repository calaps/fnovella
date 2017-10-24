package org.fnovella.project.catalog_relation_student.controller;

import java.util.ArrayList;

import org.fnovella.project.catalog_relation_student.model.CatalogRelationStudent;
import org.fnovella.project.catalog_relation_student.repository.CatalogRelationStudentRepository;
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
@RequestMapping("/catalog_relation_student/")
public class CatalogRelationStudentController {

	@Autowired
	private CatalogRelationStudentRepository catalogRelationStudentRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.catalogRelationStudentRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.catalogRelationStudentRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "{catalog_id}", method = RequestMethod.GET)
	public APIResponse getByIdCatalog(@RequestHeader("authorization") String authorization, @PathVariable("catalog_id") Integer id) {
		return new APIResponse(this.catalogRelationStudentRepository.findByIdCatalog(id), null);
	}
	
	@RequestMapping(value = "{participant_id}", method = RequestMethod.GET)
	public APIResponse getByIdParticipant(@RequestHeader("authorization") String authorization, @PathVariable("participant_id") Integer id) {
		return new APIResponse(this.catalogRelationStudentRepository.findByIdParticipant(id), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody CatalogRelationStudent relation) {
		ArrayList<String> errors = relation.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.catalogRelationStudentRepository.save(relation), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody CatalogRelationStudent relation) {
		ArrayList<String> errors = new ArrayList<String>();
		CatalogRelationStudent toUpdate = this.catalogRelationStudentRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(relation);
			return new APIResponse(this.catalogRelationStudentRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Catalog Relation Student doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		CatalogRelationStudent toDelete = this.catalogRelationStudentRepository.findOne(id);
		if (toDelete != null) {
			this.catalogRelationStudentRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Catalog Relation Student doesn't exist");
		return new APIResponse(null, errors);
	}
}
