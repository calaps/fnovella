package org.fnovella.project.evaluation_activity_participant.data;

public class EvaluationActivityParticipantData {
    private Integer id;
    private ActivityData activity;
    private Integer gradeInitial;
    private Integer gradeFinal;
    private ParticipantData participant;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Integer getGradeInitial() {
        return gradeInitial;
    }

    public void setGradeInitial(Integer gradeInitial) {
        this.gradeInitial = gradeInitial;
    }

    public Integer getGradeFinal() {
        return gradeFinal;
    }

    public void setGradeFinal(Integer gradeFinal) {
        this.gradeFinal = gradeFinal;
    }

    public ActivityData getActivity() {
        return activity;
    }

    public void setActivity(ActivityData activity) {
        this.activity = activity;
    }

    public ParticipantData getParticipant() {
        return participant;
    }

    public void setParticipant(ParticipantData participant) {
        this.participant = participant;
    }
}
