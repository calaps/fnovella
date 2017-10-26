package org.fnovella.project.aspect;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.fnovella.project.utility.APIAuthorization;
import org.fnovella.project.utility.APIUtility;
import org.fnovella.project.utility.exception.NotAuthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@Aspect
public class AuthorizeAspect {
	
	@Autowired
	private APIAuthorization apiAuthorization;
	
	@Before("execution(* org.fnovella.project.user.controller.UserController.singnup(..)) "
			+ "|| execution(* org.fnovella.project.user.controller.UserController.userDetails(..)) "
			+ "|| execution(* org.fnovella.project.user.controller.UserController.update(..)) "
			+ "|| execution(* org.fnovella.project.user.controller.UserController.delete(..)) "
			+ "|| execution(* org.fnovella.project.user.controller.UserController.getAll(..)) "
			+ "|| execution(* org.fnovella.project.user.controller.UserController.logout(..)) "
			+ "|| execution(* org.fnovella.project.catalog.controller.CatalogController.*(..)) "
			+ "|| execution(* org.fnovella.project.instructor.controller.IntructorController.*(..)) "
			+ "|| execution(* org.fnovella.project.participant.controller.ParticipantController.*(..)) "
			+ "|| execution(* org.fnovella.project.privilege.controller.PrivilegeController.*(..)) "
			+ "|| execution(* org.fnovella.project.program.controller.ProgramController.*(..)) "
			+ "|| execution(* org.fnovella.project.location.controller.LocationController.*(..)) "
			+ "|| execution(* org.fnovella.project.course.controller.CourseController.*(..)) "
			+ "|| execution(* org.fnovella.project.grade.controller.GradeController.*(..)) "
			+ "|| execution(* org.fnovella.project.evaluation.controller.EvaluationController.*(..)) "
			+ "|| execution(* org.fnovella.project.workshop.controller.WorkshopController.*(..)) "
			+ "|| execution(* org.fnovella.project.inscriptions_inst_course.controller.InscriptionsInstCourseController.*(..))"
			+ "|| execution(* org.fnovella.project.inscriptions_inst_grade.controller.InscriptionsInstGradeController.*(..))"
			+ "|| execution(* org.fnovella.project.inscriptions_inst_workshop.controller.InscriptionsInstWorkshopController.*(..)) "
			+ "|| execution(* org.fnovella.project.inscriptions_part_course.controller.InscriptionsPartCourseController.*(..))"
			+ "|| execution(* org.fnovella.project.inscriptions_part_grade.controller.InscriptionsPartGradeController.*(..))"
			+ "|| execution(* org.fnovella.project.inscriptions_part_workshop.controller.InscriptionsPartWorkshopController.*(..))"
			+ "|| execution(* org.fnovella.project.dashboard.controller.DashboardController.*(..))"
			+ "|| execution(* org.fnovella.project.category.controller.CategoryController.*(..))")
	public void authorizeUser(JoinPoint joinPoint) throws NotAuthorizedException {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		if (request != null) {
			String authToken = request.getHeader("authorization");
			if (APIUtility.isNotNullOrEmpty(authToken)) {
				if (this.apiAuthorization.isAuthorized(authToken)) {
					return;
				}
			}
		}
		throw new NotAuthorizedException();
	}
	
}