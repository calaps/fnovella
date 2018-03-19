package org.fnovella.project.indicators.service;

import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.indicators.data.EvaluationIndicators;

public interface EvaluationIndicatorsService {
    EvaluationIndicators fetchIndicators(Evaluation evaluationId, Integer year);
}
