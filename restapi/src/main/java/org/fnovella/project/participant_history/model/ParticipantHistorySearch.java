package org.fnovella.project.participant_history.model;

public class ParticipantHistorySearch {

    private Integer programId;
    private Integer groupId;
    private Integer year;
    private String documentValue;

    public Integer getProgramId() {
        return programId;
    }

    public void setProgramId(Integer programId) {
        this.programId = programId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDocumentValue() {
        return documentValue;
    }

    public void setDocumentValue(String documentValue) {
        this.documentValue = documentValue;
    }

}
