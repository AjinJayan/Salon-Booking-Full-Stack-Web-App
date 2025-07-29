package com.ajin.user_service.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.user_service.service.AuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.ajin.user_service.dto.AuthResponse;
import com.ajin.user_service.dto.LoginDto;
import com.ajin.user_service.dto.SignUpDto;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignUpDto signupDto) {
        AuthResponse authResponse = authService.signup(signupDto);
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDto loginDto) {
        AuthResponse authResponse = authService.login(loginDto.getUsername(), loginDto.getPassword());
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @GetMapping("/access-token/refresh-token/{refreshToken}")
    public ResponseEntity<AuthResponse> getAccessTokenFromRefreshToken(@PathVariable String refreshToken) {
        AuthResponse authResponse = authService.getAccessTokenFromRefreshToken(refreshToken);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }
}
