package org.fnovella.project.user.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.mail.internet.MimeMessage;

import org.fnovella.project.instructor.model.Instructor;
import org.fnovella.project.instructor.repository.InstructorRepository;
import org.fnovella.project.program.repository.ProgramRepository;
import org.fnovella.project.program_app_user.repository.ProgramAppUserRepository;
import org.fnovella.project.user.model.AppUser;
import org.fnovella.project.user.model.AppUserSession;
import org.fnovella.project.user.model.Login;
import org.fnovella.project.user.model.LoginResponse;
import org.fnovella.project.user.model.UserEmail;
import org.fnovella.project.user.model.UserPassword;
import org.fnovella.project.user.model.UserSearch;
import org.fnovella.project.user.repository.AppUserRepository;
import org.fnovella.project.user.repository.UserRepository;
import org.fnovella.project.utility.APIUtility;
import org.fnovella.project.utility.model.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/")
public class UserController {

	public static final String LINE_START_ERROR = "Line ";
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AppUserRepository appUserRepository;
	@Autowired
	private InstructorRepository instructorRepository;
	@Autowired
	private ProgramRepository programRepository;
	@Autowired
	private ProgramAppUserRepository programAppUserRepository;
	@Autowired
	public JavaMailSender emailSender;

	@RequestMapping(value = "delete/{id}/check", method = RequestMethod.GET)
	public APIResponse checkDeletion(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		return new APIResponse(this.delete(id, false), null);
	}
	
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public LoginResponse login(@RequestBody Login user) {
		if (APIUtility.isNotNullOrEmpty(user.getEmail())) {
			if (APIUtility.isNotNullOrEmpty(user.getPassword())) {
				AppUser appUser = this.userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword()); 
				if (appUser != null) {
					AppUserSession session = createAppUserSession(appUser);
					this.appUserRepository.save(session);
					return new LoginResponse(appUser, session.getToken(), null);	
				} else {
					Instructor instructor = this.instructorRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
					if (instructor != null) {
						AppUserSession session = new AppUserSession(instructor.getId(), APIUtility.generateHash(), true);
						this.appUserRepository.save(session);
						return new LoginResponse(instructor, session.getToken(), null);
					}
				}
			}
		}
		ArrayList<String> errors = new ArrayList<String>();
		errors.add("There is no user with that data.");
		return new LoginResponse(null, null, errors);
	}
	
	@RequestMapping(value = "signup", method = RequestMethod.POST)
	public LoginResponse singnup(@RequestBody AppUser user, @RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = user.validate();
		if (errors.size() == 0) {
			AppUser appUser = this.userRepository.findByEmail(user.getEmail());
			if (appUser == null) {
				appUser = this.userRepository.save(user);
				AppUserSession session = createAppUserSession(appUser);
				this.appUserRepository.save(session);
				appUser.setPassword("");
				return new LoginResponse(appUser, session.getToken(), null);	
			}
			errors.add("Email is already in use");
		}
		return new LoginResponse(null, null, errors);
	}

	private AppUserSession createAppUserSession(AppUser appUser) {
		return new AppUserSession(appUser.getId(), APIUtility.generateHash(), true);
	}

	@RequestMapping(value = "load", method = RequestMethod.POST)
	public APIResponse loadMassive(@RequestBody List<AppUser> users, @RequestHeader("authorization") String authorization) {
		int lineIndex[] = {1};
		List<AppUser> appUsersToBeSaved = new ArrayList<>();
		List<String> errors = new ArrayList<>();
		users.forEach(user -> {
			List<String> errorsOfCurrentUser = fetchErrors(user, lineIndex[0]);
			if (errorsOfCurrentUser.size() == 0) {
					appUsersToBeSaved.add(user);
			}else {
				errors.addAll(errorsOfCurrentUser);
			}
			lineIndex[0]++;
		});
		return new APIResponse(saveUsers(appUsersToBeSaved), errors.isEmpty()? null : errors);
	}

	private List<String> fetchErrors(AppUser user, int lineIndex) {
		String startIndexError = LINE_START_ERROR + lineIndex + ":";
		List<String> errors = user.validate()
				.stream()
				.map(error -> startIndexError + error)
				.collect(Collectors.toList());

		AppUser appUser = this.userRepository.findByEmail(user.getEmail());
		if (appUser != null) {
			errors.add(startIndexError + " Email is already used");
		}
		return errors;
	}

	private List<AppUser> saveUsers(List<AppUser> users) {
		if(!users.isEmpty()){
			return this.userRepository.save(users);
		}
		return null;
	}


	@RequestMapping(value = "users", method = RequestMethod.GET)
	public APIResponse getAll(@RequestHeader("authorization") String authorization, Pageable pageable) {
		return new APIResponse(this.userRepository.findAll(pageable), null);
	}
	
	@RequestMapping(value = "search", method = RequestMethod.POST)
	public APIResponse search(@RequestHeader("authorization") String authorization, Pageable pageable, UserSearch userSearch) {
		return new APIResponse(userSearch.getResults(this.userRepository, pageable), null);
	}
	
	@RequestMapping(value = "userDetails", method = RequestMethod.GET)
	public APIResponse userDetails(@RequestHeader("authorization") String authorization) {
		AppUser authorizedUser = APIUtility.authorizeAppUser(authorization, this.appUserRepository, this.userRepository);
		authorizedUser.setPassword("");
		return new APIResponse(authorizedUser, null);
	}
	
	@RequestMapping(value = "update/{id}", method = RequestMethod.PATCH)
	public APIResponse update(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
		@RequestBody AppUser user) {
		ArrayList<String> errors = new ArrayList<String>();
		AppUser authorizedUser = APIUtility.authorizeAppUser(authorization, this.appUserRepository, this.userRepository);
		if (authorizedUser != null) {
			AppUser toUpdate = this.userRepository.findOne(id);
			if (toUpdate != null) {
				if ((toUpdate.getEmail().equals(user.getEmail())) || 
						(!toUpdate.getEmail().equals(user.getEmail())) && this.userRepository.findByEmail(user.getEmail()) == null) {
					toUpdate.setUpdateFields(user);
					toUpdate = this.userRepository.saveAndFlush(toUpdate);
					toUpdate.setPassword("");
					return new APIResponse(toUpdate, null);	
				} else {
					errors.add("Email is already in use");
				}
			} else {
				errors.add("User doesn't exist");
			}
		} else {
			errors.add("Not authorizaded");
		}
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
	public APIResponse delete(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id) {
		ArrayList<String> errors = new ArrayList<String>();
		AppUser authorizedUser = APIUtility.authorizeAppUser(authorization, this.appUserRepository, this.userRepository);
		if (authorizedUser != null) {
			AppUser appUser = this.userRepository.findOne(id);
			if (appUser != null) {
				this.delete(appUser.getId(), true);
				this.appUserRepository.deleteByIdAppUser(appUser.getId());
				this.userRepository.delete(appUser);
				return new APIResponse(true, null);
			} else {
				errors.add("User doesn't exist");
			}
		}
		errors.add("Not authorizaded");
		return new APIResponse(null, errors);
	}

	private boolean delete(Integer appUserId, boolean delete) {
		boolean toDelete = true;
		List<?> list = this.programRepository.findByResponsable(appUserId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.programRepository.deleteByResponsable(appUserId);
			}
		}
		list = this.programAppUserRepository.findByAppUser(appUserId);
		if (!list.isEmpty()) {
			toDelete = false;
			if (delete) {
				this.programAppUserRepository.deleteByAppUser(appUserId);
			}
		}
		return toDelete;
	}
	
	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public APIResponse logout(@RequestHeader("authorization") String authorization) {
		ArrayList<String> errors = new ArrayList<String>();
		AppUserSession session = appUserRepository.findByToken(authorization);
			if (session != null) {
				this.appUserRepository.delete(session);
				return new APIResponse(true, null);
			}
		errors.add("Not authorizaded");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "{id}/password", method = RequestMethod.PATCH)
	public APIResponse updatePassword(@RequestHeader("authorization") String authorization, @PathVariable("id") Integer id,
		@RequestBody UserPassword userPassword) {
		ArrayList<String> errors = new ArrayList<String>();
		AppUser toUpdate = this.userRepository.findOne(id);
		if (APIUtility.isNotNullOrEmpty(userPassword.getPassword())) {
			if (toUpdate != null) {
				toUpdate.setPassword(userPassword.getPassword());
				toUpdate = this.userRepository.saveAndFlush(toUpdate);
				return new APIResponse(true, null);
			} else {
				errors.add("User doesn't exist");
			}
		}
		errors.add("Password was not sent");
		return new APIResponse(null, errors);
	}
	
	@RequestMapping(value = "reset_password", method = RequestMethod.POST)
	public APIResponse resetPassword(@RequestBody UserEmail userEmail) {
		ArrayList<String> errors = new ArrayList<String>();
		if (APIUtility.isNotNullOrEmpty(userEmail.getEmail())) {
			AppUser appUser = this.userRepository.findByEmail(userEmail.getEmail());
			if (appUser != null) {
				try {
					sendResetPasswordEmail(appUser);
				} catch (Exception ex) {
					System.out.println("Email was not send, there is an error sending it");
				}
				return new APIResponse(true, null);		
			} else {
				errors.add("There is no user with that email");
			}
		} else {
			errors.add("Email was not sent");
		}
		return new APIResponse(null, errors);
	}

	@RequestMapping(value = "forgot_password", method = RequestMethod.POST)
	public APIResponse forgotPassword(@RequestBody UserEmail userEmail) {
		ArrayList<String> errors = new ArrayList<String>();
		if (APIUtility.isNotNullOrEmpty(userEmail.getEmail())) {
			AppUser appUser = this.userRepository.findByEmail(userEmail.getEmail());
			if (appUser != null) {
				try {
					sendForgotPasswordEmail(appUser);
				} catch (Exception ex) {
					System.out.println("Email was not send, there is an error sending it");
				}
				return new APIResponse(true, null);		
			} else {
				errors.add("There is no user with that email");
			}
		} else {
			errors.add("Email was not sent");
		}
		return new APIResponse(null, errors);
	}

	private void sendResetPasswordEmail(AppUser appUser) throws Exception {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		String password = APIUtility.generateHash();
		helper.setTo(appUser.getEmail());
		helper.setText("Hola, <br><br> Tu contraseña ha sido reiniciada correctamente, tu nueva contraseña es : " + password + "<br><br> Saludos.", true);
		helper.setSubject("Reinicio de Contraseña");
		emailSender.send(message);
		appUser.setPassword(password);
		this.userRepository.saveAndFlush(appUser);
	}

	private void sendForgotPasswordEmail(AppUser appUser) throws Exception {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(appUser.getEmail());
		helper.setText("Hola, <br><br> Tu contraseña es : " + appUser.getPassword() + "<br><br> Saludos.", true);
		helper.setSubject("Contraseña Olvidada");
		emailSender.send(message);
	}
}