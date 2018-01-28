package org.fnovella.project.assistance.service;

import org.fnovella.project.assistance.model.AssistanceInsight;

public interface AssistanceService {
    void deleteByInscriptionIfExist(Integer id);

    AssistanceInsight getAssistanceInsight(Integer groupId);
}
