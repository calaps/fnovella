package org.fnovella.project.program_aditional_fields.repository;


import org.fnovella.project.program_aditional_fields.model.ProgramAditionalFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("programAditionalFieldsRepository")
public interface ProgramAditionalFieldsRepository extends JpaRepository<ProgramAditionalFields, Integer> {

}