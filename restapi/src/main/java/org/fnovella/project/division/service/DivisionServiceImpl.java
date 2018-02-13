package org.fnovella.project.division.service;

import org.fnovella.project.division.model.Division;
import org.fnovella.project.division.repository.DivisionRepository;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.group.service.TypeCategory;
import org.fnovella.project.program.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DivisionServiceImpl implements DivisionService {

    @Autowired
    private DivisionRepository divisionRepository;

    @Autowired
    private ProgramService programService;
    
    @Autowired
    private GroupService groupService;

    @Override
    public void updateCreatedGroup(Group group, boolean createdGroup) {
        Division division = divisionRepository.findOne(group.getDivisionId());
        if (division != null) {
            division.setCreatedGroup(createdGroup);
            divisionRepository.save(division);
        }
    }

    @Override
    public Page<Division> getAllDivisions(Pageable pageable) {
        final Page<Division> divisions = this.divisionRepository.findAll(pageable);
        if (divisions == null) {
            return null;
        }
        for (final Division division : divisions.getContent()) {
            division.setCreatedGroup(this.programService.isProgramActive(division.getPrograma()));
        }
        for (final Division division : divisions.getContent()) {
            division.setGroupExists(this.groupService.isGroupExistsForClassification(division.getId(), TypeCategory.DIVISION));
        }
        return divisions;
    }
}
