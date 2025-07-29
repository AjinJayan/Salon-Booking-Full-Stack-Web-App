package com.ajin.service_offering.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.service_offering.client.CategoryFeignClient;
import com.ajin.service_offering.client.SalonFeignClient;
import com.ajin.service_offering.dto.CategoryDto;
import com.ajin.service_offering.dto.SalonDto;
import com.ajin.service_offering.dto.ServiceDto;
import com.ajin.service_offering.model.ServiceOffering;
import com.ajin.service_offering.service.ServiceOfferingService;

@RestController
@RequestMapping("/api/service-offerings/salon-owner")
public class SalonServiceOfferingController {
    @Autowired
    private ServiceOfferingService serviceOfferingService;

    @Autowired
    private SalonFeignClient salonFeignClient;

    @Autowired
    private CategoryFeignClient categoryFeignClient;

    @PostMapping
    public ResponseEntity<ServiceOffering> createSalonServiceOffering(
            @RequestBody ServiceDto serviceDto, @RequestHeader("Authorization") String jwtToken) {
        // SalonDto salonDto = new SalonDto();
        // salonDto.setId(1L);
        SalonDto salonDto = salonFeignClient.getSalonByOwnerId(jwtToken).getBody();

        // CategoryDto categoryDto = new CategoryDto();
        // categoryDto.setId(serviceDto.getCategoryId());
        CategoryDto categoryDto = categoryFeignClient
                .getCategoryIdAndSalonId(salonDto.getId(), serviceDto.getCategoryId()).getBody();

        return new ResponseEntity<>(serviceOfferingService.createServiceOffering(salonDto, serviceDto, categoryDto),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateServiceOffering(@PathVariable Long id,
            @RequestBody ServiceOffering serviceOffering) {
        return new ResponseEntity<>(serviceOfferingService.updateServiceOffering(id, serviceOffering), HttpStatus.OK);
    }

}
