package org.fnovella.project.utility;

import org.fnovella.project.user.model.AppUser;
import org.fnovella.project.user.model.AppUserSession;
import org.fnovella.project.user.repository.AppUserRepository;
import org.fnovella.project.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class APIUtility {
	
	public static boolean isNotNullOrEmpty(String string) {
		return string != null && string.trim() != "";
	}
	
	public static String generateHash() {
		return new RandomString().nextString();
	}
	
	public static void copyProperties(Object source, Object target) {
		BeanUtils.copyProperties(source, target);
	}
	
	public static AppUser authorizeAppUser(String authorization, AppUserRepository appUserRepository, UserRepository userRepository) {
		if (authorization != null) {
			AppUserSession session = appUserRepository.findByToken(authorization);
			if (session != null) {
				AppUser appUser = userRepository.findOne(session.getIdAppUser());
				if (appUser != null) {
					return appUser;
				}
			}
		}
		return null;
	}

	public static Integer participantOperation(EntityManager em, String type, Integer idGroup) {
		StoredProcedureQuery query = em.createStoredProcedureQuery("assistances_percentages");
		query.registerStoredProcedureParameter("group_id", Integer.class, ParameterMode.IN);
		query.registerStoredProcedureParameter("participation_type", String.class, ParameterMode.IN);
		query.registerStoredProcedureParameter("percentage", Integer.class, ParameterMode.OUT);
		query.setParameter("participation_type", type);
		query.setParameter("group_id", idGroup);
		query.execute();
		Integer percentage = (Integer) query.getOutputParameterValue("percentage");
		return percentage != null ? percentage : 0;
	}

}