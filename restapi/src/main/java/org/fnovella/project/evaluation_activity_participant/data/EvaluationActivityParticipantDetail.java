package org.fnovella.project.evaluation_activity_participant.data;

import org.fnovella.project.evaluation_activity_participant.model.EvaluationActivityParticipant;

import java.util.Date;

public class EvaluationActivityParticipantDetail {
    private Integer id;
    private Integer activity;
    private Integer gradeInitial;
    private Integer gradeFinal;
    private Integer participant;
    private Integer session;
    private Integer evaluationId;
    private Integer month;
    private Integer year;
    private Date date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getActivity() {
        return activity;
    }

    public void setActivity(Integer activity) {
        this.activity = activity;
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

    public Integer getParticipant() {
        return participant;
    }

    public void setParticipant(Integer participant) {
        this.participant = participant;
    }

    public Integer getSession() {
        return session;
    }

    public void setSession(Integer session) {
        this.session = session;
    }

    public Integer getEvaluationId() {
        return evaluationId;
    }

    public void setEvaluationId(Integer evaluationId) {
        this.evaluationId = evaluationId;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setEvaluationActivityParticipant(EvaluationActivityParticipant evaluationActivityParticipant) {
        this.id = evaluationActivityParticipant.getId();
        this.participant = evaluationActivityParticipant.getParticipant();
        this.activity = evaluationActivityParticipant.getActivity();
        this.gradeFinal = evaluationActivityParticipant.getGradeFinal();
        this.gradeInitial = evaluationActivityParticipant.getGradeInitial();
    }
}
