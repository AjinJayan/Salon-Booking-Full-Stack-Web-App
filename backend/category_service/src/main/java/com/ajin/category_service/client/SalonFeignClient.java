package com.ajin.category_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestHeader;

import com.ajin.category_service.dto.SalonDto;

@FeignClient(name = "SALON-SERVICE")
public interface SalonFeignClient {

    @GetMapping("/api/salons/owner")
    public ResponseEntity<SalonDto> getSalonByOwnerId(@RequestHeader("Authorization") String jwtToken);

}
