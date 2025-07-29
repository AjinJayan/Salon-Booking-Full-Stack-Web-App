package com.ajin.booking_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.ajin.booking_service.dto.UserDto;

@FeignClient(name = "USER-SERVICE")
public interface UserFeignClient {

    @GetMapping("/api/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id);

    @GetMapping("/api/users/profile")
    public ResponseEntity<UserDto> getUserProfileInfo(@RequestHeader("Authorization") String jwt);

}
