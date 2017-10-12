package org.fnovella.project.catalog.repository;

import org.fnovella.project.catalog.model.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("catalogRepository")
public interface CatalogRepository extends JpaRepository<Catalog, Integer> {
	//Page<Catalog> findAll(Pageable pageRequest);
}