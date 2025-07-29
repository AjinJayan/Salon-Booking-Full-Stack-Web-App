package com.ajin.user_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TokenResponse {
    @JsonProperty("access_token") // it should match exaclty the name in the response
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("scope")
    private String scope;

    @JsonProperty("expires_in")
    private String expiryIn;

    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("refresh_expires_in")
    private String refreshExpiryIn;

}
