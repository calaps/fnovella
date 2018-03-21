package org.fnovella.project.group.service;

import org.fnovella.project.assistance.model.AssistanceInsight;
import org.fnovella.project.assistance.service.AssistanceService;
import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.division.service.DivisionService;
import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation.repository.EvaluationRepository;
import org.fnovella.project.evaluation.service.EvaluationService;
import org.fnovella.project.grade.model.Grade;
import org.fnovella.project.grade.service.GradeService;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.model.InsightGroupDTO;
import org.fnovella.project.group.repository.GroupRepository;
import org.fnovella.project.indicators.data.EvaluationIndicators;
import org.fnovella.project.indicators.service.EvaluationIndicatorsService;
import org.fnovella.project.inscriptions.service.InscriptionService;
import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.service.ParticipantService;
import org.fnovella.project.participant_aditional_fields.model.ParticipantAditionalFields;
import org.fnovella.project.participant_aditional_fields.service.ParticipantAditionalFieldsService;
import org.fnovella.project.program.model.Program;
import org.fnovella.project.program.service.ProgramService;
import org.fnovella.project.section.service.SectionService;
import org.fnovella.project.workshop.service.WorkshopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.transaction.Transactional;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class GroupServiceImpl implements GroupService {

    @Autowired
    private WorkshopService workshopService;
    @Autowired
    private DivisionService divisionService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private SectionService sectionService;
    @Autowired
    private ParticipantAditionalFieldsService participantAditionalFieldsService;
    @Autowired
    private InscriptionService inscriptionService;
    @Autowired
    private EvaluationService evaluationService;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private ParticipantService participantService;
    @Autowired
    private EvaluationRepository evaluationRepository;
    @Autowired
    private EvaluationIndicatorsService evaluationIndicators;
    @Autowired
    private AssistanceService assistanceService;
    @Autowired
    private ProgramService programService;

    @Autowired
    private GradeService gradeService;

    @Override
    public void updateCategoryStructureAfterCreate(Group group) {
        updateCategoryStructure(group, true);

    }

    private void updateCategoryStructure(Group group, boolean createdGroup) {
        TypeCategory typeCategory = TypeCategory.valueOf(group.getTypeCategory().toUpperCase());
        switch (typeCategory) {
        case WORKSHOP:
            workshopService.updateCreatedGroup(group, createdGroup);
            break;
        case DIVISION:
            divisionService.updateCreatedGroup(group, createdGroup);
            break;
        case COURSE:
            courseService.updateCreatedGroup(group, createdGroup);
            break;
        case SECTION:
            sectionService.updateCreatedGroup(group, createdGroup);
            break;
        }
    }

    @Override
    public void updateCategoryStructureAfterDelete(Group group) {
        updateCategoryStructure(group, false);
    }

    @Override
    public void delete(Group group) {
        participantAditionalFieldsService.deleteByGroupIdIfExist(group.getId());
        inscriptionService.deleteByGroupIdIfExist(group.getId());
        evaluationService.deleteByGroupIdIfExist(group.getId());
        groupRepository.delete(group);
    }

    @Override
    public InsightGroupDTO getInsight(Integer idGroup) {
        InsightGroupDTO insight = new InsightGroupDTO();
        AssistanceInsight assistanceInsight = this.assistanceService.getAssistanceInsight(idGroup);

        insight.setTotalParticipants(this.participantService.getTotalParticipant(idGroup));
        insight.setActiveParticipants(this.participantService.getActiveParticipant(idGroup));
        insight.setInactiveParticipants(100 - insight.getActiveParticipants());
        insight.setSustainedParticipants(this.participantService.getSustainedParticipant(idGroup));
        insight.setJustifiedParticipants(this.participantService.getJustifiedParticipant(idGroup));
        insight.setApprovedParticipants(this.getApprovedParticipants(idGroup));
        insight.setAccomplishment(assistanceInsight.getAccomplishment());
        insight.setTotalAssistance(assistanceInsight.getTotalAssistance());
        insight.setSessionAssistance(assistanceInsight.getSessionAssistance());
        return insight;
    }

    public long getApprovedParticipants(Integer idGroup) {
        List<Evaluation> evaluations = this.evaluationRepository.findByGroup(idGroup);
        long accumulator = 0;
        for (Evaluation evaluation : evaluations) {
            EvaluationIndicators indicator = this.evaluationIndicators.fetchIndicators(evaluation, 0);
            accumulator += indicator.getPercentageOfStudentsApproved();
        }
        return accumulator / evaluations.size();
    }

    public boolean isGroupExistsForClassification(final Integer classificationId, final TypeCategory typeCategory) {
        final Integer currentYear = Year.now().getValue();
        switch (typeCategory) {
        case WORKSHOP:
            return !CollectionUtils
                    .isEmpty(groupRepository.findByWorkshopIdAndYearActivation(classificationId, currentYear));
        case DIVISION:
            return !CollectionUtils
                    .isEmpty(groupRepository.findByDivisionIdAndYearActivation(classificationId, currentYear));
        case COURSE:
            return !CollectionUtils
                    .isEmpty(groupRepository.findByCourseIdAndYearActivation(classificationId, currentYear));
        case SECTION:
            return !CollectionUtils
                    .isEmpty(groupRepository.findBySectionAndYearActivation(classificationId, currentYear));
        }
        return false;
    }

    public List<Group> getByProgramId(final Integer programId) {
        final Program program = this.programService.getByProgramId(programId);
        final List<Group> groups = new ArrayList<>();
        switch (program.getClasification().toUpperCase()) {
        case "WORKSHOP":
            final List<Integer> workshopIds = this.workshopService.getByProgramId(programId);
            for (final Integer workshopId : workshopIds) {
                groups.addAll(this.groupRepository.findByWorkshopId(workshopId));
            }
            break;
        case "DIVISION":
            final List<Integer> divisionIds = this.divisionService.getByProgramId(programId);
            for (final Integer divisionId : divisionIds) {
                groups.addAll(this.groupRepository.findByDivisionId(divisionId));
            }
            break;
        case "COURSE":
            final List<Integer> courseIds = this.courseService.getByProgramId(programId);
            for (final Integer courseId : courseIds) {
                groups.addAll(this.groupRepository.findByCourseId(courseId));
            }
            break;
        case "GRADES":
            final List<Grade> grades = this.gradeService.getByProgramId(programId);
            final List<Integer> sectionIds = new ArrayList<>();
            for (final Grade grade : grades) {
                sectionIds.addAll(this.sectionService.getByGradeId(grade.getId()));
            }
            for (final Integer sectionId : sectionIds) {
                groups.addAll(this.groupRepository.findBySection(sectionId));
            }
            break;
        }
        return groups;
    }

    public Group getByGroupId(final Integer groupId) {
        return this.groupRepository.findOne(groupId);
    }

    @Override
    public List<Group> getAllGroups() {
        return this.groupRepository.findAll();
    }

    @Override
    public Group getGroupById(final Integer groupId) {
        return this.groupRepository.findOne(groupId);
    }
}
