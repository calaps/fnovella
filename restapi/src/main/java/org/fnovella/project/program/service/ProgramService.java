package org.fnovella.project.program.service;

import java.util.List;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.program.model.InsightProgramDTO;
import org.fnovella.project.program.model.Program;

public interface ProgramService {
    void delete(Integer idProgram);

    InsightProgramDTO getInsight(Integer idProgram);

    InsightProgramDTO getInsightsByProgram(Integer programId);

    InsightProgramDTO getInsightsForAllPrograms();

    Boolean isProgramActive(final Integer programId);

    Program getByProgramId(Integer programId);

    List<Program> getAllPrograms();

    Program getProgramByGroup(final Group group);
}
