package org.fnovella.project.group.service;

import org.fnovella.project.assistance.model.AssistanceInsight;
import org.fnovella.project.assistance.service.AssistanceService;
import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.division.service.DivisionService;
import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation.repository.EvaluationRepository;
import org.fnovella.project.evaluation.service.EvaluationService;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.model.InsightGroupDTO;
import org.fnovella.project.group.repository.GroupRepository;
import org.fnovella.project.indicators.data.EvaluationIndicators;
import org.fnovella.project.indicators.service.EvaluationIndicatorsService;
import org.fnovella.project.inscriptions.service.InscriptionService;
import org.fnovella.project.participant.service.ParticipantService;
import org.fnovella.project.participant_aditional_fields.service.ParticipantAditionalFieldsService;
import org.fnovella.project.section.service.SectionService;
import org.fnovella.project.workshop.service.WorkshopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.transaction.Transactional;

import java.time.Year;
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
        for(Evaluation evaluation : evaluations) {
            EvaluationIndicators indicator = this.evaluationIndicators.fetchIndicators(evaluation, 0);
            accumulator += indicator.getPercentageOfStudentsApproved();
        }
        return accumulator / evaluations.size();
    }
    
    public boolean isGroupExistsForClassification(final Integer classificationId, final TypeCategory typeCategory) {
        final Integer currentYear = Year.now().getValue();
        boolean isGroupExist = false;
        List<Group> groups;
        switch (typeCategory) {
        case WORKSHOP:
            groups = groupRepository.findByWorkshopIdAndYearActivation(classificationId, currentYear);
            if (CollectionUtils.isEmpty(groups)) {
                isGroupExist = false;
            } else {
                isGroupExist = true;
            }
            break;
        case DIVISION:
            groups = groupRepository.findByDivisionIdAndYearActivation(classificationId, currentYear);
            if (CollectionUtils.isEmpty(groups)) {
                isGroupExist = false;
            } else {
                isGroupExist = true;
            }
            break;
        case COURSE:
            groups = groupRepository.findByCourseIdAndYearActivation(classificationId, currentYear);
            if (CollectionUtils.isEmpty(groups)) {
                isGroupExist = false;
            } else {
                isGroupExist = true;
            }
            break;
        case SECTION:
            groups = groupRepository.findBySectionAndYearActivation(classificationId, currentYear);
            if (CollectionUtils.isEmpty(groups)) {
                isGroupExist = false;
            } else {
                isGroupExist = true;
            }
            break;
        }
        return isGroupExist;
    }
 }
