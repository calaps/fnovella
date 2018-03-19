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
import org.fnovella.project.program_activation.model.ProgramActivation;
import org.fnovella.project.program_activation.repository.ProgramActivationRepository;
import org.fnovella.project.program_aditional_fields.repository.ProgramAditionalFieldsRepository;
import org.fnovella.project.program_app_user.repository.ProgramAppUserRepository;
import org.fnovella.project.program_instructor.repository.ProgramInstructorRepository;
import org.fnovella.project.program_location.repository.ProgramLocationRepository;
import org.fnovella.project.section.model.Section;
import org.fnovella.project.section.repository.SectionRepository;
import org.fnovella.project.utility.inter.Agroupation;
import org.fnovella.project.workshop.model.Workshop;
import org.fnovella.project.workshop.repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

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
    @Autowired
    private SectionRepository sectionRepository;

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

    @Override
    public InsightProgramDTO getInsightsByProgram(final Integer programId) {
        final InsightProgramDTO insight = new InsightProgramDTO();
        final Program program = this.programRepository.findOne(programId);
        if (program == null) {
            return null;
        }

        final List<Agroupation> agroupations = new ArrayList<>();
        switch (program.getClasification().toUpperCase()) {
        case "WORKSHOP":
            agroupations.addAll(this.workshopRepository.findByProgramId(program.getId()));
            break;
        case "COURSE":
            agroupations.addAll(this.courseRepository.findByProgramId(program.getId()));
            break;
        case "DIVISION":
            agroupations.addAll(this.divisionRepository.findByPrograma(program.getId()));
            break;
        case "GRADES":
            agroupations.addAll(this.gradeRepository.findByProgramId(program.getId()));
            break;
        }

        final List<Group> groups = this.getGroupsByClassificationType(agroupations, program.getClasification().toUpperCase());
        
        if (CollectionUtils.isEmpty(groups)) {
            return insight;
        } else {
            final List<InsightGroupDTO> insights = new ArrayList<>();
            for (final Group group : groups) {
                insights.add(this.groupService.getInsight(group.getId()));
            }

            for (final InsightGroupDTO insGroup : insights) {
                insight.setTotalParticipants(insight.getTotalParticipants() + insGroup.getTotalParticipants());
                insight.setActiveParticipants(insight.getActiveParticipants() + insGroup.getActiveParticipants());
                insight.setInactiveParticipants(insight.getInactiveParticipants() + insGroup.getInactiveParticipants());
                insight.setTotalAssistance(insight.getTotalAssistance() + insGroup.getTotalAssistance());
                insight.setJustifiedParticipants(
                        insight.getJustifiedParticipants() + insGroup.getJustifiedParticipants());
                insight.setApprovedParticipants(insight.getApprovedParticipants() + insGroup.getApprovedParticipants());
                insight.setAccomplishment(insight.getAccomplishment() + insGroup.getAccomplishment());
            }

            // Setting Active Participant Percentage
            insight.setActiveParticipants(insight.getActiveParticipants() / insights.size());
            // Setting dropoutPercentage
            insight.setInactiveParticipants(insight.getInactiveParticipants() / insights.size());
            // Setting assistance Percentage
            insight.setTotalAssistance(insight.getTotalAssistance() / insights.size());
            // Setting percentage of sustained assistance with justified
            // absences
            // (attendance value 3, 4, 5) *.
            insight.setJustifiedParticipants(insight.getJustifiedParticipants() / insights.size());
            // Setting percentage of participants who passed subjects.
            insight.setApprovedParticipants(insight.getApprovedParticipants() / insights.size());
            // Setting Completed fulfillment percentage value.
            insight.setAccomplishment(insight.getAccomplishment() / insights.size());
            return insight;
        }
    }
    
    @Override
    public InsightProgramDTO getInsightsForAllPrograms() {
        final List<InsightProgramDTO> allProgramInsights = new ArrayList<InsightProgramDTO>();
        final List<Program> programList = this.programRepository.findAll();
        final InsightProgramDTO insightProgramDTO = new InsightProgramDTO();

        if (CollectionUtils.isEmpty(programList)) {
            return insightProgramDTO;
        } else {
            for (final Program program : programList) {
                allProgramInsights.add(getInsightsByProgram(program.getId()));
            }

            for (final InsightProgramDTO insProgram : allProgramInsights) {
                insightProgramDTO.setTotalParticipants(
                        insightProgramDTO.getTotalParticipants() + insProgram.getTotalParticipants());
                insightProgramDTO.setActiveParticipants(
                        insightProgramDTO.getActiveParticipants() + insProgram.getActiveParticipants());
                insightProgramDTO.setInactiveParticipants(
                        insightProgramDTO.getInactiveParticipants() + insProgram.getInactiveParticipants());
                insightProgramDTO
                        .setTotalAssistance(insightProgramDTO.getTotalAssistance() + insProgram.getTotalAssistance());
                insightProgramDTO.setJustifiedParticipants(
                        insightProgramDTO.getJustifiedParticipants() + insProgram.getJustifiedParticipants());
                insightProgramDTO.setApprovedParticipants(
                        insightProgramDTO.getApprovedParticipants() + insProgram.getApprovedParticipants());
                insightProgramDTO
                        .setAccomplishment(insightProgramDTO.getAccomplishment() + insProgram.getAccomplishment());
            }

            // Setting Active Participant Percentage
            insightProgramDTO
                    .setActiveParticipants(insightProgramDTO.getActiveParticipants() / allProgramInsights.size());
            // Setting dropoutPercentage
            insightProgramDTO
                    .setInactiveParticipants(insightProgramDTO.getInactiveParticipants() / allProgramInsights.size());
            // Setting assistance Percentage
            insightProgramDTO.setTotalAssistance(insightProgramDTO.getTotalAssistance() / allProgramInsights.size());
            // Setting percentage of sustained assistance with justified
            // absences
            // (attendance value 3, 4, 5) *.
            insightProgramDTO
                    .setJustifiedParticipants(insightProgramDTO.getJustifiedParticipants() / allProgramInsights.size());
            // Setting percentage of participants who passed subjects.
            insightProgramDTO
                    .setApprovedParticipants(insightProgramDTO.getApprovedParticipants() / allProgramInsights.size());
            // Setting Completed fulfillment percentage value.
            insightProgramDTO.setAccomplishment(insightProgramDTO.getAccomplishment() / allProgramInsights.size());
            return insightProgramDTO;

        }

    }
    
    private List<Group> getGroupsByClassificationType(final List<Agroupation> agroupations,
            final String classificationType) {
        final List<Group> groups = new ArrayList<>();
        switch (classificationType) {
        case "WORKSHOP":            
            for (Agroupation agroupation : agroupations) {
                groups.addAll(this.groupRepository.findByWorkshopId(agroupation.getId()));
            }
            break;
        case "COURSE":
            for (Agroupation agroupation : agroupations) {
                groups.addAll(this.groupRepository.findByCourseId(agroupation.getId()));
            }
            break;
        case "DIVISION":
            for (Agroupation agroupation : agroupations) {
                groups.addAll(this.groupRepository.findByDivisionId(agroupation.getId()));
            }
            break;
        case "GRADES":
            for (Agroupation agroupation : agroupations) {
                final List<Section> sections = this.sectionRepository.findByGrade(agroupation.getId());
                for (final Section section : sections) {
                    groups.addAll(this.groupRepository.findBySection(section.getId()));
                }
            }
            break;
        }
        return groups;
    }
    
    public Boolean isProgramActive(final Integer programId) {
        final Integer currentYear = Year.now().getValue();
        final List<ProgramActivation> programActivations =
                this.programActivationRepository.findByProgramIdAndYear(programId, currentYear);
        if (CollectionUtils.isEmpty(programActivations)) {
            return false;
        } else {
            for (final ProgramActivation programActivation : programActivations) {
                if (programActivation.isActivationStatus()) {
                    return true;
                }
            }
        }

        return false;
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
