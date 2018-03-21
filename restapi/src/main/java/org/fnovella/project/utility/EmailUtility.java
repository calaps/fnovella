package org.fnovella.project.utility;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.fnovella.project.utility.exception.ProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailUtility {

    @Autowired
    public JavaMailSender emailSender;

    public boolean sendEmail(final String emailRecipient, final String emailText, final String emailSubject)
            throws ProcessingException {
        final MimeMessage message = emailSender.createMimeMessage();
        final MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(emailRecipient);
            helper.setText(emailText, true);
            helper.setSubject(emailSubject);
            emailSender.send(message);
        } catch (MessagingException e) {
            throw new ProcessingException("Error while sending email: " + e.getMessage());
        }
        return true;
    }
}
