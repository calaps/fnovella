package org.fnovella.project.catalog_relation.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CatalogRelation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer idProgram;
	private Integer idCatalog;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getIdProgram() {
		return idProgram;
	}
	public void setIdProgram(Integer idProgram) {
		this.idProgram = idProgram;
	}
	public Integer getIdCatalog() {
		return idCatalog;
	}
	public void setIdCatalog(Integer idCatalog) {
		this.idCatalog = idCatalog;
	}
	public CatalogRelation(Integer idProgram, Integer idCatalog) {
		super();
		this.idProgram = idProgram;
		this.idCatalog = idCatalog;
	}
	public CatalogRelation() {
		super();
	}
	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (this.idCatalog == null || this.idCatalog <= 0) errors.add("Catalog is required");
		if (this.idProgram == null || this.idProgram <= 0) errors.add("Program is required");
		return errors;
	}
	public void setUpdateFields(CatalogRelation catalog) {
		if (catalog.idCatalog != null && catalog.idCatalog > 0) this.idCatalog = catalog.idCatalog;
		if (catalog.idProgram != null && catalog.idProgram > 0) this.idProgram = catalog.idProgram;
	}
	
}