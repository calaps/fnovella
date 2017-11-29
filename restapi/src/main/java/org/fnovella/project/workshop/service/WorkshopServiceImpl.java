package org.fnovella.project.workshop.service;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.workshop.model.Workshop;
import org.fnovella.project.workshop.repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkshopServiceImpl implements WorkshopService {
    @Autowired
    private WorkshopRepository workshopRepository;

    @Override
    public void updateCreatedGroup(Group group) {
        Workshop workshop = workshopRepository.findOne(group.getWorkshopId());
        if (workshop != null) {
            workshop.setCreatedGroup(true);
            workshopRepository.save(workshop);
        }
    }
}
