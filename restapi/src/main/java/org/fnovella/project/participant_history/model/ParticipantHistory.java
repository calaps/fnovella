package org.fnovella.project.participant_history.model;

import java.util.List;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.fnovella.project.evaluation_activity.model.EvaluationActivity;
import org.fnovella.project.participant.model.Participant;

public class ParticipantHistory {
    private Participant participant;
    private List<Integer> groupIdsEnrolled;
    private List<Integer> assistances;
    private List<EvaluationActivity> evaluationActivities;

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }

    public List<Integer> getGroupIdsEnrolled() {
        return groupIdsEnrolled;
    }

    public void setGroupIdsEnrolled(List<Integer> groupIdsEnrolled) {
        this.groupIdsEnrolled = groupIdsEnrolled;
    }

    public List<Integer> getAssistances() {
        return assistances;
    }

    public void setAssistances(List<Integer> assistances) {
        this.assistances = assistances;
    }

    public List<EvaluationActivity> getEvaluationActivities() {
        return evaluationActivities;
    }

    public void setEvaluationActivities(List<EvaluationActivity> evaluationActivities) {
        this.evaluationActivities = evaluationActivities;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || !(o instanceof ParticipantHistory)) {
            return false;
        }
        return EqualsBuilder.reflectionEquals(this, o, false);
    }

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }
}
