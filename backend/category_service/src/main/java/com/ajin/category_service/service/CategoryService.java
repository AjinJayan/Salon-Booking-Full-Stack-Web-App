package com.ajin.category_service.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ajin.category_service.dto.SalonDto;
import com.ajin.category_service.model.Category;
import com.ajin.category_service.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(Category category, SalonDto salonDto) {
        category.setSalonId(salonDto.getId());
        return categoryRepository.save(category);
    }

    public Set<Category> getCategoriesBySalonId(Long salonId) {
        return categoryRepository.findBySalonId(salonId);
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    public void deleteCategoryById(Long id, Long salonId) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        if (category.getSalonId() != salonId) {
            throw new RuntimeException("you are not authorized to delete this category");
        }
        categoryRepository.deleteById(id);
    }

    public Category findCategoryIdAndSalonId(Long salonId, Long categoryId) {

        return categoryRepository.findByIdAndSalonId(categoryId, salonId)
                .orElseThrow(() -> new RuntimeException(
                        "Category not found with categoryId: " + categoryId + " and salonId: " + salonId));
    }
}
