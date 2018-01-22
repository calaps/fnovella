package org.fnovella.project.program.controller;

import org.fnovella.project.category.repository.CategoryRepository;
import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.division.repository.DivisionRepository;
import org.fnovella.project.grade.repository.GradeRepository;
import org.fnovella.project.location.repository.LocationRepository;
import org.fnovella.project.program.model.Program;
import org.fnovella.project.program.model.ProgramLocationCategory;
import org.fnovella.project.program.repository.ProgramRepository;
import org.fnovella.project.program.service.ProgramService;
import org.fnovella.project.program_aditional_fields.model.ProgramAditionalFields;
import org.fnovella.project.program_aditional_fields.repository.ProgramAditionalFieldsRepository;
import org.fnovella.project.program_location.model.ProgramLocation;
import org.fnovella.project.program_location.repository.ProgramLocationRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.fnovella.project.workshop.repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/program/")
public class ProgramController {

	@Autowired
	private ProgramRepository programRepository;
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private DivisionRepository divisionRepository;
	@Autowired
	private GradeRepository gradeRepository;
	@Autowired
	private ProgramAditionalFieldsRepository programAditionalFieldsRepository;
	@Autowired
	private ProgramLocationRepository programLocationRepository;
	@Autowired
	private WorkshopRepository workshopRepository;
	@Autowired
	private LocationRepository locationRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private ProgramService programService;

	@RequestMapping(value = "", method=RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, @RequestParam("type") int type, 
			Pageable pageable) {
		Page<Program> programPage = null;
		switch (type) {
		case 0:
			programPage = this.programRepository.findByType(pageable, false);
			break;
		case 1:
			programPage = this.programRepository.findByType(pageable, true);
			break;
		case 2:
			programPage = this.programRepository.findAll(pageable);
			break;
		}
		return new APIResponse(programPage, null);
	}
	
	@RequestMapping(value = "{id}", method=RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.programRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "{id}/workshop", method=RequestMethod.GET)
	public APIResponse getWorkshops(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.workshopRepository.findByProgramId(id), null);
	}
	
	@RequestMapping(value = "{id}/division", method=RequestMethod.GET)
	public APIResponse getDivisions(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.divisionRepository.findByPrograma(id), null);
	}
	
	@RequestMapping(value = "{id}/grade", method=RequestMethod.GET)
	public APIResponse getGrades(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.gradeRepository.findByProgramId(id), null);
	}
	
	@RequestMapping(value = "{id}/course", method=RequestMethod.GET)
	public APIResponse getCourses(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.courseRepository.findByProgramId(id), null);
	}

	@RequestMapping(value = "{id}/category", method=RequestMethod.GET)
	public APIResponse getCategories(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.programAditionalFieldsRepository.findByProgram(id), null);
	}

	@RequestMapping(value = "{id}/location", method=RequestMethod.GET)
	public APIResponse getLocations(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.programLocationRepository.findByProgram(id), null);
	}
	
	@RequestMapping(value = "", method=RequestMethod.POST)
	public APIResponse create(@RequestBody ProgramLocationCategory program, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = program.getProgram().validate();
		if (errors.size() == 0) {
			ProgramLocationCategory saved = new ProgramLocationCategory();
			saved.setProgram(this.programRepository.save(program.getProgram()));
			createProgramLocationAndAditionalFieldsRelation(program, saved);

			return new APIResponse(saved, null);
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method=RequestMethod.PATCH)
	public APIResponse update(@RequestBody ProgramLocationCategory program, @RequestHeader("authorization") String authorization, 
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Program toUpdate = this.programRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(program.getProgram());
			ProgramLocationCategory saved = new ProgramLocationCategory();
			saved.setProgram(this.programRepository.saveAndFlush(toUpdate));
			this.programLocationRepository.deleteByProgram(toUpdate.getId());
			this.programAditionalFieldsRepository.deleteByProgram(toUpdate.getId());
			createProgramLocationAndAditionalFieldsRelation(program, saved);

			return new APIResponse(saved, null);
		}
		errors.add("El programa no existe.");
		return new APIResponse(null, errors);
	}

	private void createProgramLocationAndAditionalFieldsRelation(@RequestBody ProgramLocationCategory program, ProgramLocationCategory saved) {
		if (program.getLocationIds() != null && !program.getLocationIds().isEmpty()) {
            for (Integer locationId : program.getLocationIds()) {
                ProgramLocation pl = new ProgramLocation();
                pl.setProgram(saved.getProgram().getId());
                pl.setLocation(locationId);
                pl.setLocationData(this.locationRepository.findOne(locationId));
                this.programLocationRepository.save(pl);
            }
            saved.setLocationIds(program.getLocationIds());
        }

		if (program.getCategoryIds() != null && !program.getCategoryIds().isEmpty()) {
            for (Integer categoryId : program.getCategoryIds()) {
                ProgramAditionalFields paf = new ProgramAditionalFields();
                paf.setProgram(saved.getProgram().getId());
                paf.setCategory(categoryId);
                paf.setCategoryData(this.categoryRepository.findOne(categoryId));
                this.programAditionalFieldsRepository.save(paf);
            }
            saved.setCategoryIds(program.getCategoryIds());
        }
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		Program program = this.programRepository.findOne(id);
		if (program != null) {
			programService.delete(id);
		} else {
			List<String> errors = new ArrayList<>();
			errors.add("Programa con número de id : " + id + " no existe!");
			return new APIResponse(null, errors);
		}
		return new APIResponse(programRepository.findOne(id) == null, null);
	}
	
	@RequestMapping(value="delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		Program program = this.programRepository.findOne(id);
		return new APIResponse(program == null, null);
	}

	
}