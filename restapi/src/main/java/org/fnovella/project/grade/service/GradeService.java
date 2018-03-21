package org.fnovella.project.grade.service;

import java.util.List;

import org.fnovella.project.grade.model.Grade;

public interface GradeService {
    void deleteByProgramId(Integer programId);

    Grade findByGradeId(final Integer id);

    List<Grade> getByProgramId(Integer programId);
}
