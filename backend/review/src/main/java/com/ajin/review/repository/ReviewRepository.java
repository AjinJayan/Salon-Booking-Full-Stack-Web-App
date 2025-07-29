package com.ajin.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ajin.review.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{


    List<Review> findBySalonId(Long salonId);

}
