package com.ajin.user_service.service;

import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.ajin.user_service.dto.Credential;
import com.ajin.user_service.dto.KeycloakRole;
import com.ajin.user_service.dto.KeycloakUserDto;
import com.ajin.user_service.dto.SignUpDto;
import com.ajin.user_service.dto.TokenResponse;
import com.ajin.user_service.dto.UserInfoResponse;
import com.ajin.user_service.dto.UserRequest;

@Service
public class KeyclockService {
    private static final String KEYCLOAK_BASE_URL = "http://localhost:8080";
    private static final String KEYCLOAK_ADMIN_API = KEYCLOAK_BASE_URL + "/admin/realms/master/users";
    private static final String TOKEN_URL = KEYCLOAK_BASE_URL + "/realms/master/protocol/openid-connect/token";
    private static final String CLIENT_ID = "salon-booking-client";
    private static final String CLIENT_SECRET = "rQOKgM4WuKlr0veDTQNr0c4Wv2KtEfi6";
    private static final String GRANT_TYPE = "password";
    private static final String scope = "openid email profile";
    private static final String username = "zosh";
    private static final String password = "admin";
    private static final String client_id = "14e251c3-64a2-488a-a73a-15a1b7e67aed";

    private final RestTemplate restTemplate;

    public KeyclockService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void createUser(SignUpDto signupDto) {

        String ACCESS_TOKEN = getAdminAccessToken(username, password, GRANT_TYPE, null).getAccessToken();
        Credential credential = new Credential();
        credential.setType("password");
        credential.setValue(signupDto.getPassword());
        credential.setTemporary(false);

        UserRequest userRequest = new UserRequest();
        userRequest.setUsername(signupDto.getUsername());
        userRequest.setEmail(signupDto.getEmail());
        userRequest.setFirstName(signupDto.getFirstName());
        userRequest.setLastName(signupDto.getLastName());
        userRequest.setEnabled(true);
        userRequest.setCredentials(List.of(credential));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(ACCESS_TOKEN);
        HttpEntity<UserRequest> requestEntity = new HttpEntity<UserRequest>(userRequest, headers);
        ResponseEntity<String> response = restTemplate.exchange(KEYCLOAK_ADMIN_API, HttpMethod.POST, requestEntity,
                String.class);
        if (response.getStatusCode() == HttpStatus.CREATED) {
            System.out.println("User created successfully");

            KeycloakUserDto user = fetchFirstUserByName(signupDto.getUsername(), ACCESS_TOKEN);
            KeycloakRole role = getRoleByName(client_id, ACCESS_TOKEN, signupDto.getRole().toString());
            assignRoleToUser(client_id, ACCESS_TOKEN, user.getId(), List.of(role));
        } else {
            throw new RuntimeException("User creation failed");
        }

    }

    public TokenResponse getAdminAccessToken(String username, String password, String grantType, String refreshToken) {
        String url = KEYCLOAK_BASE_URL + "/realms/master/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("username", username);
        map.add("password", password);
        map.add("grant_type", grantType);
        map.add("client_id", CLIENT_ID);
        map.add("client_secret", CLIENT_SECRET);
        map.add("scope", scope);
        if (refreshToken != null) {
            map.add("refresh_token", refreshToken);
        }
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(map,
                headers);
        ResponseEntity<TokenResponse> response = restTemplate.exchange(url, HttpMethod.POST,
                requestEntity,
                TokenResponse.class);

        // TokenResponse will filter the required field from the response

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return response.getBody();
        }
        throw new RuntimeException("Failed to get access token");
    }

    public KeycloakRole getRoleByName(String clientId, String token, String role) {
        String url = KEYCLOAK_BASE_URL + "/admin/realms/master/clients/" + clientId + "/roles/" + role;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<Void> requesHttpEntity = new HttpEntity<>(headers);
        ResponseEntity<KeycloakRole> response = restTemplate.exchange(url, HttpMethod.GET, requesHttpEntity,
                KeycloakRole.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return response.getBody();
        }
        throw new RuntimeException("Failed to get role by name");
    }

    public KeycloakUserDto fetchFirstUserByName(String username, String token) {
        String url = KEYCLOAK_BASE_URL + "/admin/realms/master/users?username=" + username;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);
        HttpEntity<Void> requesHttpEntity = new HttpEntity<>(headers);
        ResponseEntity<KeycloakUserDto[]> response = restTemplate.exchange(url, HttpMethod.GET, requesHttpEntity,
                KeycloakUserDto[].class);
        KeycloakUserDto[] users = response.getBody();
        if (users != null && users.length > 0) {
            return users[0];
        }
        throw new RuntimeException("Failed to get user by username: " + username);
    }

    public void assignRoleToUser(String clientId, String token, String userId, List<KeycloakRole> roles) {

        String url = KEYCLOAK_BASE_URL + "/admin/realms/master/users/" + userId + "/role-mappings/clients/" + clientId;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);
        HttpEntity<List<KeycloakRole>> requestEntity = new HttpEntity<List<KeycloakRole>>(roles, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to assign role to user" + e.getMessage());
        }
    }

    public UserInfoResponse fetchUserProfileByJwt(String jwt) {
        String url = KEYCLOAK_BASE_URL + "/realms/master/protocol/openid-connect/userinfo";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", jwt);
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<UserInfoResponse> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity,
                UserInfoResponse.class);
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            System.out.println(response.getBody());
            return response.getBody();
        }
        throw new RuntimeException("Failed to get user profile");
    }

}
