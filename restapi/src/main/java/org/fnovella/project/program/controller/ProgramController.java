package org.fnovella.project.program.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.catalog_relation.repository.CatalogRelationRepository;
import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.division.repository.DivisionRepository;
import org.fnovella.project.grade.repository.GradeRepository;
import org.fnovella.project.program.model.Program;
import org.fnovella.project.program.repository.ProgramRepository;
import org.fnovella.project.program_activation.repository.ProgramActivationRepository;
import org.fnovella.project.program_aditional_fields.repository.ProgramAditionalFieldsRepository;
import org.fnovella.project.program_app_user.repository.ProgramAppUserRepository;
import org.fnovella.project.program_instructor.repository.ProgramInstructorRepository;
import org.fnovella.project.program_location.repository.ProgramLocationRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.fnovella.project.workshop.repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/program/")
public class ProgramController {

	@Autowired
	private ProgramRepository programRepository;
	@Autowired
	private CatalogRelationRepository catalogRelationRepository;
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private DivisionRepository divisionRepository;
	@Autowired
	private GradeRepository gradeRepository;
	@Autowired
	private ProgramActivationRepository programActivationRepository;
	@Autowired
	private ProgramAditionalFieldsRepository programAditionalFieldsRepository;
	@Autowired
	private ProgramAppUserRepository programAppUserRepository;
	@Autowired
	private ProgramInstructorRepository programInstructorRepository;
	@Autowired
	private ProgramLocationRepository programLocationRepository;
	@Autowired
	private WorkshopRepository workshopRepository;
	
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
	
	@RequestMapping(value = "", method=RequestMethod.POST)
	public APIResponse create(@RequestBody Program program, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = program.validate();
		if (errors.size() == 0) {
			return new APIResponse(this.programRepository.save(program), null);
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method=RequestMethod.PATCH)
	public APIResponse update(@RequestBody Program program, @RequestHeader("authorization") String authorization, 
			@PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		Program toUpdate = this.programRepository.findOne(id);
		if (toUpdate != null) {
			toUpdate.setUpdateFields(program);
			return new APIResponse(this.programRepository.saveAndFlush(toUpdate), null);
		}
		errors.add("Program doesn't exist");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method=RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		this.delete(id, true);
		this.programRepository.delete(id);
		return new APIResponse(true, null);
	}
	
	@RequestMapping(value="delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.delete(id, false), null);
	}
	
	private boolean delete(Integer programId, boolean delete) {
		boolean toDelete = true;
		List<?> list = this.catalogRelationRepository.findByIdProgram(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.catalogRelationRepository.deleteByIdProgram(programId);
			}
		}
		list = this.courseRepository.findByProgramId(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.courseRepository.deleteByProgramId(programId);
			}
		}
		list = this.divisionRepository.findByPrograma(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.divisionRepository.deleteByPrograma(programId);
			}
		}
		list = this.gradeRepository.findByProgramId(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.gradeRepository.deleteByProgramId(programId);
			}
		}
		list = this.programActivationRepository.findByProgramId(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.programActivationRepository.deleteByProgramId(programId);
			}
		}
		list = this.programAditionalFieldsRepository.findByProgram(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.programAditionalFieldsRepository.deleteByProgram(programId);
			}
		}
		list = this.programAppUserRepository.findByProgram(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.programAppUserRepository.deleteByProgram(programId);
			}
		}
		list = this.programInstructorRepository.findByProgram(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.programInstructorRepository.deleteByProgram(programId);
			}
		}
		list = this.programLocationRepository.findByProgram(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.programLocationRepository.deleteByProgram(programId);
			}
		}
		
		list = this.workshopRepository.findByProgramId(programId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.workshopRepository.deleteByProgramId(programId);
			}
		}
		
		return toDelete;
	}
	
}