package org.fnovella.project.assistance.controller;

import org.fnovella.project.assistance.model.Assistance;
import org.fnovella.project.assistance.repository.AssistanceRepository;
import org.fnovella.project.inscriptions.model.Inscription;
import org.fnovella.project.inscriptions.repository.InscriptionRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/assistance/")
public class AssistanceController {

    @Autowired
    private AssistanceRepository assistanceRepository;
    @Autowired
    private InscriptionRepository inscriptionRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
        return new APIResponse(this.assistanceRepository.findAll(pageable), null);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
        return new APIResponse(this.assistanceRepository.findOne(id), null);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public APIResponse create(@RequestBody Assistance assistance, @RequestHeader("authorization") String authorization) {
        ArrayList<String> errors = assistance.validate();
        if (errors.size() == 0) {
            Inscription inscription = inscriptionRepository.findOne(assistance.getInscription());
            if (inscription != null) {
                return new APIResponse(this.assistanceRepository.save(assistance), null);
            } else {
                errors.add("Inscription does not exist!");
            }
        }
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public APIResponse update(@RequestBody Assistance assistance, @RequestHeader("authorization") String authorization,
                              @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<String>();
        Assistance toUpdate = this.assistanceRepository.findOne(id);
        if (toUpdate != null) {
            Inscription inscription = inscriptionRepository.findOne(assistance.getInscription());
            toUpdate.setUpdateFields(assistance);
            if (inscription != null) {
                return new APIResponse(this.assistanceRepository.saveAndFlush(toUpdate), null);
            }else {
                errors.add("Inscription doesn't exist");
                return new APIResponse(null, errors);
            }
        }
        errors.add("Assistance doesn't exist");
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
        ArrayList<String> errors = new ArrayList<String>();
        Assistance toDelete = this.assistanceRepository.findOne(id);
        if (toDelete != null) {
            this.assistanceRepository.delete(toDelete);
            return new APIResponse(true, null);
        }
        errors.add("Assistance doesn't exist");
        return new APIResponse(null, errors);
    }
}
