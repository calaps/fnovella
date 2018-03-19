package org.fnovella.project.workshop.service;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.workshop.model.Workshop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WorkshopService {
    void updateCreatedGroup(Group group, boolean createdGroup);

    Page<Workshop> getAllWorkshops(final Pageable pageable);
}
