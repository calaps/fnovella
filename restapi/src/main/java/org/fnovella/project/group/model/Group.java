package org.fnovella.project.group.model;

import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.Column;

import org.fnovella.project.group.service.TypeCategory;
import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;
import org.fnovella.project.program.model.Program;

@Entity
@Table(name = "[group]")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Length(max = 50)
    private String typeCategory;
    private Integer type;
    @Length(max = 50)
    private String correlativo;
    private Integer courseId;
    private Integer workshopId;
    private Integer divisionId;
    private Integer section;
    private Integer instructor;
    private Date inscriptionsStart;
    private Date inscriptionsEnd;
    private Integer nsJan;
    private Integer nsFeb;
    private Integer nsMar;
    private Integer nsApr;
    private Integer nsMay;
    private Integer nsJun;
    private Integer nsJul;
    private Integer nsAug;
    private Integer nsSep;
    private Integer nsOct;
    private Integer nsNov;
    private Integer nsDec;
    private Integer yearActivation;
    private Date programDateStart;
    private Date programDateEnd;
    private boolean insExtra;
    private boolean evsExtra;
    private Integer coordinator;
    @Transient
    private Program program;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getCorrelativo() {
        return correlativo;
    }

    public void setCorrelativo(String correlativo) {
        this.correlativo = correlativo;
    }

    public Integer getSection() {
        return section;
    }

    public void setSection(Integer section) {
        this.section = section;
    }

    public Program getProgram() {
        return program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public Integer getInstructor() {
        return instructor;
    }

    public void setInstructor(Integer instructor) {
        this.instructor = instructor;
    }


    public String getTypeCategory() {
        return typeCategory;
    }

    public void setTypeCategory(String typeCategory) {
        this.typeCategory = typeCategory;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(Integer workshopId) {
        this.workshopId = workshopId;
    }

    public Integer getDivisionId() {
        return divisionId;
    }

    public void setDivisionId(Integer divisionId) {
        this.divisionId = divisionId;
    }

    public Date getInscriptionsStart() {
        return inscriptionsStart;
    }

    public void setInscriptionsStart(Date inscriptionsStart) {
        this.inscriptionsStart = inscriptionsStart;
    }

    public Date getInscriptionsEnd() {
        return inscriptionsEnd;
    }

    public void setInscriptionsEnd(Date inscriptionsEnd) {
        this.inscriptionsEnd = inscriptionsEnd;
    }

    public Integer getNsJan() {
        return nsJan;
    }

    public void setNsJan(Integer nsJan) {
        this.nsJan = nsJan;
    }

    public Integer getNsFeb() {
        return nsFeb;
    }

    public void setNsFeb(Integer nsFeb) {
        this.nsFeb = nsFeb;
    }

    public Integer getNsMar() {
        return nsMar;
    }

    public void setNsMar(Integer nsMar) {
        this.nsMar = nsMar;
    }

    public Integer getNsApr() {
        return nsApr;
    }

    public void setNsApr(Integer nsApr) {
        this.nsApr = nsApr;
    }

    public Integer getNsMay() {
        return nsMay;
    }

    public void setNsMay(Integer nsMay) {
        this.nsMay = nsMay;
    }

    public Integer getNsJun() {
        return nsJun;
    }

    public void setNsJun(Integer nsJun) {
        this.nsJun = nsJun;
    }

    public Integer getNsJul() {
        return nsJul;
    }

    public void setNsJul(Integer nsJul) {
        this.nsJul = nsJul;
    }

    public Integer getNsAug() {
        return nsAug;
    }

    public void setNsAug(Integer nsAug) {
        this.nsAug = nsAug;
    }

    public Integer getNsSep() {
        return nsSep;
    }

    public void setNsSep(Integer nsSep) {
        this.nsSep = nsSep;
    }

    public Integer getNsOct() {
        return nsOct;
    }

    public void setNsOct(Integer nsOct) {
        this.nsOct = nsOct;
    }

    public Integer getNsNov() {
        return nsNov;
    }

    public void setNsNov(Integer nsNov) {
        this.nsNov = nsNov;
    }

    public Integer getNsDec() {
        return nsDec;
    }

    public void setNsDec(Integer nsDec) {
        this.nsDec = nsDec;
    }

    public Integer getYearActivation() {
        return yearActivation;
    }

    public void setYearActivation(Integer yearActivation) {
        this.yearActivation = yearActivation;
    }

    public Date getProgramDateStart() {
        return programDateStart;
    }

    public void setProgramDateStart(Date programDateStart) {
        this.programDateStart = programDateStart;
    }

    public Date getProgramDateEnd() {
        return programDateEnd;
    }

    public void setProgramDateEnd(Date programDateEnd) {
        this.programDateEnd = programDateEnd;
    }

    public boolean isInsExtra() {
        return insExtra;
    }

    public void setInsExtra(boolean insExtra) {
        this.insExtra = insExtra;
    }

    public boolean isEvsExtra() {
        return evsExtra;
    }

    public void setEvsExtra(boolean evsExtra) {
        this.evsExtra = evsExtra;
    }

    public Integer getCoordinator() {
        return coordinator;
    }

    public void setCoordinator(Integer coordinator) {
        this.coordinator = coordinator;
    }

    public Group(String typeCategory, Integer type, String correlativo, Integer courseId, Integer workshopId,
                 Integer divisionId, Integer section, Integer instructor, Integer nsJan, Integer nsFeb, Integer nsMar,
                 Integer nsApr, Integer nsMay, Integer nsJun, Integer nsJul, Integer nsAug, Integer nsSep, Integer nsOct,
                 Integer nsNov, Integer nsDec, Date inscriptionsStart, Date inscriptionsEnd, Date programDateStart,
                 Date programDateEnd, boolean insExtra, boolean evsExtra, Integer coordinator) {
        super();
        this.typeCategory = typeCategory;
        this.type = type;
        this.correlativo = correlativo;
        this.courseId = courseId;
        this.workshopId = workshopId;
        this.divisionId = divisionId;
        this.section = section;
        this.instructor = instructor;
        this.nsJan = nsJan;
        this.nsFeb = nsFeb;
        this.nsMar = nsMar;
        this.nsApr = nsApr;
        this.nsMay = nsMay;
        this.nsJun = nsJun;
        this.nsJul = nsJul;
        this.nsAug = nsAug;
        this.nsSep = nsSep;
        this.nsOct = nsOct;
        this.nsNov = nsNov;
        this.nsDec = nsDec;
        this.inscriptionsStart = inscriptionsStart;
        this.inscriptionsEnd = inscriptionsEnd;
        this.programDateStart = programDateStart;
        this.programDateEnd = programDateEnd;
        this.insExtra = insExtra;
        this.evsExtra = evsExtra;
        this.coordinator = coordinator;
    }

    public Group() {
        super();
        // TODO Auto-generated constructor stub
    }

    public ArrayList<String> validate() {
        ArrayList<String> errors = new ArrayList<String>();
        if (!APIUtility.isNotNullOrEmpty(this.typeCategory)) errors.add("Type cateogry is required");
        if (!APIUtility.isNotNullOrEmpty(this.correlativo)) errors.add("Correlativo is required");
        if (this.type == null || this.type <= 0) errors.add("Type is required");
        if (this.yearActivation == null || this.yearActivation <= 0) errors.add("Year Activation is required");
        if (this.instructor == null || this.instructor <= 0) errors.add("Instructor is required");
        if (this.inscriptionsStart == null) errors.add("Inscriptions Start is required");
        if (this.inscriptionsEnd == null) errors.add("Inscriptions End is required");
        if(typeCategory != null)
        switch (TypeCategory.valueOf(typeCategory.toUpperCase())) {
            case COURSE:
                if (this.courseId == null || this.courseId <= 0) errors.add("Course is required");
                break;
            case SECTION:
                if (this.section == null || this.section <= 0) errors.add("Section is required");
                break;
            case DIVISION:
                if (this.divisionId == null || this.divisionId <= 0) errors.add("Dvision is required");
                break;
            case WORKSHOP:
                if (this.workshopId == null || this.workshopId <= 0) errors.add("Workshop is required");
                break;
        }
        return errors;
    }

    public void setUpdateFields(Group group) {
        if (APIUtility.isNotNullOrEmpty(group.typeCategory)) this.typeCategory = group.typeCategory;
        if (APIUtility.isNotNullOrEmpty(group.correlativo)) this.correlativo = group.correlativo;
        if (group.type != null && group.type > 0) this.type = group.type;
        if (group.courseId != null && group.courseId > 0) this.courseId = group.courseId;
        if (group.workshopId != null && group.workshopId > 0) this.workshopId = group.workshopId;
        if (group.divisionId != null && group.divisionId > 0) this.divisionId = group.divisionId;
        if (group.section != null && group.section > 0) this.section = group.section;
        if (group.instructor != null && group.instructor > 0) this.instructor = group.instructor;
        if (group.yearActivation != null && group.yearActivation > 0) this.yearActivation = group.yearActivation;
        if (group.nsJan != null && group.nsJan > 0) this.nsJan = group.nsJan;
        if (group.nsFeb != null && group.nsFeb > 0) this.nsFeb = group.nsFeb;
        if (group.nsMar != null && group.nsMar > 0) this.nsMar = group.nsMar;
        if (group.nsApr != null && group.nsApr > 0) this.nsApr = group.nsApr;
        if (group.nsMay != null && group.nsMay > 0) this.nsMay = group.nsMay;
        if (group.nsJun != null && group.nsJun > 0) this.nsJun = group.nsJun;
        if (group.nsJul != null && group.nsJul > 0) this.nsJul = group.nsJul;
        if (group.nsAug != null && group.nsAug > 0) this.nsAug = group.nsAug;
        if (group.nsSep != null && group.nsSep > 0) this.nsSep = group.nsSep;
        if (group.nsOct != null && group.nsOct > 0) this.nsOct = group.nsOct;
        if (group.nsNov != null && group.nsNov > 0) this.nsNov = group.nsNov;
        if (group.nsDec != null && group.nsDec > 0) this.nsDec = group.nsDec;
        if (group.coordinator != null && group.coordinator > 0) this.coordinator = group.coordinator;
        if (group.inscriptionsStart != null) this.inscriptionsStart = group.inscriptionsStart;
        if (group.inscriptionsEnd != null) this.inscriptionsEnd = group.inscriptionsEnd;
        this.programDateStart = group.programDateStart != null ? group.programDateStart : this.programDateStart;
        this.programDateEnd = group.programDateEnd != null ? group.programDateEnd : this.programDateEnd;
        this.insExtra = group.insExtra;
        this.evsExtra = group.evsExtra;
    }

}