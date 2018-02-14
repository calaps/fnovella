package org.fnovella.project.section.service;

import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.grade.model.Grade;
import org.fnovella.project.grade.service.GradeService;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.group.service.TypeCategory;
import org.fnovella.project.program.service.ProgramService;
import org.fnovella.project.section.model.Section;
import org.fnovella.project.section.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionServiceImpl implements SectionService {

    @Autowired
    private SectionRepository sectionRepository;
    @Autowired
    private CourseService courseService;

    @Autowired
    private GradeService gradeService;

    @Autowired
    private ProgramService programService;
    
    @Autowired
    private GroupService groupService;

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

    @Override
    public Page<Section> getAllSections(final Pageable pageable) {
        final Page<Section> sections = this.sectionRepository.findAll(pageable);
        if (sections == null) {
            return null;
        }
        for (final Section section : sections.getContent()) {
            final Grade grade = this.gradeService.findByGradeId(section.getGrade());
            section.setCreatedGroup(this.programService.isProgramActive(grade.getProgramId()));
            section.setGroupExists(this.groupService.isGroupExistsForClassification(section.getId(), TypeCategory.SECTION));
        }
        return sections;
    }
}
