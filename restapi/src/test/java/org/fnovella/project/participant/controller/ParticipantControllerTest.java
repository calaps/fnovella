package org.fnovella.project.participant.controller;


import org.fnovella.project.catalog_relation_student.repository.CatalogRelationStudentRepository;
import org.fnovella.project.inscriptions_part_course.repository.InscriptionsPartCourseRepository;
import org.fnovella.project.inscriptions_part_grade.repository.InscriptionsPartGradeRepository;
import org.fnovella.project.inscriptions_part_workshop.repository.InscriptionsPartWorkshopRepository;
import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.repository.ParticipantRepository;
import org.fnovella.project.participant_contacts.repository.ParticipantContactsRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.GregorianCalendar;
import java.util.List;

@RunWith(SpringRunner.class)
@RestClientTest(components = ParticipantController.class)
public class ParticipantControllerTest {
    // Mock beans to pass tests
    @MockBean
    private CatalogRelationStudentRepository catalogRelationStudentRepositoryMock;
    @MockBean
    private ParticipantContactsRepository participantContactsRepositoryMock;
    @MockBean
    private InscriptionsPartCourseRepository inscriptionsPartCourseRepositoryMock;
    @MockBean
    private InscriptionsPartGradeRepository inscriptionsPartGradeRepositoryMock;
    @MockBean
    private InscriptionsPartWorkshopRepository inscriptionsPartWorkshopRepositoryMock;

    // Our tests
    @Autowired
    private ParticipantController participantController;
    @MockBean
    private ParticipantRepository participantRepositoryMock;

    private List<Participant> participants;
    private List<Participant> savedParticipantsMock;

    public static final String AUTHORIZATION = "";

    @Before
    public void before() {
        participants = new ArrayList<>();
        Mockito.when(participantRepositoryMock.findByEmail("email@gmail.com")).thenReturn(null);
        savedParticipantsMock = Matchers.anyList();
        Mockito.when(participantRepositoryMock.save(savedParticipantsMock)).then(
                invocation -> {
                    Object[] args = invocation.getArguments();
                    return args[0];
                }
        );
    }


    @Test
    public void loadMassiveNominalTest() {
        Participant participant1 = initParticipantWithoutEmail();
        participant1.setEmail("email@gmail.com");
        Participant participant2 = initParticipantWithoutEmail();
        participant2.setEmail("email2@gmail.com");
        participants.addAll(Arrays.asList(participant1, participant2));

        APIResponse apiResponse = participantController.loadMassive(participants, AUTHORIZATION);

        Assert.assertTrue(((List<Participant>) apiResponse.getData()).size() == 2);
        Assert.assertTrue(apiResponse.getErrors().size() == 0);
    }

    @Test
    public void loadMassiveWithErrorTest() {
        Participant participant1 = initParticipantWithoutEmail();
        participant1.setEmail("email@gmail.com");
        participant1.setGender(null);

        Participant participant2 = initParticipantWithoutEmail();
        participant2.setEmail("email2@gmail.com");

        participants.addAll(Arrays.asList(participant1, participant2));

        APIResponse apiResponse = participantController.loadMassive(participants, AUTHORIZATION);
        Assert.assertTrue(((List<Participant>) apiResponse.getData()).size() == 1);
        Assert.assertTrue(apiResponse.getErrors().size() == 1);
    }

    private Participant initParticipantWithoutEmail() {
        Participant participant = new Participant();
        participant.setBornDate(new GregorianCalendar());
        participant.setFirstName("first name");
        participant.setSecondName("Second name");
        participant.setFirstLastname("first last name");
        participant.setFirstLastname("first last name");
        participant.setSecondLastname("sec last name");
        participant.setDocumentValue("Doc value");
        participant.setDocumentType("Doc type");
        participant.setNacionality("Nationality");
        participant.setDepartment("Dep");
        participant.setMunicipality("municipality");
        participant.setCommunity("Community");
        participant.setProfession("Profession");
        participant.setAppCode("AppCode");
        participant.setColony("Colony");
        participant.setZone("zone");
        participant.setAddress("Address test");
        participant.setGender("Mr.");
        return participant;
    }

}
