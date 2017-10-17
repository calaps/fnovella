package org.fnovella.project.catalog_relation_student.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.validator.constraints.Length;

@Entity
public class CatalogRelationStudent {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer idParticipant;
	private Integer idCatalog;
	@Length(max = 100)
	private String value;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getIdParticipant() {
		return idParticipant;
	}
	public void setIdParticipant(Integer idParticipant) {
		this.idParticipant = idParticipant;
	}
	public Integer getIdCatalog() {
		return idCatalog;
	}
	public void setIdCatalog(Integer idCatalog) {
		this.idCatalog = idCatalog;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public CatalogRelationStudent() {
		super();
	}
	public CatalogRelationStudent(Integer idParticipant, Integer idCatalog, String value) {
		super();
		this.idParticipant = idParticipant;
		this.idCatalog = idCatalog;
		this.value = value;
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.idCatalog <= 0) errors.add("Catalog is required");
		if (this.idParticipant <= 0) errors.add("Participant is required");
		return errors;
	}
	public void setUpdateFields(CatalogRelationStudent relation) {
		this.idCatalog = relation.idCatalog;
		this.idParticipant = relation.idParticipant;
	}
}