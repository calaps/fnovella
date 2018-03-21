package org.fnovella.project.user.service;

import org.fnovella.project.user.model.AppUser;
import org.fnovella.project.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public AppUser getUserById(final Integer userId) {
        return this.userRepository.findOne(userId);
    }
}
