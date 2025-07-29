package com.ajin.user_service.dto;

import java.util.List;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Boolean enabled;
    private List<Credential> credentials;
}
