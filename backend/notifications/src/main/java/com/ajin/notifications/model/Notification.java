package com.ajin.notifications.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import com.ajin.notifications.payload.dto.BookingDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notifications")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String type;
    private Boolean isRead= false;
    private Long userId;
    private Long salonId;  
    private Long bookingId;  

    @CreationTimestamp
    private LocalDateTime createdAt;
    private String description;

}
