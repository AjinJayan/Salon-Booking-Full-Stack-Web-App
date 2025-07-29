package com.ajin.user_service.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String role;
    private String fullName;
    private String phone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
