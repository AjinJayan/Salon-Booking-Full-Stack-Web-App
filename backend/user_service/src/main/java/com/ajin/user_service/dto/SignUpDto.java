package com.ajin.user_service.dto;

import lombok.Data;

@Data
public class SignUpDto {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private UserRole role;
}
