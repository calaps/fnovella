package org.fnovella.project.indicators.data;

import org.fnovella.project.group.model.Group;

import java.util.Map;
import java.util.function.Predicate;

public class EvaluationIndicators {
    private Group group;
    private int totalNumberOfStudents;
    private long numberOfStudentsApproved;
    private long percentageOfStudentsApproved;
    private long numberOfStudentsFailed;
    private long percentageOfStudentsFailed;


    public void setGroup(Group group) {
        this.group = group;
    }

    public void setTotalNumberOfStudents(int totalNumberOfStudents) {
        this.totalNumberOfStudents = totalNumberOfStudents;
    }

    public void setNumberOfStudentsApproved(long numberOfStudentsApproved) {
        this.numberOfStudentsApproved = numberOfStudentsApproved;
    }

    public void setPercentageOfStudentsApproved(long percentageOfStudentsApproved) {
        this.percentageOfStudentsApproved = percentageOfStudentsApproved;
    }

    public void setNumberOfStudentsFailed(long numberOfStudentsFailed) {
        this.numberOfStudentsFailed = numberOfStudentsFailed;
    }

    public void setPercentageOfStudentsFailed(long percentageOfStudentsFailed) {
        this.percentageOfStudentsFailed = percentageOfStudentsFailed;
    }

    public Group getGroup() {
        return group;
    }

    public int getTotalNumberOfStudents() {
        return totalNumberOfStudents;
    }

    public long getNumberOfStudentsApproved() {
        return numberOfStudentsApproved;
    }

    public long getPercentageOfStudentsApproved() {
        return percentageOfStudentsApproved;
    }

    public long getNumberOfStudentsFailed() {
        return numberOfStudentsFailed;
    }

    public long getPercentageOfStudentsFailed() {
        return percentageOfStudentsFailed;
    }


    public static class Builder {

        private Map<Integer, Double> studentNotes;
        private Group group;
        private Integer approvalPercentage;
        public static final double PERCENTAGE = 100.0;

        public Builder setStudentNotes(Map<Integer, Double> studentNotes) {
            this.studentNotes = studentNotes;
            return this;
        }

        public Builder setGroup(Group group) {
            this.group = group;
            return this;
        }

        public Builder setApprovalPercentage(Integer approvalPercentage) {
            this.approvalPercentage = approvalPercentage;
            return this;
        }

        public EvaluationIndicators build() {
            boolean isStudentExist = studentNotes.isEmpty();
            long numberOfStudentsApproved = isStudentExist ? 0 : calculateNumberOfStudentApproved(studentNotes);
            long percentageOfStudentsApproved = isStudentExist ? 0 : (long) (numberOfStudentsApproved * PERCENTAGE / studentNotes.size());
            long numberOfStudentsFailed = isStudentExist ? 0 : studentNotes.size() - numberOfStudentsApproved;
            long percentageOfStudentsFailed = isStudentExist ? 0 : (long) (PERCENTAGE - percentageOfStudentsApproved);

            EvaluationIndicators evaluationIndicators = new EvaluationIndicators();
            evaluationIndicators.setGroup(this.group);
            evaluationIndicators.setTotalNumberOfStudents(studentNotes.size());
            evaluationIndicators.setNumberOfStudentsApproved(numberOfStudentsApproved);
            evaluationIndicators.setPercentageOfStudentsApproved(percentageOfStudentsApproved);
            evaluationIndicators.setNumberOfStudentsFailed(numberOfStudentsFailed);
            evaluationIndicators.setPercentageOfStudentsFailed(percentageOfStudentsFailed);
            return evaluationIndicators;
        }

        private long calculateNumberOfStudentApproved(Map<Integer, Double> studentNotes) {
            return studentNotes.values()
                    .stream()
                    .filter(isApproved())
                    .count();
        }

        private Predicate<Double> isApproved() {
            return note -> note >= approvalPercentage;
        }

    }
}
