package com.ajin.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ajin.review.model.Review;
import com.ajin.review.repository.ReviewRepository;
import com.ajin.review.payload.dto.ReviewRequest;
import com.ajin.review.payload.dto.UserDto;
import com.ajin.review.payload.dto.SalonDto;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review createReview(ReviewRequest reviewRequest, UserDto userDto, SalonDto salonDto){
       Review review = Review.builder()
       .reviewText(reviewRequest.getReviewText())
       .rating(reviewRequest.getRating())
       .userId(userDto.getId())
       .salonId(salonDto.getId())
       .build();
       return reviewRepository.save(review);
    }


    public List<Review> getAllReviewsBySalonId(Long salonId){
        return reviewRepository.findBySalonId(salonId);
    }

    public Review updateReview(ReviewRequest reviewRequest, Long reviewId, Long userId){
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));
        if(review.getUserId() != userId){
            throw new RuntimeException("You are not authorized to update this review");
        }
        review.setReviewText(reviewRequest.getReviewText());
        review.setRating(reviewRequest.getRating());
        return reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId, Long userId){
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));
        if(review.getUserId() != userId){
            throw new RuntimeException("You are not authorized to delete this review");
        }
        reviewRepository.deleteById(review.getId());
    }
    
   
}
