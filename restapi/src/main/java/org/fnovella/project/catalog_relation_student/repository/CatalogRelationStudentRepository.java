package org.fnovella.project.catalog_relation_student.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.catalog_relation_student.model.CatalogRelationStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("catalogRelationStudentRepository")
public interface CatalogRelationStudentRepository extends JpaRepository<CatalogRelationStudent, Integer> {

	List<CatalogRelationStudent> findByIdParticipant(Integer idParticipant);
	List<CatalogRelationStudent> findByIdCatalog(Integer idCatalog);
	@Modifying
    @Transactional
    @Query("delete from CatalogRelationStudent where idCatalog = ?1")
	void deleteByIdCatalog(Integer idCatalog);
	@Modifying
    @Transactional
    @Query("delete from CatalogRelationStudent where idParticipant = ?1")
	void deleteByIdParticipant(Integer idParticipant);
}