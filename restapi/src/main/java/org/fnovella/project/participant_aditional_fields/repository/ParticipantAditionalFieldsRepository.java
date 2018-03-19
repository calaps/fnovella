package org.fnovella.project.participant_aditional_fields.repository;

import org.fnovella.project.participant_aditional_fields.model.ParticipantAditionalFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ParticipantAditionalFieldsRepository extends JpaRepository<ParticipantAditionalFields, Integer>{
    @Transactional
    void deleteByGroup(Integer groupId);

    List<ParticipantAditionalFields> findByGroup(Integer groupId);
}
