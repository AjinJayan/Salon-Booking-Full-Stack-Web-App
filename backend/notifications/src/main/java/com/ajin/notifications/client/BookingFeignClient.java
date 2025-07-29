package com.ajin.notifications.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ajin.notifications.payload.dto.BookingDto;

@FeignClient(name = "BOOKING-SERVICE")
public interface BookingFeignClient {
    
    @GetMapping("/api/bookings/{bookingId}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long bookingId);

}
