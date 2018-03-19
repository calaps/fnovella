package org.fnovella.project.participant.controller;

import org.fnovella.project.catalog_relation_student.repository.CatalogRelationStudentRepository;
import org.fnovella.project.inscriptions_part_course.repository.InscriptionsPartCourseRepository;
import org.fnovella.project.inscriptions_part_grade.repository.InscriptionsPartGradeRepository;
import org.fnovella.project.inscriptions_part_workshop.repository.InscriptionsPartWorkshopRepository;
import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.model.ParticipantSearch;
import org.fnovella.project.participant.repository.ParticipantRepository;
import org.fnovella.project.participant_contacts.repository.ParticipantContactsRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/participant/")
public class ParticipantController {

	public static final String LINE_START_ERROR = "Line ";
	@Autowired
	private ParticipantRepository participantRepository;
	@Autowired
	private CatalogRelationStudentRepository catalogRelationStudentRepository;
	@Autowired
	private ParticipantContactsRepository participantContactsRepository;
	@Autowired
	private InscriptionsPartCourseRepository inscriptionsPartCourseRepository;
	@Autowired
	private InscriptionsPartGradeRepository inscriptionsPartGradeRepository;
	@Autowired
	private InscriptionsPartWorkshopRepository inscriptionsPartWorkshopRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.participantRepository.findAll(pageable), null);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.participantRepository.findOne(id), null);
	}

	@RequestMapping(value = "search", method = RequestMethod.POST)
	public APIResponse search(@RequestHeader("authorization") String authorization, Pageable pageable, ParticipantSearch participantSearch) {
		return new APIResponse(participantSearch.getResults(this.participantRepository, pageable), null);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestBody Participant participant, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = participant.validate();
		if (errors.size() == 0) {
			if (this.participantRepository.findByEmail(participant.getEmail()) == null) {
				return new APIResponse(this.participantRepository.save(participant), null);
			} else {
				errors.add("Email is already in use");
			}
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "load", method = RequestMethod.POST)
	public APIResponse loadMassive(@RequestBody List<Participant> participants, @RequestHeader("authorization") String authorization) {
		final List<String> errors = new ArrayList<>();
		final List<Participant> participantsToBeSaved = new ArrayList<>();
		int indexOfStudent[] = {1};
		participants.stream()
				.forEach(participant -> {
					List<String> errorsOfCurrentParticipant = fetchErrors(participant, indexOfStudent[0]);

					if (errorsOfCurrentParticipant.size() == 0) {
						participantsToBeSaved.add(participant);
					} else {
						errors.addAll(errorsOfCurrentParticipant);
					}
					indexOfStudent[0]++;
				});

		return new APIResponse(saveParticipats(participantsToBeSaved), errors.isEmpty() ? null : errors);
	}

	private Object saveParticipats(List<Participant> participants) {
		if(!participants.isEmpty()){
			return this.participantRepository.save(participants);
		}
		return null;
	}

	private List<String> fetchErrors(Participant participant, int lineIndex) {
		String startIndexError = LINE_START_ERROR + lineIndex + ":";
		List<String> errors = participant.validate()
				.stream()
				.map(error -> startIndexError + error)
				.collect(Collectors.toList());
		Participant participantByEmail = this.participantRepository.findByEmail(participant.getEmail());
		if (participantByEmail != null) {
			errors.add(startIndexError + " Email is already used");
		}
		return errors;
	}

	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@PathVariable("id") Integer id, @RequestBody Participant participant, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Participant toUpdate = this.participantRepository.findOne(id);
		if (toUpdate != null) {
			if ((toUpdate.getEmail().equals(participant.getEmail())) ||
					(!toUpdate.getEmail().equals(participant.getEmail()) && this.participantRepository.findByEmail(participant.getEmail()) == null)) {
				toUpdate.setUpdatedFields(participant);
				toUpdate = this.participantRepository.saveAndFlush(participant);
				return new APIResponse(toUpdate, null);
			} else {
				errors.add("Email is already in use");
			}
		} else {
			errors.add("Participant doesn't exist");
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Participant toDelete = this.participantRepository.findOne(id);
		if (toDelete != null) {
			this.delete(id, true);
			this.participantRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Participant doesn't exist");
		return new APIResponse(null, errors);
	}

	@RequestMapping(value="delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.delete(id, false), null);
	}

	private boolean delete(Integer id, boolean delete) {
		boolean toDelete = true;
		List<?> list = this.catalogRelationStudentRepository.findByIdParticipant(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.catalogRelationStudentRepository.deleteByIdParticipant(id);
			}
		}
		list = this.inscriptionsPartCourseRepository.findByParticipantId(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.inscriptionsPartCourseRepository.deleteByParticipantId(id);
			}
		}
		list = this.inscriptionsPartGradeRepository.findByParticipantId(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.inscriptionsPartGradeRepository.deleteByParticipantId(id);
			}
		}
		list = this.inscriptionsPartWorkshopRepository.findByParticipantId(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.inscriptionsPartWorkshopRepository.deleteByParticipantId(id);
			}
		}
		list = this.participantContactsRepository.findByParticipantId(id);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.participantContactsRepository.deleteByParticipantId(id);
			}
		}
		return toDelete;
	}

}