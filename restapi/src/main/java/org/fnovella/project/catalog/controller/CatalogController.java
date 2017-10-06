package org.fnovella.project.catalog.controller;

import java.util.ArrayList;

import org.fnovella.project.catalog.model.Catalog;
import org.fnovella.project.catalog.repository.CatalogRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/catalog/")
public class CatalogController {

	@Autowired
	private CatalogRepository catalogRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization) {
		return new APIResponse(this.catalogRepository.findAll(), null);
		//return this.catalogRepository.findAll();
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.catalogRepository.findOne(id), null);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestBody Catalog catalog, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = catalog.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.catalogRepository.save(catalog), null);
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@PathVariable("id") Integer id, @RequestBody Catalog catalog, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = catalog.validate();
		Catalog toUpdate = this.catalogRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(catalog);
			toUpdate = this.catalogRepository.save(catalog);
			return new APIResponse(toUpdate, null);
		}
		errors.add("Catalog doesn't exist");
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Catalog toDelete = this.catalogRepository.findOne(id);
		if (toDelete != null) {
			this.catalogRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Catalog doesn't exist");
		return new APIResponse(null, errors);
	}
}