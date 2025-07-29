package com.ajin.notifications.payload.dto;

import java.time.LocalDateTime;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.ajin.notifications.domain.BookingStatus;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BookingDto {
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double totalPrice;
    private Long customerId;
    private Long salonId;
    private Set<Long> serviceIds;
    private BookingStatus bookingStatus;
    private SalonDto salonDto;
    private Set<ServiceDto> serviceDtos;
}
