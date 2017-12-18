package org.fnovella.project.evaluation_activity_participant.service;

import org.fnovella.project.evaluation_activity_participant.data.EvaluationActivityParticipantData;
import org.fnovella.project.evaluation_activity_participant.model.EvaluationActivityParticipant;

import java.util.List;

public interface EvaluationActivityParticipantService {
    List<EvaluationActivityParticipantData> getByActivityId(Integer activityId);

    List<EvaluationActivityParticipant> getBySession(Integer session);
}
