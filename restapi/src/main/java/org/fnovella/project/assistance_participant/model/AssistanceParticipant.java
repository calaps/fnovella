package org.fnovella.project.assistance_participant.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;

@Entity
public class AssistanceParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer assistance;
    private Integer participant;
    private Integer value;

    public AssistanceParticipant() {
    }

    public AssistanceParticipant(Integer assistance, Integer participant, Integer value) {
        this.assistance = assistance;
        this.participant = participant;
        this.value = value;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAssistance() {
        return assistance;
    }

    public void setAssistance(Integer assistance) {
        this.assistance = assistance;
    }

    public Integer getParticipant() {
        return participant;
    }

    public void setParticipant(Integer participant) {
        this.participant = participant;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public ArrayList<String> validate() {
        ArrayList<String> errors = new ArrayList<>();
        if (this.assistance == null || this.assistance <= 0) errors.add("Assistance is required");
        if (this.participant == null || this.participant <= 0) errors.add("Participant is required");
        if (this.value == null || this.value <= 0) errors.add("Value is required");
        return errors;
    }

    public void setUpdateFields(AssistanceParticipant assistanceParticipant) {
        if (assistanceParticipant.assistance != null && assistanceParticipant.assistance > 0)
            this.assistance = assistanceParticipant.assistance;
        if (assistanceParticipant.participant != null && assistanceParticipant.participant > 0)
            this.participant = assistanceParticipant.participant;
        if (assistanceParticipant.value != null && assistanceParticipant.value > 0)
            this.value = assistanceParticipant.value;
    }
}
