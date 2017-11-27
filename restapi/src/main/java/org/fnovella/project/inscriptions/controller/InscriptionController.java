package org.fnovella.project.inscriptions.controller;

import org.fnovella.project.inscriptions.model.Inscription;
import org.fnovella.project.inscriptions.repository.InscriptionRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/inscription/")
public class InscriptionController {

    @Autowired
    private InscriptionRepository inscriptionRepository;


    @RequestMapping(value = "", method = RequestMethod.GET)
    public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
        return new APIResponse(this.inscriptionRepository.findAll(pageable), null);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<>();
        Inscription inscription = this.inscriptionRepository.findOne(id);
        if (inscription != null) {
            return new APIResponse(inscription, null);
        }
        errors.add("Inscription doesn't exist");
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "by-group/{group}", method = RequestMethod.GET)
    public APIResponse getByGroup(@RequestHeader("authorization") String authorization, @PathVariable("group") Integer group) {
        List<Inscription> inscriptions = this.inscriptionRepository.findByGroup(group);
        return new APIResponse(inscriptions, null);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody Inscription inscriptions) {
        ArrayList<String> errors = inscriptions.validate();
        if (errors.size() == 0) {
            return new APIResponse(this.inscriptionRepository.save(inscriptions), null);
        }
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody Inscription inscription,
                              @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<>();
        Inscription toUpdate = this.inscriptionRepository.findOne(id);
        if (toUpdate != null) {
            toUpdate.setUpdateFields(inscription);
            return new APIResponse(this.inscriptionRepository.saveAndFlush(toUpdate), null);
        }
        errors.add("Inscription doesn't exist");
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<>();
        Inscription inscription = this.inscriptionRepository.findOne(id);
        if (inscription != null) {
            this.inscriptionRepository.delete(inscription);
            return new APIResponse(true, null);
        }
        errors.add("Inscription doesn't exist");
        return new APIResponse(null, errors);
    }
}
