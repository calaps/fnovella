package org.fnovella.project.assistance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Date;

@Entity
public class Assistance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer inscription;
    private Integer session;
    private Date date;
    private boolean status;
    private Integer month;

    public Assistance() {
    }

    public Assistance(Integer inscription, Integer session, Date date, boolean status, Integer month) {
        this.inscription = inscription;
        this.session = session;
        this.date = date;
        this.status = status;
        this.month = month;
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

    public Integer getSession() {
        return session;
    }

    public void setSession(Integer session) {
        this.session = session;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public ArrayList<String> validate() {
        ArrayList<String> errors = new ArrayList<String>();
        if (this.inscription == null || this.inscription <= 0) errors.add("Inscription is required");
        if (this.month == null || this.month <= 0) errors.add("Month is required");
        if (this.session == null || this.session <= 0) errors.add("Session is required");
        if (this.date == null) errors.add("Date is required");
        return errors;
    }

    public void setUpdateFields(Assistance assistance) {
        if (assistance.inscription != null && assistance.inscription > 0) this.inscription = assistance.inscription;
        if (assistance.month != null && assistance.month > 0) this.month = assistance.month;
        if (assistance.session != null && assistance.session > 0) this.session = assistance.session;
        if (assistance.date != null) this.date = assistance.date;
    }
}
