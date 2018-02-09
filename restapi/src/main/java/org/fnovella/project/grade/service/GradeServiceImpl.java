package org.fnovella.project.grade.service;

import org.fnovella.project.course.service.CourseService;
import org.fnovella.project.grade.model.Grade;
import org.fnovella.project.grade.repository.GradeRepository;
import org.fnovella.project.inscriptions_inst_grade.repository.InscriptionsInstGradeRepository;
import org.fnovella.project.inscriptions_part_grade.repository.InscriptionsPartGradeRepository;
import org.fnovella.project.section.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeServiceImpl implements GradeService {

    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private InscriptionsPartGradeRepository inscriptionsPartGradeRepository;
    @Autowired
    private InscriptionsInstGradeRepository inscriptionsInstGradeRepository;
    @Autowired
    private CourseService courseService;
    @Autowired
    private SectionService sectionService;

    @Override
    public void deleteByProgramId(Integer programId) {
        List<Grade> grades = gradeRepository.findByProgramId(programId);
        grades.forEach(grade -> {
            inscriptionsPartGradeRepository.deleteByGradeId(grade.getId());
            inscriptionsInstGradeRepository.deleteByGradeId(grade.getId());
            courseService.deleteByGradeId(grade.getId());
            sectionService.deleteByGradeId(grade.getId());
        });
        if(!grades.isEmpty()){
            gradeRepository.deleteByProgramId(programId);
        }
    }

    @Override
    public Grade findByGradeId(Integer id) {
        return this.gradeRepository.findOne(id);
    }
}
