package org.fnovella.project.category.controller;

import java.util.ArrayList;

import org.fnovella.project.category.model.Category;
import org.fnovella.project.category.repository.CategoryRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category/")
public class CategoryController {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse get(@RequestHeader("authorization") String authorization) {
		return new APIResponse(this.categoryRepository.findAll(), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Category category = this.categoryRepository.findOne(id);
		if (category != null) {
			return new APIResponse(category, null);
		}
		errors.add("Category doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Category category) {
		ArrayList<String> errors = category.validate();
		if (errors.isEmpty()) {
			return new APIResponse(this.categoryRepository.save(category), null);
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody Category category,
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Category toUpdate = this.categoryRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(category);
			return new APIResponse(this.categoryRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Category doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Category toDelete = this.categoryRepository.findOne(id);
		if (toDelete != null) {
			this.categoryRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Category doesn't exist");
		return new APIResponse(null, errors);
	}
	
}