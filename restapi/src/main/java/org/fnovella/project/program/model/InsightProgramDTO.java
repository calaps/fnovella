package org.fnovella.project.program.model;

public class InsightProgramDTO {
    private Double totalParticipants = 0.0;
    private Double activeParticipants = 0.0;
    private Double inactiveParticipants = 0.0;
    private Double justifiedParticipants = 0.0;
    private Double approvedParticipants = 0.0;
    private Double accomplishment = 0.0;
    private Double totalAssistance = 0.0;

    public Double getTotalParticipants() {
        return totalParticipants;
    }

    public void setTotalParticipants(Double totalParticipants) {
        this.totalParticipants = totalParticipants;
    }

    public Double getActiveParticipants() {
        return activeParticipants;
    }

    public void setActiveParticipants(Double activeParticipants) {
        this.activeParticipants = activeParticipants;
    }

    public Double getInactiveParticipants() {
        return inactiveParticipants;
    }

    public void setInactiveParticipants(Double inactiveParticipants) {
        this.inactiveParticipants = inactiveParticipants;
    }

    public Double getJustifiedParticipants() {
        return justifiedParticipants;
    }

    public void setJustifiedParticipants(Double justifiedParticipants) {
        this.justifiedParticipants = justifiedParticipants;
    }

    public Double getApprovedParticipants() {
        return approvedParticipants;
    }

    public void setApprovedParticipants(Double approvedParticipants) {
        this.approvedParticipants = approvedParticipants;
    }

    public Double getAccomplishment() {
        return accomplishment;
    }

    public void setAccomplishment(Double accomplishment) {
        this.accomplishment = accomplishment;
    }

    public Double getTotalAssistance() {
        return totalAssistance;
    }

    public void setTotalAssistance(Double totalAssistance) {
        this.totalAssistance = totalAssistance;
    }
}
