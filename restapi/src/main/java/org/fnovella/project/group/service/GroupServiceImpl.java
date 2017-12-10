package org.fnovella.project.group.service;

import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.division.service.DivisionService;
import org.fnovella.project.evaluation.service.EvaluationService;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.repository.GroupRepository;
import org.fnovella.project.inscriptions.service.InscriptionService;
import org.fnovella.project.participant_aditional_fields.service.ParticipantAditionalFieldsService;
import org.fnovella.project.section.service.SectionService;
import org.fnovella.project.workshop.service.WorkshopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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


}
