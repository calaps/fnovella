package org.fnovella.project.program.service;

import org.fnovella.project.program.model.InsightProgramDTO;

public interface ProgramService {
    void delete(Integer idProgram);

    InsightProgramDTO getInsight(Integer idProgram);

    InsightProgramDTO getInsightsByProgram(Integer programId);

    InsightProgramDTO getInsightsForAllPrograms();

    Boolean isProgramActive(final Integer programId);
}
