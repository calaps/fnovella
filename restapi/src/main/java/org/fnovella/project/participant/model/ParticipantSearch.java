package org.fnovella.project.participant.model;

import org.fnovella.project.participant.repository.ParticipantRepository;
import org.fnovella.project.utility.APIUtility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class ParticipantSearch {
	private String documentValue;
	private String firstName;
	private String appCode;

	public String getDocumentValue() {
		return documentValue;
	}

	public void setDocumentValue(String documentValue) {
		this.documentValue = documentValue;
	}

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getAppCode() {
		return appCode;
	}
	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}
	
	public Page<Participant> getResults(ParticipantRepository participantRepository, Pageable pageable) {
		boolean useDocument = this.documentValue != null && !this.documentValue.trim().equals("");
		boolean useName = APIUtility.isNotNullOrEmpty(this.firstName);
		boolean useAppCode = APIUtility.isNotNullOrEmpty(this.appCode);
		if (useName && useAppCode && useDocument) {
			List<Participant> participants = participantRepository.findByFirstNameStartingWithAndAppCodeAndDocumentValue(this.firstName, this.appCode, this.documentValue);
			return new PageImpl<>(participants, pageable, participants.size());
		} else if (useName && useAppCode) {
			List<Participant> participants = participantRepository.findByFirstNameStartingWithAndAppCode(this.firstName, this.appCode);
			return new PageImpl<>(participants, pageable, participants.size());
		} else if (useName && useDocument) {
			List<Participant> participants = participantRepository.findByFirstNameStartingWithAndDocumentValue(this.firstName, this.documentValue);
			return new PageImpl<>(participants, pageable, participants.size());
		}  else if (useAppCode && useDocument) {
			return participantRepository.findByAppCodeAndDocumentValue(this.appCode, this.documentValue, pageable);
		}  else if (useName) {
			List<Participant> participants = participantRepository.findByFirstNameStartingWith(this.firstName);
			return new PageImpl<>(participants, pageable, participants.size());
		}  else if (useAppCode) {
			return participantRepository.findByAppCode(this.appCode, pageable);
		}  else if (useDocument) {
			return participantRepository.findByDocumentValue(this.documentValue, pageable);
		} else {
			return participantRepository.findAll(pageable);
		}
	}
}