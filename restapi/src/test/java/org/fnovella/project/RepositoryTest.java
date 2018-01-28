package org.fnovella.project;

import org.fnovella.project.group.model.InsightGroupDTO;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.participant.service.ParticipantService;
import org.fnovella.project.program.model.InsightProgramDTO;
import org.fnovella.project.program.service.ProgramService;
import org.fnovella.project.program.service.ProgramServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RepositoryTest {
    @Autowired
    GroupService groupService;
    @Autowired
    ParticipantService participantService;
    @Autowired
    ProgramService programService;

    @Test
    public void queryInsight() {
        InsightGroupDTO insight = this.groupService.getInsight(66);
        System.out.println("===> Insight test");
        System.out.println("ActiveParticipants: " + insight.getActiveParticipants());
        System.out.println("InactiveParticipants: " + insight.getInactiveParticipants());
        System.out.println("TotalParticipants: " + insight.getTotalParticipants());
        System.out.println("Sustained: "+insight.getSustainedParticipants());
        System.out.println("Justified: "+insight.getJustifiedParticipants());
        System.out.println("ApprovedParticipants: " + insight.getApprovedParticipants());
        System.out.println("Accomplishment: " + insight.getAccomplishment());
        System.out.println("TotalAssistance: " + insight.getTotalAssistance());
        System.out.println("SessionAssistance: " + insight.getSessionAssistance());
    }

    @Test
    public void queryInsightProgram() {
        InsightProgramDTO insight = this.programService.getInsight(110);
        System.out.println("===> Insight test");
        System.out.println("ActiveParticipants: " + insight.getActiveParticipants());
        System.out.println("InactiveParticipants: " + insight.getInactiveParticipants());
        System.out.println("TotalParticipants: " + insight.getTotalParticipants());
        System.out.println("Justified: "+insight.getJustifiedParticipants());
        System.out.println("ApprovedParticipants: " + insight.getApprovedParticipants());
        System.out.println("Accomplishment: " + insight.getAccomplishment());
        System.out.println("TotalAssistance: " + insight.getTotalAssistance());
    }

    @Test
    public void queryActiveParticipant() {
        Integer active = this.participantService.getActiveParticipant(67);
        System.out.println("===> TEST Group Insight");
        System.out.println("ActiveParticipants: " + active);
    }

    @Test
    public void queryParticipantProcedure() {
        Integer value = this.participantService.getActiveParticipant(12);
        System.out.println("===> TEST Participant");
        System.out.println("Value: " +  value);
    }

    @Test
    public void queryTotalParticipants() {
        Integer value = this.participantService.getTotalParticipant(67);
        System.out.println("===> TEST Total Participants");
        System.out.println("TotalParticipants: " + value);
    }

    @Test
    public void queryParticipationOperation() {
        Integer sustained = this.participantService.getSustainedParticipant(66);
        Integer justified = this.participantService.getJustifiedParticipant(66);
        System.out.println("=== Test Participation Operation");
        System.out.println("Sustained: "+sustained);
        System.out.println("Justified: "+justified);
    }

}
