package org.fnovella.project.section.service;

import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.section.model.Section;
import org.fnovella.project.section.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionServiceImpl implements SectionService {

    @Autowired
    private SectionRepository sectionRepository;
    @Autowired
    private CourseService courseService;

    @Override
    public void updateCreatedGroup(Group group, boolean createdGroup) {
        Section section = sectionRepository.findOne(group.getSection());
        if (section != null) {
            section.setCreatedGroup(createdGroup);
            sectionRepository.save(section);
        }
    }

    @Override
    public void deleteByGradeId(Integer gradeId) {
        List<Section> sections = sectionRepository.findByGrade(gradeId);
        sections.forEach(section -> {
            courseService.deleteBySection(section.getId());
        });

        if (!sections.isEmpty()) {
            sectionRepository.deleteByGrade(gradeId);
        }

    }
}
