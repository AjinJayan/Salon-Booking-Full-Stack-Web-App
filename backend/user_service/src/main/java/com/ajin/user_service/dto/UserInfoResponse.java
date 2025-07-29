package com.ajin.user_service.dto;

import lombok.Data;

@Data
public class UserInfoResponse {
    private String sub;
    private String email_verified;
    private String name;
    private String given_name;
    private String family_name;
    private String preferred_username;
    private String email;
}
