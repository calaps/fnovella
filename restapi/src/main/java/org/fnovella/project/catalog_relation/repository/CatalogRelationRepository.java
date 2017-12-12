package org.fnovella.project.catalog_relation.repository;

import java.util.List;

import org.fnovella.project.catalog_relation.model.CatalogRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface CatalogRelationRepository extends JpaRepository<CatalogRelation, Integer> {
	List<CatalogRelation> findByIdCatalog(Integer catalogId);
	List<CatalogRelation> findByIdProgram(Integer programId);
	void deleteByIdProgram(Integer idProgram);
	@Transactional
	void deleteByIdCatalog(Integer idCatalog);
}