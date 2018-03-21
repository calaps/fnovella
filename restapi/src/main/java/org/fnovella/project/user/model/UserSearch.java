package org.fnovella.project.user.model;

import java.util.List;

import org.fnovella.project.user.repository.UserRepository;
import org.fnovella.project.utility.APIUtility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class UserSearch {

    private String documentValue;
    private String firstName;
    private String appCode;
    private String secondName;
    private String firstLastName;
    private String secondLastName;

    public String getDocumentValue() {
        return documentValue;
    }

    public void setDocumentValue(String documentValue) {
        this.documentValue = documentValue;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getAppCode() {
        return appCode;
    }

    public void setAppCode(String appCode) {
        this.appCode = appCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstLastName() {
        return firstLastName;
    }

    public void setFirstLastName(String firstLastName) {
        this.firstLastName = firstLastName;
    }

    public String getSecondLastName() {
        return secondLastName;
    }

    public void setSecondLastName(String secondLastName) {
        this.secondLastName = secondLastName;
    }

    public Page<AppUser> getResults(final UserRepository userRepository, final Pageable pageable) {
        final String firstName = APIUtility.isNotNullOrEmpty(this.firstName) ? this.firstName : "";
        final String secondName = APIUtility.isNotNullOrEmpty(this.secondName) ? this.secondName : "";
        final String firstLastName = APIUtility.isNotNullOrEmpty(this.firstLastName) ? this.firstLastName : "";
        final String secondLastName = APIUtility.isNotNullOrEmpty(this.secondLastName) ? this.secondLastName : "";
        final boolean useDocument = APIUtility.isNotNullOrEmpty(this.documentValue);
        final boolean useAppCode = APIUtility.isNotNullOrEmpty(this.appCode);
        if (useAppCode && useDocument) {
            final List<AppUser> users = userRepository.findByNamesStartingWithAndAppCodeAndDocumentValue(
                    firstName, secondName, firstLastName, secondLastName, this.appCode, this.documentValue);
            return new PageImpl<>(users, pageable, users.size());
        } else if (useAppCode) {
            final List<AppUser> users = userRepository.findByNamesStartingWithAndAppCode(
                    firstName, secondName, firstLastName, secondLastName, this.appCode);
            return new PageImpl<>(users, pageable, users.size());
        } else if (useDocument) {
            final List<AppUser> users = userRepository.findByNamesStartingWithAndDocumentValue(
                    firstName, secondName, firstLastName, secondLastName, this.documentValue);
            return new PageImpl<>(users, pageable, users.size());
        } else {
            final List<AppUser> users = userRepository.findByNamesStartingWith(
                    firstName, secondName, firstLastName, secondLastName);
            return new PageImpl<>(users, pageable, users.size());
        }
    }
}