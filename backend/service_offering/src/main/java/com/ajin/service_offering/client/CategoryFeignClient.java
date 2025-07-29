package com.ajin.service_offering.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ajin.service_offering.dto.CategoryDto;

@FeignClient(name = "CATEGORY-SERVICE")
public interface CategoryFeignClient {

    @GetMapping("/api/categories/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long id);

    @GetMapping("/api/categories/salon-owner/salon/{salonId}/category/{categoryId}")
    public ResponseEntity<CategoryDto> getCategoryIdAndSalonId(@PathVariable Long salonId,
            @PathVariable Long categoryId);

}
