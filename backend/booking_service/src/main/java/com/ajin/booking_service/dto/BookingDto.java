package com.ajin.booking_service.dto;

import java.time.LocalDateTime;
import java.util.Set;

import com.ajin.booking_service.domain.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private UserDto userDto;
    private SalonDto salonDto;
    private Set<ServiceDto> serviceDtos;
}
