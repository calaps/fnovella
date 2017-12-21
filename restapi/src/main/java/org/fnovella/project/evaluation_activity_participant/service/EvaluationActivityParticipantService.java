package org.fnovella.project.evaluation_activity_participant.service;

import org.fnovella.project.evaluation_activity_participant.data.EvaluationActivityParticipantData;
import org.fnovella.project.evaluation_activity_participant.data.EvaluationActivityParticipantDetail;

import java.util.List;

public interface EvaluationActivityParticipantService {
    List<EvaluationActivityParticipantData> getByActivityId(Integer activityId);

    List<EvaluationActivityParticipantDetail> getBySession(Integer session);

    List<EvaluationActivityParticipantDetail> findAll();

    EvaluationActivityParticipantDetail findOne(Integer id);
}
