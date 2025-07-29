package com.ajin.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.ajin.review.service.ReviewService;
import com.ajin.review.payload.dto.ReviewRequest;
import com.ajin.review.client.SalonFeignClient;
import com.ajin.review.client.UserFeignClient;
import com.ajin.review.payload.dto.UserDto;
import com.ajin.review.payload.dto.SalonDto;
import com.ajin.review.model.Review;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserFeignClient userFeignClient;

    @Autowired
    private SalonFeignClient salonFeignClient;

    @PostMapping("/salon/{salonId}")
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest reviewRequest, @RequestHeader("Authorization") String jwtToken, @PathVariable Long salonId){
        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();
        SalonDto salonDto = salonFeignClient.getSalonById(salonId).getBody();
        return new ResponseEntity<>(reviewService.createReview(reviewRequest, userDto, salonDto), HttpStatus.CREATED);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<Review>> getAllReviewsBySalonId(@PathVariable Long salonId){
        return new ResponseEntity<>(reviewService.getAllReviewsBySalonId(salonId), HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId, @RequestHeader("Authorization") String jwtToken){
        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();
        reviewService.deleteReview(reviewId, userDto.getId());
        return new ResponseEntity<>("Review deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId, @RequestBody ReviewRequest reviewRequest, @RequestHeader("Authorization") String jwtToken){
        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();
        Review updatedReview = reviewService.updateReview(reviewRequest, reviewId, userDto.getId());
        return new ResponseEntity<>(updatedReview, HttpStatus.OK);
    }

}
