package org.fnovella.project.inscriptions_participants.controller;

import org.fnovella.project.inscriptions.model.Inscription;
import org.fnovella.project.inscriptions.repository.InscriptionRepository;
import org.fnovella.project.inscriptions_participants.model.InscriptionParticipant;
import org.fnovella.project.inscriptions_participants.repository.InscriptionParticipantRepository;
import org.fnovella.project.participant.model.Participant;
import org.fnovella.project.participant.repository.ParticipantRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/inscription_participant/")
public class InscriptionParticipantController {

    @Autowired
    private InscriptionParticipantRepository inscriptionParticipantRepository;
    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
        return new APIResponse(this.inscriptionParticipantRepository.findAll(pageable), null);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public APIResponse getOne(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<>();
        InscriptionParticipant inscriptionParticipant = this.inscriptionParticipantRepository.findOne(id);
        if (inscriptionParticipant != null) {
            return new APIResponse(inscriptionParticipant, null);
        }
        errors.add("Inscription Participant doesn't exist");
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "by-inscription/{inscription}", method = RequestMethod.GET)
    public APIResponse getByInscription(@RequestHeader("authorization") String authorization, @PathVariable("inscription") Integer inscription) {
        List<InscriptionParticipant> inscriptionParticipants = this.inscriptionParticipantRepository.findByInscription(inscription);
        return new APIResponse(inscriptionParticipants, null);
    }

    @RequestMapping(value = "by-participant/{participant}", method = RequestMethod.GET)
    public APIResponse getByParticipant(@RequestHeader("authorization") String authorization, @PathVariable("participant") Integer participant) {
        List<InscriptionParticipant> inscriptionParticipants = this.inscriptionParticipantRepository.findByParticipant(participant);
        return new APIResponse(inscriptionParticipants, null);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public APIResponse create(@RequestHeader("authorization") String authorization, @RequestBody InscriptionParticipant inscriptionParticipant) {
        ArrayList<String> errors = inscriptionParticipant.validate();
        if (errors.size() == 0) {
            if (isParticipantExist(inscriptionParticipant, errors) && isInscriptionExist(inscriptionParticipant, errors)) {
                return new APIResponse(this.inscriptionParticipantRepository.save(inscriptionParticipant), null);
            }
        }
        return new APIResponse(null, errors);
    }

    private boolean isInscriptionExist(InscriptionParticipant inscriptionParticipant, ArrayList<String> errors) {
        Inscription inscription = inscriptionRepository.findOne(inscriptionParticipant.getInscription());
        if(inscription == null) errors.add("Inscription doesn't exist");
        return inscription != null;
    }

    private boolean isParticipantExist(InscriptionParticipant inscriptionParticipant, ArrayList<String> errors) {
        Participant participant = participantRepository.findOne(inscriptionParticipant.getParticipant());
        if(participant == null) errors.add("Participant doesn't exist");
        return participant != null;
    }


    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public APIResponse update(@RequestHeader("authorization") String authorization, @RequestBody InscriptionParticipant inscriptionParticipant,
                              @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<>();
        InscriptionParticipant toUpdate = this.inscriptionParticipantRepository.findOne(id);
        if (toUpdate != null) {
            toUpdate.setUpdateFields(inscriptionParticipant);
            return new APIResponse(this.inscriptionParticipantRepository.saveAndFlush(toUpdate), null);
        }
        errors.add("Inscription Participant doesn't exist");
        return new APIResponse(null, errors);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
        ArrayList<String> errors = new ArrayList<>();
        InscriptionParticipant inscriptionParticipant = this.inscriptionParticipantRepository.findOne(id);
        if (inscriptionParticipant != null) {
            this.inscriptionParticipantRepository.delete(inscriptionParticipant);
            return new APIResponse(true, null);
        }
        errors.add("Inscription Participant doesn't exist");
        return new APIResponse(null, errors);
    }

}
