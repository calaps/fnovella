package org.fnovella.project.instructor.controller;

import java.util.ArrayList;
import java.util.List;

import org.fnovella.project.inscriptions_inst_course.model.InscriptionsInstCourse;
import org.fnovella.project.inscriptions_inst_course.repository.InscriptionsInstCourseRepository;
import org.fnovella.project.instructor.model.Instructor;
import org.fnovella.project.instructor.model.InstructorProgram;
import org.fnovella.project.instructor.model.InstructorSearch;
import org.fnovella.project.instructor.repository.InstructorRepository;
import org.fnovella.project.program_instructor.model.ProgramInstructor;
import org.fnovella.project.program_instructor.repository.ProgramInstructorRepository;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.internet.MimeMessage;

@RestController
@RequestMapping("/instructor/")
public class InstructorController {

	@Autowired
	private InstructorRepository instructorRepository;
	@Autowired
	private InscriptionsInstCourseRepository inscriptionsInstCourseRepository;
	@Autowired
	private ProgramInstructorRepository programInstructorRepository;
	@Autowired
	public JavaMailSender emailSender;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.instructorRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public APIResponse get(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		return new APIResponse(this.instructorRepository.findOne(id), null);
	}
	
	@RequestMapping(value = "search", method = RequestMethod.POST)
	public APIResponse search(@RequestHeader("authorization") String authorization, Pageable pageable, InstructorSearch instructoSearch) {
		return new APIResponse(instructoSearch.getResults(this.instructorRepository, pageable), null);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public APIResponse create(@RequestBody InstructorProgram instructorProgram, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = instructorProgram.validate();
		if (errors.size() == 0) {
			if (this.instructorRepository.findByEmail(instructorProgram.getInstructor().getEmail()) == null) {
				if (this.instructorRepository.findByDocumentValue(instructorProgram.getInstructor().getDocumentValue()) == null) {
					InstructorProgram saved = new InstructorProgram();
					saved.setInstructor(this.instructorRepository.save(instructorProgram.getInstructor()));
					if (instructorProgram.getProgramIds() != null && !instructorProgram.getProgramIds().isEmpty()) {
						for (Integer programId : instructorProgram.getProgramIds()) {
							this.programInstructorRepository.save(new ProgramInstructor(programId, saved.getInstructor().getId()));	
						}
						saved.setProgramIds(instructorProgram.getProgramIds());
					}
					try {
						this.sendCreatedUserEmail(saved.getInstructor());
					} catch (Exception ex) {
						System.out.println("Email was not send, there is an error sending it");
					}
					return new APIResponse(saved, null);
				} else {
					errors.add("Personal Document Number is already in use");
				}				
			} else {
				errors.add("Email is already in use");
			}
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestBody InstructorProgram instructorProgram, @PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = instructorProgram.validate();
		Instructor toUpdate = this.instructorRepository.findOne(id);
		if (toUpdate != null) {
			if ((toUpdate.getEmail().equals(instructorProgram.getInstructor().getEmail())) || 
					(!toUpdate.getEmail().equals(instructorProgram.getInstructor().getEmail()) && this.instructorRepository.findByEmail(instructorProgram.getInstructor().getEmail()) == null)) {

				if ((toUpdate.getDocumentValue().equals(instructorProgram.getInstructor().getDocumentValue())) || 
					(!toUpdate.getDocumentValue().equals(instructorProgram.getInstructor().getDocumentValue()) && this.instructorRepository.findByDocumentValue(instructorProgram.getInstructor().getDocumentValue()) == null)) {

					toUpdate.setUpdateFields(instructorProgram.getInstructor());
					toUpdate = this.instructorRepository.saveAndFlush(toUpdate);
					InstructorProgram saved = new InstructorProgram();
					saved.setInstructor(toUpdate);
					if (!this.programInstructorRepository.findByInstructor(saved.getInstructor().getId()).isEmpty()) {
						this.programInstructorRepository.deleteByInstructor(saved.getInstructor().getId());
					}
					if (instructorProgram.getProgramIds() != null && !instructorProgram.getProgramIds().isEmpty()) {
						for (Integer programId : instructorProgram.getProgramIds()) {
							this.programInstructorRepository.save(new ProgramInstructor(programId, saved.getInstructor().getId()));	
						}
						saved.setProgramIds(instructorProgram.getProgramIds());
					}
					return new APIResponse(saved, null);
				} else {
					errors.add("Personal Document Number is already in use");
				}
			} else {
				errors.add("Email is already in use");
			}
		} else {
			errors.add("Instructor doesn't exist");
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@PathVariable("id") Integer id, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		Instructor toDelete = this.instructorRepository.findOne(id);
		if (toDelete != null) {
			List<InscriptionsInstCourse> list = this.inscriptionsInstCourseRepository.findByInstructorId(id);
			if (list != null && !list.isEmpty())
				this.inscriptionsInstCourseRepository.deleteByInstructorId(id);
			List<ProgramInstructor> programInstructors = this.programInstructorRepository.findByInstructor(id);
			if(programInstructors != null && !programInstructors.isEmpty()){
				this.programInstructorRepository.deleteByInstructor(id);
			}
			this.instructorRepository.delete(toDelete);
			return new APIResponse(true, null);
		}
		errors.add("Instructor doesn't exist");
		return new APIResponse(null, errors);
	}

	private void sendCreatedUserEmail(Instructor appUser) throws Exception {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(appUser.getEmail());
		helper.setText("Hola, <br><br> Tu correo es: " + appUser.getEmail() + " <br>  Y tu contraseña es: " + appUser.getPassword() + "  <br><br> Saludos.", true);
		helper.setSubject("Bienvenido " + appUser.getFirstName());
		emailSender.send(message);
	}

}