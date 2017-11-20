package org.fnovella.project.utility;

import org.fnovella.project.user.model.AppUser;
import org.fnovella.project.user.model.AppUserSession;
import org.fnovella.project.user.repository.AppUserRepository;
import org.fnovella.project.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

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

	public static String normalizeText(String text) {
		if (text == null) return null;
		String normalizedText = Normalizer.normalize(text, Normalizer.Form.NFD)
				.replaceAll("[^\\p{ASCII}]", "");
		return normalizedText;
	}

	public static <T> Page<T> mergePages(Page<T> result, Page<T> normalizedResult, Pageable pageable) {
		List<T> resultList = new ArrayList<>();
		resultList.addAll(result.getContent());
		resultList.addAll(normalizedResult.getContent());
		ArrayList<T> listWithoutDuplication = removeDuplication(resultList);
		Page<T> all = new PageImpl<>(listWithoutDuplication, pageable, resultList.size());
		return all;
	}

	private static <T> ArrayList<T> removeDuplication(List<T> resultList) {
		Set<T> currentSet = new LinkedHashSet<>(resultList);
		return new ArrayList<>(currentSet);
	}
}