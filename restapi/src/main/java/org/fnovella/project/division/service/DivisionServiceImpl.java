package org.fnovella.project.division.service;

import org.fnovella.project.division.model.Division;
import org.fnovella.project.division.repository.DivisionRepository;
import org.fnovella.project.group.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DivisionServiceImpl implements DivisionService {

    @Autowired
    private DivisionRepository divisionRepository;

    @Override
    public void updateCreatedGroup(Group group) {
        Division division = divisionRepository.findOne(group.getDivisionId());
        if (division != null) {
            division.setCreatedGroup(true);
            divisionRepository.save(division);
        }
    }
}
