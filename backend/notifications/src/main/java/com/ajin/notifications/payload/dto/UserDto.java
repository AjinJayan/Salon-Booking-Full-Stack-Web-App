package com.ajin.notifications.payload.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
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
