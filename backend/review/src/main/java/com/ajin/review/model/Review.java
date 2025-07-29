package com.ajin.review.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Entity
@Table(name = "reviews")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = false)
    private String reviewText;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private Long salonId;  
    @Column(nullable = false)

    @CreationTimestamp
    private LocalDateTime createdAt;

}
