package com.ajin.category_service.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.category_service.client.SalonFeignClient;
import com.ajin.category_service.dto.SalonDto;
import com.ajin.category_service.model.Category;
import com.ajin.category_service.service.CategoryService;

@RestController
@RequestMapping("/api/categories/salon-owner")
public class SalonCategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private SalonFeignClient salonFeignClient;

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category,
            @RequestHeader("Authorization") String jwtToken) {
        // SalonDto salonDto = new SalonDto();
        // salonDto.setId(1L);
        SalonDto salonDto = salonFeignClient.getSalonByOwnerId(jwtToken).getBody();
        Category savedCategory = categoryService.createCategory(category, salonDto);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable Long id,
            @RequestHeader("Authorization") String jwtToken) {
        // SalonDto salonDto = new SalonDto();
        // salonDto.setId(1L);

        SalonDto salonDto = salonFeignClient.getSalonByOwnerId(jwtToken).getBody();

        categoryService.deleteCategoryById(id, salonDto.getId());
        return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/salon/{salonId}/category/{categoryId}")
    public ResponseEntity<Category> getCategoryIdAndSalonId(@PathVariable Long salonId,
            @PathVariable Long categoryId) {
        return new ResponseEntity<>(categoryService.findCategoryIdAndSalonId(salonId, categoryId), HttpStatus.OK);
    }

}
