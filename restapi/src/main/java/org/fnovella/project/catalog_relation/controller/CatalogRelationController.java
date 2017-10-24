package org.fnovella.project.catalog_relation.controller;

import java.util.ArrayList;

import org.fnovella.project.catalog_relation.model.CatalogRelation;
import org.fnovella.project.catalog_relation.repository.CatalogRelationRepository;
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
@RequestMapping("/catalog_relation/")
public class CatalogRelationController {

	@Autowired
	private CatalogRelationRepository catalogRelationRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.catalogRelationRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.catalogRelationRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "{catalog_id}", method = RequestMethod.GET)
	public APIResponse getByCatalogId(@RequestHeader("authorization") String authorization, @PathVariable("catalog_id") Integer catalogId) {
		return new APIResponse(this.catalogRelationRepository.findByIdCatalog(catalogId), null);
	}
	
	@RequestMapping(value = "{program_id}", method = RequestMethod.GET)
	public APIResponse getByProgramId(@RequestHeader("authorization") String authorization, @PathVariable("program_id") Integer programId) {
		return new APIResponse(this.catalogRelationRepository.findByIdProgram(programId), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody CatalogRelation catalogRelation) {
		ArrayList<String> errors = catalogRelation.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.catalogRelationRepository.save(catalogRelation), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
			@RequestBody CatalogRelation catalogRelation) {
		ArrayList<String> errors = new ArrayList<String>();
		CatalogRelation toUpdate = this.catalogRelationRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(catalogRelation);
			return new APIResponse(this.catalogRelationRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Catalog Relation doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		CatalogRelation catalogRelation = this.catalogRelationRepository.findOne(id);
		if (catalogRelation != null) {
			this.catalogRelationRepository.delete(catalogRelation);
			return new APIResponse(true, null);
		}
		errors.add("Catalog Relation doesn't exist");
		return new APIResponse(null, errors);
	}
}