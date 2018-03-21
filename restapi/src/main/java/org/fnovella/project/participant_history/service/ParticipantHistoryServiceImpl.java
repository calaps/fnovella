package org.fnovella.project.participant_history.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.fnovella.project.assistance_participant.service.AssistanceParticipantService;
import org.fnovella.project.evaluation_activity.service.EvaluationActivityService;
import org.fnovella.project.evaluation_activity_participant.service.EvaluationActivityParticipantService;
import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant_aditional_fields.service.ParticipantAditionalFieldsService;
import org.fnovella.project.participant_history.model.ParticipantHistory;
import org.fnovella.project.participant_history.model.ParticipantHistorySearch;
import org.fnovella.project.program.model.Program;
import org.fnovella.project.program.service.ProgramService;
import org.fnovella.project.utility.APIUtility;
import org.fnovella.project.utility.exception.ProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Service
public class ParticipantHistoryServiceImpl implements ParticipantHistoryService {

    @Autowired
    private ProgramService programService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private ParticipantAditionalFieldsService participantAditionalFieldsService;

    @Autowired
    private AssistanceParticipantService assistanceParticipantService;

    @Autowired
    private EvaluationActivityService evaluationActivityService;

    @Autowired
    private EvaluationActivityParticipantService evaluationActivityParticipantService;

    @Override
    public List<ParticipantHistory> getParticipantHistory(final ParticipantHistorySearch participantHistorySearch)
            throws ProcessingException {
        final List<Program> programsRequested = retrieveProgramsList(participantHistorySearch);
        if (CollectionUtils.isEmpty(programsRequested)) {
            StringBuilder errorMessage = new StringBuilder("No Program found");
            errorMessage = (participantHistorySearch != null && participantHistorySearch.getProgramId() != null)
                    ? errorMessage.append(" associated with program id ")
                            .append(participantHistorySearch.getProgramId())
                    : errorMessage;
            throw new ProcessingException(errorMessage.toString());
        }

        final List<Group> groupsRequested = retrieveGroupsList(participantHistorySearch, programsRequested);
        if (CollectionUtils.isEmpty(programsRequested)) {
            StringBuilder errorMessage = new StringBuilder("No Group found");
            errorMessage = (participantHistorySearch != null && participantHistorySearch.getGroupId() != null)
                    ? errorMessage.append(" associated with group id ").append(participantHistorySearch.getGroupId())
                    : errorMessage;
            throw new ProcessingException(errorMessage.toString());
        }

        final List<Group> yearFilteredGroups = retrieveYearFilteredGroups(participantHistorySearch, groupsRequested);

        final Set<ParticipantHistory> participantHistory = retrieveParticipantsList(participantHistorySearch,
                yearFilteredGroups);
        return new ArrayList<>(participantHistory);
    }

    private List<Program> retrieveProgramsList(final ParticipantHistorySearch participationHistorySearch) {
        if (participationHistorySearch == null || participationHistorySearch.getProgramId() == null) {
            return this.programService.getAllPrograms();
        }
        return Arrays.asList(this.programService.getByProgramId(participationHistorySearch.getProgramId()));
    }

    private List<Group> retrieveGroupsList(final ParticipantHistorySearch participantHistorySearch,
            final List<Program> programsRequested) throws ProcessingException {
        final List<Group> groupsRequested = new ArrayList<>();

        if (participantHistorySearch == null || participantHistorySearch.getGroupId() == null) {
            for (Program program : programsRequested) {
                groupsRequested.addAll(this.groupService.getByProgramId(program.getId()));
            }
            return groupsRequested;
        }
        Group groupRequested = this.groupService.getByGroupId(participantHistorySearch.getGroupId());
        if (groupRequested == null) {
            return null;
        }
        final Program programByGroupId = this.programService.getProgramByGroup(groupRequested);
        for (Program program : programsRequested) {
            if (programByGroupId.getId().equals(program.getId())) {
                return Arrays.asList(groupRequested);
            }
        }
        throw new ProcessingException("GroupId " + groupRequested.getId() + " does not belong to " + participantHistorySearch.getProgramId());
    }

    private List<Group> retrieveYearFilteredGroups(final ParticipantHistorySearch participantHistorySearch,
            final List<Group> groupsRequested) {
        final List<Group> yearFilteredGroups = new ArrayList<>();

        if (participantHistorySearch == null || participantHistorySearch.getYear() == null) {
            return groupsRequested;
        }
        for (Group group : groupsRequested) {
            if (participantHistorySearch.getYear().equals(group.getYearActivation())) {
                yearFilteredGroups.add(group);
            }
        }
        return yearFilteredGroups;
    }

    private Set<ParticipantHistory> retrieveParticipantsList(final ParticipantHistorySearch participantHistorySearch,
            final List<Group> yearFilteredGroups) {
        final Set<ParticipantHistory> requestedParticipants = new LinkedHashSet<>();

        if (participantHistorySearch == null
                || !APIUtility.isNotNullOrEmpty(participantHistorySearch.getDocumentValue())) {
            for (Group group : yearFilteredGroups) {
                List<Participant> participants = this.participantAditionalFieldsService.getParticipantsByGroupId(group.getId());
                for (Participant participant : participants) {
                    requestedParticipants.add(getParticipantHistory(participant));
                }
            }
            return requestedParticipants;
        }
        for (final Group group : yearFilteredGroups) {
            List<Participant> participants = this.participantAditionalFieldsService.getParticipantsByGroupId(group.getId());
            for (Participant participant : participants) {
                if (participant.getDocumentValue().compareTo(participantHistorySearch.getDocumentValue()) == 0) {
                    requestedParticipants.add(getParticipantHistory(participant));
                }
            }
        }
        return requestedParticipants;
    }

    private ParticipantHistory getParticipantHistory(final Participant participant) {
        ParticipantHistory participantHistory = new ParticipantHistory();
        participantHistory.setParticipant(participant);
        participantHistory
                .setGroupIdsEnrolled(this.participantAditionalFieldsService.getGroupIdsEnrolled(participant.getId()));
        participantHistory
                .setAssistances(this.assistanceParticipantService.getAssistancesByParticipantId(participant.getId()));
        this.evaluationActivityParticipantService.getActivityIdByParticipantId(participant.getId());
        participantHistory.setEvaluationActivities(this.evaluationActivityService.getEvaluationActivityList(
                this.evaluationActivityParticipantService.getActivityIdByParticipantId(participant.getId())));

        return participantHistory;
    }
}
