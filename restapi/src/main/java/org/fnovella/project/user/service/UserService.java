package org.fnovella.project.user.service;

import org.fnovella.project.user.model.AppUser;

public interface UserService {
    AppUser getUserById(Integer userId);
}
