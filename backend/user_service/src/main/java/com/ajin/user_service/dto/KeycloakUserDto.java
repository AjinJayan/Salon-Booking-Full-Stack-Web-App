package com.ajin.user_service.dto;

import lombok.Data;

@Data
public class KeycloakUserDto {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
}
