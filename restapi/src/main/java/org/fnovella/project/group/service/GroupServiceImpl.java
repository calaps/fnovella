package org.fnovella.project.group.service;

import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.division.service.DivisionService;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.section.service.SectionService;
import org.fnovella.project.workshop.service.WorkshopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupServiceImpl implements GroupService {


    @Autowired
    private WorkshopService workshopService;
    @Autowired
    private DivisionService divisionService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private SectionService sectionService;

    @Override
    public void updateCategoryStructure(Group group) {
        TypeCategory typeCategory = TypeCategory.valueOf(group.getTypeCategory().toUpperCase());
        switch (typeCategory) {
            case WORKSHOP:
                workshopService.updateCreatedGroup(group);
                break;
            case DIVISION:
                divisionService.updateCreatedGroup(group);
                break;
            case COURSE:
                courseService.updateCreatedGroup(group);
                break;
            case SECTION:
                sectionService.updateCreatedGroup(group);
                break;
        }

    }

    enum TypeCategory {
        WORKSHOP, DIVISION, COURSE, SECTION
    }
}
