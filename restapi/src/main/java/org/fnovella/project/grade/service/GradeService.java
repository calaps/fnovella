package org.fnovella.project.grade.service;

import org.fnovella.project.grade.model.Grade;

public interface GradeService {
    void deleteByProgramId(Integer programId);

    Grade findByGradeId(final Integer id);
}
