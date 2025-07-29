package com.ajin.category_service.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ajin.category_service.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Set<Category> findBySalonId(Long salonId);

    Optional<Category> findByIdAndSalonId(Long categoryId, Long salonId);

}
