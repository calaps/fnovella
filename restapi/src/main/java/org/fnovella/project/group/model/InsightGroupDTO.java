package org.fnovella.project.group.model;

public class InsightGroupDTO {
    private Integer totalParticipants;
    private Integer activeParticipants;
    private Integer inactiveParticipants;
    private Integer sustainedParticipants;
    private Integer justifiedParticipants;
    private long approvedParticipants;
    private Integer accomplishment;
    private Integer sessionAssistance;
    private Integer totalAssistance;

    public Integer getTotalParticipants() {
        return totalParticipants;
    }

    public void setTotalParticipants(Integer totalParticipants) {
        this.totalParticipants = totalParticipants;
    }

    public Integer getActiveParticipants() {
        return activeParticipants;
    }

    public void setActiveParticipants(Integer activeParticipants) {
        this.activeParticipants = activeParticipants;
    }

    public Integer getInactiveParticipants() {
        return inactiveParticipants;
    }

    public void setInactiveParticipants(Integer inactiveParticipants) {
        this.inactiveParticipants = inactiveParticipants;
    }

    public Integer getSustainedParticipants() {
        return sustainedParticipants;
    }

    public void setSustainedParticipants(Integer sustainedParticipants) {
        this.sustainedParticipants = sustainedParticipants;
    }

    public Integer getJustifiedParticipants() {
        return justifiedParticipants;
    }

    public void setJustifiedParticipants(Integer justifiedParticipants) {
        this.justifiedParticipants = justifiedParticipants;
    }

    public long getApprovedParticipants() {
        return approvedParticipants;
    }

    public void setApprovedParticipants(long approvedParticipants) {
        this.approvedParticipants = approvedParticipants;
    }

    public Integer getAccomplishment() {
        return accomplishment;
    }

    public void setAccomplishment(Integer accomplishement) {
        this.accomplishment = accomplishement;
    }

    public Integer getSessionAssistance() {
        return sessionAssistance;
    }

    public void setSessionAssistance(Integer sessionAssistance) {
        this.sessionAssistance = sessionAssistance;
    }

    public Integer getTotalAssistance() {
        return totalAssistance;
    }

    public void setTotalAssistance(Integer totalAssistance) {
        this.totalAssistance = totalAssistance;
    }
}
