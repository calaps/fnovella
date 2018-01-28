package org.fnovella.project.program.service;

import org.fnovella.project.catalog_relation.repository.CatalogRelationRepository;
import org.fnovella.project.course.model.Course;
import org.fnovella.project.course.repository.CourseRepository;
import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.division.model.Division;
import org.fnovella.project.division.repository.DivisionRepository;
import org.fnovella.project.grade.model.Grade;
import org.fnovella.project.grade.repository.GradeRepository;
import org.fnovella.project.grade.service.GradeService;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.model.InsightGroupDTO;
import org.fnovella.project.group.repository.GroupRepository;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.program.model.InsightProgramDTO;
import org.fnovella.project.program.model.Program;
import org.fnovella.project.program.repository.ProgramRepository;
import org.fnovella.project.program_activation.repository.ProgramActivationRepository;
import org.fnovella.project.program_aditional_fields.repository.ProgramAditionalFieldsRepository;
import org.fnovella.project.program_app_user.repository.ProgramAppUserRepository;
import org.fnovella.project.program_instructor.repository.ProgramInstructorRepository;
import org.fnovella.project.program_location.repository.ProgramLocationRepository;
import org.fnovella.project.utility.inter.Agroupation;
import org.fnovella.project.workshop.model.Workshop;
import org.fnovella.project.workshop.repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private GroupService groupService;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private GradeRepository gradeRepository;

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

    @Override
    public InsightProgramDTO getInsight(Integer idProgram) {
        InsightProgramDTO insight = new InsightProgramDTO();
        Program program = this.programRepository.findOne(idProgram);
        List<Agroupation> agroupations = new ArrayList<>();
        switch (program.getClasification().toUpperCase()) {
            case "WORKSHOP":
                List<Workshop> workshops = this.workshopRepository.findByProgramId(program.getId());
                agroupations = new ArrayList<>(workshops);
                break;
            case "COURSE":
                List<Course> courses = this.courseRepository.findByProgramId(program.getId());
                agroupations = new ArrayList<>(courses);
                break;
            case "DIVISION":
                List<Division> divisions = this.divisionRepository.findByPrograma(program.getId());
                agroupations = new ArrayList<>(divisions);
                break;
            case "GRADES":
                List<Grade> grades = this.gradeRepository.findByProgramId(program.getId());
                agroupations = new ArrayList<>(grades);
                break;
        }

        List<Group> groups = this.getGroups(agroupations);
        List<InsightGroupDTO> insights = new ArrayList<>();
        for (Group group : groups) {
            insights.add(this.groupService.getInsight(group.getId()));
        }
        Integer groupSize = insights.size();
        for (InsightGroupDTO insGroup : insights) {
            insight.setTotalParticipants((insight.getTotalParticipants() + insGroup.getTotalParticipants()) / groupSize);
            insight.setActiveParticipants((insight.getActiveParticipants() + insGroup.getActiveParticipants()) / groupSize);
            insight.setInactiveParticipants((insight.getInactiveParticipants() + insGroup.getInactiveParticipants()) / groupSize);
            insight.setTotalAssistance((insight.getTotalAssistance() + insGroup.getTotalAssistance()) / groupSize);
            insight.setJustifiedParticipants((insight.getJustifiedParticipants() + insGroup.getJustifiedParticipants()) / groupSize);
            insight.setApprovedParticipants((insight.getApprovedParticipants() + insGroup.getApprovedParticipants()) / groupSize);
            insight.setAccomplishment((insight.getAccomplishment() + insGroup.getAccomplishment()) / groupSize);
        }

        return insight;
    }

    private List<Group> getGroups(List<Agroupation> agroupations) {
        List<Group> groups = new ArrayList<>();
        for (Agroupation agroupation : agroupations) {
            Group group = this.groupRepository.findOne(agroupation.getId());
            if (group != null) {
                groups.add(group);
            }
        }
        return groups;
    }
}
