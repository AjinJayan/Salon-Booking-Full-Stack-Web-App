package com.ajin.review.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.ajin.review.payload.dto.SalonDto;

@FeignClient(name = "SALON-SERVICE")
public interface SalonFeignClient {

    @GetMapping("/api/salons/{id}")
    public ResponseEntity<SalonDto> getSalonById(@PathVariable Long id);

    @GetMapping("/api/salons/owner")
    public ResponseEntity<SalonDto> getSalonByOwnerId(@RequestHeader("Authorization") String jwtToken);
}
