package com.ajin.booking_service.dto;

import java.time.LocalDateTime;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BookingRequest {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Set<Long> serviceIds;
}
