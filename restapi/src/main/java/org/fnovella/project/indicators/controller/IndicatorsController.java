package org.fnovella.project.indicators.controller;


import org.fnovella.project.evaluation.model.Evaluation;
import org.fnovella.project.evaluation.repository.EvaluationRepository;
import org.fnovella.project.indicators.data.EvaluationIndicators;
import org.fnovella.project.indicators.service.EvaluationIndicatorsService;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/indicators/")
public class IndicatorsController {

    @Autowired
    private EvaluationIndicatorsService evaluationIndicatorsService;
    @Autowired
    private EvaluationRepository evaluationRepository;

    @RequestMapping(value = "evaluation/{evaluationId}/{year}", method = RequestMethod.GET)
    public APIResponse getEvaluationIndicators(@RequestHeader("authorization") String authorization,
                                               @PathVariable("evaluationId") Integer evaluationId,
                                               @PathVariable("year") Integer year) {
        Evaluation evaluation = evaluationRepository.findOne(evaluationId);
        List<String> errors = null;
        EvaluationIndicators evaluationIndicators = null;
        if (evaluation != null) {
            evaluationIndicators = evaluationIndicatorsService.fetchIndicators(evaluation, year);
        } else {
            errors = new ArrayList<>();
            errors.add("Evaluation not found");
        }
        return new APIResponse(evaluationIndicators, errors);
    }
}
