package org.fnovella.project.workshop.service;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.group.service.TypeCategory;
import org.fnovella.project.program.service.ProgramService;
import org.fnovella.project.workshop.model.Workshop;
import org.fnovella.project.workshop.repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class WorkshopServiceImpl implements WorkshopService {
    @Autowired
    private WorkshopRepository workshopRepository;
    
    @Autowired
    private GroupService groupService;

    @Autowired
    private ProgramService programService;

    @Override
    public void updateCreatedGroup(Group group, boolean createdGroup) {
        Workshop workshop = workshopRepository.findOne(group.getWorkshopId());
        if (workshop != null) {
            workshop.setCreatedGroup(createdGroup);
            workshopRepository.save(workshop);
        }
    }

    @Override
    public Page<Workshop> getAllWorkshops(final Pageable pageable) {
        final Page<Workshop> workshops = this.workshopRepository.findAll(pageable);
        if (workshops == null) {
            return workshops;
        }
        for (final Workshop workshop : workshops.getContent()) {
            workshop.setCreatedGroup(this.programService.isProgramActive(workshop.getProgramId()));
            workshop.setGroupExists(this.groupService.isGroupExistsForClassification(workshop.getId(), TypeCategory.WORKSHOP));
        }
        return workshops;
    }

}
