package org.fnovella.project.program_activation.service;

import java.util.List;

import org.fnovella.project.program_activation.model.ProgramActivation;

public interface ProgramActivationService {
    List<ProgramActivation> getProgramActivationByProgramId(Integer programId);
}
