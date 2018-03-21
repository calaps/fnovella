package org.fnovella.project.notification.controller;

import java.util.Arrays;

import org.fnovella.project.notification.service.NotificationService;
import org.fnovella.project.notification.service.RecipientCategory;
import org.fnovella.project.utility.exception.ProcessingException;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification/")
public class EmailNotificationController {

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "evaluations/entry", method = RequestMethod.POST)
    public APIResponse emailNotificationToGroupCoordinator(@RequestHeader("authorization") String authorization,
            @RequestParam("groupId") Integer groupId) {
        try {
            return new APIResponse(
                    this.notificationService.sendEmailNotification(groupId, RecipientCategory.GROUP_COORDINATOR), null);
        } catch (ProcessingException e) {
            return new APIResponse(false, Arrays.asList(e.getMessage()));
        }
    }

    @RequestMapping(value = "evaluations/approval", method = RequestMethod.POST)
    public APIResponse emailNotificationToProgramDirector(@RequestHeader("authorization") String authorization,
            @RequestParam("groupId") Integer groupId) {
        try {
            return new APIResponse(
                    this.notificationService.sendEmailNotification(groupId, RecipientCategory.PROGRAM_DIRECTOR), null);
        } catch (ProcessingException e) {
            return new APIResponse(false, Arrays.asList(e.getMessage()));
        }
    }

    @RequestMapping(value = "evaluations/approval/group", method = RequestMethod.POST)
    public APIResponse emailNotificationToSuperAdministrator(@RequestHeader("authorization") String authorization,
            @RequestParam("groupId") Integer groupId) {
        try {
            return new APIResponse(
                    this.notificationService.sendEmailNotification(groupId, RecipientCategory.SUPER_ADMINISTRATOR),
                    null);
        } catch (ProcessingException e) {
            return new APIResponse(false, Arrays.asList(e.getMessage()));
        }
    }
}
