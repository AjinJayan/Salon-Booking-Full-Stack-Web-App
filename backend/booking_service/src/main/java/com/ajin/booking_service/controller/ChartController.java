package com.ajin.booking_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.booking_service.client.SalonFeignClient;
import com.ajin.booking_service.dto.SalonDto;
import com.ajin.booking_service.model.Booking;
import com.ajin.booking_service.service.BookingChartService;
import com.ajin.booking_service.service.BookingService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings/chart")
@RequiredArgsConstructor
public class ChartController {
    private final BookingChartService bookingChartService;
    private final BookingService bookingService;
    private final SalonFeignClient salonService;

    @GetMapping("/earnings")
    public ResponseEntity<List<Map<String, Object>>> getEarningsChartData(
            @RequestHeader("Authorization") String jwt) throws Exception {

        // UserDTO user = userService.getUserFromJwtToken(jwt).getBody();

        SalonDto salonDto = salonService.getSalonByOwnerId(jwt).getBody();
        List<Booking> bookings = bookingService.getBookingBySalonId(salonDto.getId());

        // Generate chart data
        List<Map<String, Object>> chartData = bookingChartService
                .generateEarningsChartData(bookings);

        return ResponseEntity.ok(chartData);

    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Map<String, Object>>> getBookingsChartData(
            @RequestHeader("Authorization") String jwt) throws Exception {

        SalonDto salonDto = salonService.getSalonByOwnerId(jwt).getBody();
        List<Booking> bookings = bookingService.getBookingBySalonId(salonDto.getId());
        // Generate chart data
        List<Map<String, Object>> chartData = bookingChartService.generateBookingCountChartData(bookings);

        return ResponseEntity.ok(chartData);

    }
}
