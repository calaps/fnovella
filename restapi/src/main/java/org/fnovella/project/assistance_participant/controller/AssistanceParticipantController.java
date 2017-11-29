package org.fnovella.project.assistance_participant.controller;

import org.fnovella.project.assistance.model.Assistance;
import org.fnovella.project.assistance.repository.AssistanceRepository;
import org.fnovella.project.assistance_participant.model.AssistanceParticipant;
import org.fnovella.project.assistance_participant.repository.AssistanceParticipantRepository;
import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.repository.ParticipantRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/assistance_participant/")
public class AssistanceParticipantController {

    @Autowired
    private AssistanceParticipantRepository assistanceParticipantRepository;

    @Autowired
    private AssistanceRepository assistanceRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
        return new APIResponse(this.assistanceParticipantRepository.findAll(pageable), null);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
        return new APIResponse(this.assistanceParticipantRepository.findOne(id), null);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public APIResponse create(@RequestBody AssistanceParticipant assistanceParticipant, @RequestHeader("authorization") String authorization) {
        ArrayList<String> errors = assistanceParticipant.validate();

        if (errors.size() == 0) {
            errors = validateRelation(assistanceParticipant);
            if (CollectionUtils.isEmpty(errors)) {
                return new APIResponse(this.assistanceParticipantRepository.save(assistanceParticipant), null);
            }
        }
        return new APIResponse(null, errors);
    }

    private ArrayList<String> validateRelation(@RequestBody AssistanceParticipant assistanceParticipant) {
        ArrayList<String> errors = new ArrayList<>();
        Assistance assistance = assistanceRepository.findOne(assistanceParticipant.getAssistance());
        if (assistance == null) errors.add("Assistance does not exist!");
        Participant participant = participantRepository.findOne(assistanceParticipant.getParticipant());
        if (participant == null) errors.add("Participant does not exist!");
        return errors;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public APIResponse update(@RequestBody AssistanceParticipant assistanceParticipant, @RequestHeader("authorization") String authorization,
                              @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<>();
        AssistanceParticipant toUpdate = this.assistanceParticipantRepository.findOne(id);
        if (toUpdate != null) {
            toUpdate.setUpdateFields(assistanceParticipant);
            errors = validateRelation(assistanceParticipant);
            if (CollectionUtils.isEmpty(errors)) {
                return new APIResponse(this.assistanceParticipantRepository.saveAndFlush(toUpdate), null);
            }
        } else {
            errors.add("AssistanceParticipant doesn't exist");
        }
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
        ArrayList<String> errors = new ArrayList<>();
        AssistanceParticipant toDelete = this.assistanceParticipantRepository.findOne(id);
        if (toDelete != null) {
            this.assistanceParticipantRepository.delete(toDelete);
            return new APIResponse(true, null);
        }
        errors.add("AssistanceParticipant doesn't exist");
        return new APIResponse(null, errors);
    }
}
