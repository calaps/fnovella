package org.fnovella.project.division.service;

import java.util.List;

import org.fnovella.project.division.model.Division;
import org.fnovella.project.group.model.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DivisionService {
    void updateCreatedGroup(Group group, boolean createdGroup);

    Page<Division> getAllDivisions(final Pageable pageable);

    List<Integer> getByProgramId(Integer programId);
}
