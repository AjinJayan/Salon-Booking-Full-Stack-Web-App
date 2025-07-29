package com.ajin.user_service.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.ajin.user_service.dto.AuthResponse;
import com.ajin.user_service.dto.SignUpDto;
import com.ajin.user_service.dto.TokenResponse;
import com.ajin.user_service.model.User;
import com.ajin.user_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final KeyclockService keyclockService;
    private final UserRepository userRepository;

    public AuthResponse login(String username, String password) {
        TokenResponse tokenResponse = keyclockService.getAdminAccessToken(username,
                password,
                "password", null);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setRefreshToken(tokenResponse.getRefreshToken());
        authResponse.setMessage("LoggedIn successfully.");
        authResponse.setExpiryIn(tokenResponse.getExpiryIn());
        authResponse.setRefreshExpiryIn(tokenResponse.getRefreshExpiryIn());
        return authResponse;
    }

    public AuthResponse signup(SignUpDto signupDto) {
        keyclockService.createUser(signupDto);

        User user = new User();
        user.setUsername(signupDto.getUsername());
        user.setEmail(signupDto.getEmail());
        user.setPassword(signupDto.getPassword());
        user.setRole(signupDto.getRole());
        user.setFullName(signupDto.getFirstName() + " " + signupDto.getLastName());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        TokenResponse tokenResponse = keyclockService.getAdminAccessToken(signupDto.getUsername(),
                signupDto.getPassword(),
                "password", null);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setRefreshToken(tokenResponse.getRefreshToken());
        authResponse.setUserRole(user.getRole());
        authResponse.setMessage("User Register successfully.");
        authResponse.setExpiryIn(tokenResponse.getExpiryIn());
        authResponse.setRefreshExpiryIn(tokenResponse.getRefreshExpiryIn());
        return authResponse;
    }

    public AuthResponse getAccessTokenFromRefreshToken(String refreshToken) {
        TokenResponse tokenResponse = keyclockService.getAdminAccessToken(null,
                null,
                "refresh_token", refreshToken);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setRefreshToken(tokenResponse.getRefreshToken());
        authResponse.setMessage("LoggedIn successfully.");
        authResponse.setExpiryIn(tokenResponse.getExpiryIn());
        authResponse.setRefreshExpiryIn(tokenResponse.getRefreshExpiryIn());
        return authResponse;
    }
}
