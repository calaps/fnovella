package org.fnovella.project.catalog.repository;


import javax.transaction.Transactional;

import org.fnovella.project.catalog.model.Catalog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("catalogRepository")
public interface CatalogRepository extends JpaRepository<Catalog, Integer> {
	@Transactional
	@Query("update Catalog set name=?1, type=?2, category=?3 where id =?4")
	Catalog update(String name, String type, String category, Integer id);	
	Page<Catalog> findByCategory(Integer category, Pageable pageable);
}