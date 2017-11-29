package org.fnovella.project.participant_aditional_fields_values.controller;

import java.util.ArrayList;

import org.fnovella.project.participant_aditional_fields_values.model.ParticipantAditionalFieldsValues;
import org.fnovella.project.participant_aditional_fields_values.repository.ParticipantAditionalFieldsValuesRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/participant_aditional_fields_values/")
public class ParticipantAditionalFieldsValuesController {

    @Autowired
    private ParticipantAditionalFieldsValuesRepository participantAditionalFieldsValuesRepository;
    
    @RequestMapping(value = "", method = RequestMethod.GET)
    public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
        return new APIResponse(this.participantAditionalFieldsValuesRepository.findAll(pageable), null);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public APIResponse get(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<String>();
        ParticipantAditionalFieldsValues participantAditionalFieldsValues = this.participantAditionalFieldsValuesRepository.findOne(id);
        if (participantAditionalFieldsValues != null) {
            return new APIResponse(participantAditionalFieldsValues, null);
        }
        errors.add("Participant Aditional Field Value doesn't exist");
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody ParticipantAditionalFieldsValues participantAditionalFieldsValues) {
        ArrayList<String> errors = participantAditionalFieldsValues.validate();
        if (errors.size() == 0) {
            return new APIResponse(this.participantAditionalFieldsValuesRepository.save(participantAditionalFieldsValues), null);
        }
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
        @RequestBody ParticipantAditionalFieldsValues participantAditionalFieldsValues) {
        ArrayList<String> errors = new ArrayList<String>();
        ParticipantAditionalFieldsValues toUpdate = this.participantAditionalFieldsValuesRepository.findOne(id);
        if (toUpdate != null) {
            toUpdate.setUpdateFields(participantAditionalFieldsValues);
            return new APIResponse(this.participantAditionalFieldsValuesRepository.saveAndFlush(toUpdate), null);
        }
        errors.add("Participant Aditional Field Value doesn't exist");
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<String>();
        ParticipantAditionalFieldsValues toDelete = this.participantAditionalFieldsValuesRepository.findOne(id);
        if (toDelete != null) {
            this.participantAditionalFieldsValuesRepository.delete(toDelete);
            return new APIResponse(true, null);
        }
        errors.add("Participant Aditional Field Value doesn't exist");
        return new APIResponse(null, errors);
    }

}