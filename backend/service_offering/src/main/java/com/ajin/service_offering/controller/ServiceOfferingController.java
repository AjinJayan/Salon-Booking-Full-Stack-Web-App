package com.ajin.service_offering.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;

import com.ajin.service_offering.model.ServiceOffering;
import com.ajin.service_offering.service.ServiceOfferingService;

@RestController
@RequestMapping("/api/service-offerings")
public class ServiceOfferingController {
    @Autowired
    private ServiceOfferingService serviceOfferingService;

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<Set<ServiceOffering>> getAllServiceBySalonId(@PathVariable Long salonId,
            @RequestParam(required = false) Long categoryId) {
        return new ResponseEntity<>(serviceOfferingService.getAllServiceBySalonId(salonId, categoryId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceOffering> getServiceById(@PathVariable Long id) {
        return new ResponseEntity<>(serviceOfferingService.getServiceById(id), HttpStatus.OK);
    }

    @GetMapping("/list/{ids}")
    public ResponseEntity<Set<ServiceOffering>> getServicesByIds(@PathVariable Set<Long> ids) {
        return new ResponseEntity<>(serviceOfferingService.getServicesByIds(ids), HttpStatus.OK);
    }

}
