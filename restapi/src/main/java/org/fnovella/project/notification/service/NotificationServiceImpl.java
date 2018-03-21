package org.fnovella.project.notification.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.fnovella.project.group.model.Group;
import org.fnovella.project.group.service.GroupService;
import org.fnovella.project.program.model.Program;
import org.fnovella.project.program.service.ProgramServiceImpl;
import org.fnovella.project.program_activation.model.ProgramActivation;
import org.fnovella.project.program_activation.service.ProgramActivationService;
import org.fnovella.project.user.model.AppUser;
import org.fnovella.project.user.service.UserService;
import org.fnovella.project.utility.EmailUtility;
import org.fnovella.project.utility.exception.ProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProgramActivationService programActivationService;

    @Autowired
    private EmailUtility emailUtility;
    
    @Autowired
    private ProgramServiceImpl programServiceImpl;

    @Override
    public boolean sendEmailNotification(final Integer groupId, final RecipientCategory recipientCategory)
            throws ProcessingException {
        try {
            switch (recipientCategory) {
            case GROUP_COORDINATOR: {
                return emailUtility.sendEmail(this.getEmailOfGroupCoordinator(groupId),
                        "Instructor has entered the notes", "Entry of evaluations");
            }
            case PROGRAM_DIRECTOR: {
                final List<String> emailRecipients = this.getEmailOfProgramDirector(groupId);
                boolean status = false;
                for (final String emailId : emailRecipients) {
                    status = emailUtility.sendEmail(emailId, "Evaluations are approved by the group coordinator",
                            "Evaluations approved");
                    if (!status) {
                        break;
                    }
                }
                return status;
            }
            case SUPER_ADMINISTRATOR: {
                return emailUtility.sendEmail("Pvalenzuela63@gmail.com", "Evaluations have been approved in their entirety for the group",
                        "Evaluations approved");
            }
            default:
                throw new ProcessingException("Unsupported Recipient Category " + recipientCategory.name());
            }
        } catch (ProcessingException e) {
            throw e;
        } catch (Exception e) {
            throw new ProcessingException("Error sending email: " + e.getMessage());
        }
    }

    private List<String> getEmailOfProgramDirector(final Integer groupId) throws ProcessingException {
        final Group group = this.groupService.getByGroupId(groupId);
        final List<String> emailRecipients = new ArrayList<>();
        if (group != null) {
            Program program = this.programServiceImpl.getProgramByGroup(group);
            final List<ProgramActivation> programActivations = this.programActivationService
                    .getProgramActivationByProgramId(program.getId());
            if (programActivations != null && !programActivations.isEmpty()) {
                for (ProgramActivation programActivation : programActivations) {
                    final AppUser appUser = this.userService.getUserById(programActivation.getResponsable());
                    if (appUser != null && appUser.getEmail() != null) {
                        emailRecipients.add(appUser.getEmail());
                    } else {
                        throw new ProcessingException("No User found with Id " + group.getCoordinator());
                    }
                }
            } else {
                throw new ProcessingException(
                        "No Program Activation found with programId " + group.getProgram().getId());
            }
        } else {
            throw new ProcessingException("No Group found with groupId " + groupId);
        }
        return emailRecipients;
    }

    private String getEmailOfGroupCoordinator(final Integer groupId) throws ProcessingException {
        final Group group = this.groupService.getByGroupId(groupId);
        if (group != null && group.getCoordinator() != null) {
            final AppUser user = this.userService.getUserById(group.getCoordinator());
            if (user != null && user.getEmail() != null) {
                return user.getEmail();
            } else {
                if (user == null) {
                    throw new ProcessingException("No User found with Id " + group.getCoordinator());
                } else if (user.getEmail() == null) {
                    throw new ProcessingException("No email found with group co-ordinator " + group.getCoordinator());
                } else {
                    throw new ProcessingException("Error getting group co-ordinator information");
                }
            }
        } else {
            if (group == null) {
                throw new ProcessingException("No Group found with groupId " + groupId);
            } else if (group.getCoordinator() == null) {
                throw new ProcessingException("No Group Coordinator for group with groupId " + groupId);
            } else {
                throw new ProcessingException("Error getting group co-ordinator information");
            }
        }
    }
}
