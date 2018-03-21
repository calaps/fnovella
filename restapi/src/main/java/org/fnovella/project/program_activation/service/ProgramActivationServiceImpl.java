package org.fnovella.project.program_activation.service;

import java.util.List;

import org.fnovella.project.program_activation.model.ProgramActivation;
import org.fnovella.project.program_activation.repository.ProgramActivationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgramActivationServiceImpl implements ProgramActivationService {
    @Autowired
    private ProgramActivationRepository ProgramActivationRepository;

    @Override
    public List<ProgramActivation> getProgramActivationByProgramId(final Integer programId) {
        return this.ProgramActivationRepository.findByProgramId(programId);
    }
}
