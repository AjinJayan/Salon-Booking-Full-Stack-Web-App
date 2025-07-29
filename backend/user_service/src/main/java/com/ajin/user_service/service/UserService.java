package com.ajin.user_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ajin.user_service.dto.KeycloakUserDto;
import com.ajin.user_service.dto.UserInfoResponse;
import com.ajin.user_service.exception.UserNotFoundException;
import com.ajin.user_service.model.User;
import com.ajin.user_service.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KeyclockService keycloakService;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    public User updateUser(Long id, User user) {
        return userRepository.findById(id).map(user1 -> {
            if (user.getFullName() != null)
                user1.setFullName(user.getFullName());
            if (user.getEmail() != null)
                user1.setEmail(user.getEmail());
            if (user.getPassword() != null) {
                user1.setPassword(user.getPassword());
            }
            if (user.getRole() != null)
                user1.setRole(user.getRole());
            if (user.getPhone() != null)
                user1.setPhone(user.getPhone());
            return userRepository.save(user1);
        }).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    public String deleteUser(Long id) {
        userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        userRepository.deleteById(id);
        return "User Deleted Successfully";
    }

    public User getUserFromJwt(String jwt) {
        UserInfoResponse userInfoResponse = keycloakService.fetchUserProfileByJwt(jwt);

        User user = userRepository.findByEmail(userInfoResponse.getEmail()).orElseThrow(
                () -> new UserNotFoundException("User not found with email: " + userInfoResponse.getEmail()));
        return user;
    }

}
