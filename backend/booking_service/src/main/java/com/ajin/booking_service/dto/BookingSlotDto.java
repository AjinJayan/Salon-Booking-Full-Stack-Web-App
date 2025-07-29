package com.ajin.booking_service.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingSlotDto {
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
