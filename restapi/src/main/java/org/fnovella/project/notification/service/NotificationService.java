package org.fnovella.project.notification.service;

import org.fnovella.project.utility.exception.ProcessingException;

public interface NotificationService {
    boolean sendEmailNotification(final Integer groupId, final RecipientCategory recipientCategory) throws ProcessingException;
}
