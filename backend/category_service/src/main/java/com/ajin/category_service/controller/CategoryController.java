package com.ajin.category_service.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.category_service.model.Category;
import com.ajin.category_service.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/salon/{id}")
    public ResponseEntity<Set<Category>> getCategoriesBySalonId(@PathVariable Long id) {
        return new ResponseEntity<>(categoryService.getCategoriesBySalonId(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return new ResponseEntity<>(categoryService.getCategoryById(id), HttpStatus.OK);
    }

}
