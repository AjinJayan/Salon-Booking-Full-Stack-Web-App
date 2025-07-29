package com.ajin.user_service.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String refreshToken;
    private String message;
    private String title;
    private UserRole userRole;
    private String expiryIn;
    private String refreshExpiryIn;

}
