package com.ajin.booking_service.client;

import java.util.Set;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ajin.booking_service.dto.ServiceDto;

@FeignClient(name = "SERVICE-OFFERING")
public interface ServiceOfferingFeignClient {

    @GetMapping("/api/service-offerings/list/{ids}")
    public ResponseEntity<Set<ServiceDto>> getServicesByIds(@PathVariable Set<Long> ids);

}
