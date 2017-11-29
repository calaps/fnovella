package org.fnovella.project.section.service;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.section.model.Section;
import org.fnovella.project.section.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SectionServiceImpl implements SectionService {

    @Autowired
    private SectionRepository sectionRepository;

    @Override
    public void updateCreatedGroup(Group group) {
        Section section = sectionRepository.findOne(group.getSection());
        if (section != null) {
            section.setCreatedGroup(true);
            sectionRepository.save(section);
        }
    }
}
