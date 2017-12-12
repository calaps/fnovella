package org.fnovella.project.program.service;

import org.fnovella.project.catalog_relation.repository.CatalogRelationRepository;
import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.division.repository.DivisionRepository;
import org.fnovella.project.grade.service.GradeService;
import org.fnovella.project.program.repository.ProgramRepository;
import org.fnovella.project.program_activation.repository.ProgramActivationRepository;
import org.fnovella.project.program_aditional_fields.repository.ProgramAditionalFieldsRepository;
import org.fnovella.project.program_app_user.repository.ProgramAppUserRepository;
import org.fnovella.project.program_instructor.repository.ProgramInstructorRepository;
import org.fnovella.project.program_location.repository.ProgramLocationRepository;
import org.fnovella.project.workshop.repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgramServiceImpl implements ProgramService {

    @Autowired
    private CatalogRelationRepository catalogRelationRepository;
    @Autowired
    private ProgramActivationRepository programActivationRepository;
    @Autowired
    private ProgramAppUserRepository programAppUserRepository;
    @Autowired
    private ProgramInstructorRepository programInstructorRepository;
    @Autowired
    private CourseService courseService;
    @Autowired
    private GradeService gradeService;
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private ProgramAditionalFieldsRepository programAditionalFieldsRepository;
    @Autowired
    private ProgramLocationRepository programLocationRepository;
    @Autowired
    private WorkshopRepository workshopRepository;
    @Autowired
    private ProgramRepository programRepository;

    @Override
    public void delete(Integer programId) {

        this.catalogRelationRepository.deleteByIdProgram(programId);

        this.courseService.deleteByProgramId(programId);

        this.divisionRepository.deleteByPrograma(programId);

        this.gradeService.deleteByProgramId(programId);

        this.programActivationRepository.deleteByProgramId(programId);

        this.programAditionalFieldsRepository.deleteByProgram(programId);

        this.programAppUserRepository.deleteByProgram(programId);

        this.programInstructorRepository.deleteByProgram(programId);

        this.programLocationRepository.deleteByProgram(programId);

        this.workshopRepository.deleteByProgramId(programId);

        this.programRepository.delete(programId);
    }
}
