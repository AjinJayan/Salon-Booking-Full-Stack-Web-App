package com.ajin.notifications.payload.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDto {
    private Long id;
    private String type;
    private Boolean isRead=false;
    private Long userId;
    private Long salonId;
    private Long bookingId;
    private String description;
    private LocalDateTime createdAt;
    private BookingDto booking;
}
