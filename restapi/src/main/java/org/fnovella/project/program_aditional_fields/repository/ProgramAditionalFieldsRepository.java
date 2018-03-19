package org.fnovella.project.program_aditional_fields.repository;


import org.fnovella.project.program_aditional_fields.model.ProgramAditionalFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProgramAditionalFieldsRepository extends JpaRepository<ProgramAditionalFields, Integer> {

    List<ProgramAditionalFields> findByProgram(Integer program);
    @Transactional
    void deleteByProgram(Integer programId);
}