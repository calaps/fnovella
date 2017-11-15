package org.fnovella.project.catalog_relation.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.catalog_relation.model.CatalogRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("catalogRelationRepository")
public interface CatalogRelationRepository extends JpaRepository<CatalogRelation, Integer> {
	List<CatalogRelation> findByIdCatalog(Integer catalogId);
	List<CatalogRelation> findByIdProgram(Integer programId);
	@Modifying
    @Transactional
    @Query("delete from CatalogRelation where idProgram = ?1")
	void deleteByIdProgram(Integer idProgram);
	@Modifying
	@Transactional
    @Query("delete from CatalogRelation where idCatalog = ?1")
	void deleteByIdCatalog(Integer idCatalog);
}