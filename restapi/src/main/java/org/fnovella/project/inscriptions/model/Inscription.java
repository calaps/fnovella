package org.fnovella.project.inscriptions.model;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "inscriptions")
public class Inscription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer period;
    private Integer year;
    private Integer status;
    @Column(name = "`group`")
    private Integer group;

    public Inscription() {
    }

    public Inscription(Integer period, Integer year, Integer status, Integer group) {
        this.period = period;
        this.year = year;
        this.status = status;
        this.group = group;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getGroup() {
        return group;
    }

    public void setGroup(Integer group) {
        this.group = group;
    }

    public ArrayList<String> validate() {
        ArrayList<String> errors = new ArrayList<>();
        if (this.period == null || this.period <= 0) errors.add("Period is required");
        if (this.year == null || this.year <= 0) errors.add("Year is required");
        if (this.status == null || this.status <= 0) errors.add("Status is required");
        if (this.group == null || this.group <= 0) errors.add("Group is required");
        return errors;
    }

    public void setUpdateFields(Inscription inscriptions) {
        if (inscriptions.period != null && this.period > 0) this.period = inscriptions.period;
        if (inscriptions.year != null && this.year > 0) this.year = inscriptions.year;
        if (inscriptions.status != null && this.status > 0) this.status = inscriptions.status;
        if (inscriptions.group != null && this.group > 0) this.group = inscriptions.group;
    }
}
