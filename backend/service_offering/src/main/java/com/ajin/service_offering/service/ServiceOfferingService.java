package com.ajin.service_offering.service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ajin.service_offering.dto.CategoryDto;
import com.ajin.service_offering.dto.SalonDto;
import com.ajin.service_offering.dto.ServiceDto;
import com.ajin.service_offering.model.ServiceOffering;
import com.ajin.service_offering.repository.ServiceOfferingRepository;

@Service
public class ServiceOfferingService {
    @Autowired
    private ServiceOfferingRepository serviceOfferingRepository;

    public ServiceOffering createServiceOffering(SalonDto salonDto, ServiceDto serviceDto, CategoryDto categoryDto) {
        ServiceOffering serviceOffering = new ServiceOffering();
        serviceOffering.setSalonId(salonDto.getId());
        serviceOffering.setDescription(serviceDto.getDescription());
        serviceOffering.setDuration(serviceDto.getDuration());
        serviceOffering.setPrice(serviceDto.getPrice());
        serviceOffering.setName(serviceDto.getName());
        serviceOffering.setImage(serviceDto.getImage());
        serviceOffering.setCategoryId(categoryDto.getId());
        return serviceOfferingRepository.save(serviceOffering);
    }

    public ServiceOffering updateServiceOffering(Long id, ServiceOffering serviceOffering) {

        ServiceOffering currentServiceOffering = serviceOfferingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service offering not found with id: " + id));
        currentServiceOffering.setName(serviceOffering.getName());
        currentServiceOffering.setDescription(serviceOffering.getDescription());
        currentServiceOffering.setPrice(serviceOffering.getPrice());
        currentServiceOffering.setDuration(serviceOffering.getDuration());
        currentServiceOffering.setImage(serviceOffering.getImage());
        return serviceOfferingRepository.save(currentServiceOffering);
    }

    public Set<ServiceOffering> getAllServiceBySalonId(Long salonId, Long categoryId) {
        Set<ServiceOffering> services = serviceOfferingRepository.findBySalonId(salonId);
        if (categoryId != null) {
            services = services.stream()
                    .filter(service -> Objects.equals(service.getCategoryId(), categoryId))
                    .collect(Collectors.toSet());
        }
        return services;
    }

    public Set<ServiceOffering> getServicesByIds(Set<Long> ids) {
        List<ServiceOffering> serviceOfferings = serviceOfferingRepository.findAllById(ids);
        return new HashSet<>(serviceOfferings); // Return a HashSet of the service offerings
    }

    public ServiceOffering getServiceById(Long id) {
        return serviceOfferingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service offering not found with id: " + id));
    }
}
