package org.fnovella.project.inscriptions_participants.model;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "inscriptions_participants")
public class InscriptionParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer inscription;
    private Integer participant;

    public InscriptionParticipant(Integer inscription, Integer participant) {
        this.inscription = inscription;
        this.participant = participant;
    }

    public InscriptionParticipant() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getInscription() {
        return inscription;
    }

    public void setInscription(Integer inscription) {
        this.inscription = inscription;
    }

    public Integer getParticipant() {
        return participant;
    }

    public void setParticipant(Integer participant) {
        this.participant = participant;
    }

    public ArrayList<String> validate() {
        ArrayList<String> errors = new ArrayList<>();
        if (this.inscription == null || this.inscription <= 0) errors.add("Inscription Id is required");
        if (this.participant == null || this.participant <= 0) errors.add("Participant Id is required");
        return errors;
    }

    public void setUpdateFields(InscriptionParticipant inscriptionParticipant) {
        if (inscriptionParticipant.inscription != null && this.inscription > 0) this.inscription = inscriptionParticipant.inscription;
        if (inscriptionParticipant.participant != null && this.participant > 0) this.participant = inscriptionParticipant.participant;
    }
}
