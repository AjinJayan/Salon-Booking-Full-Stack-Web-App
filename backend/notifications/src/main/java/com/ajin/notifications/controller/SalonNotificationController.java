package com.ajin.notifications.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.notifications.service.NotificationService;
import com.ajin.notifications.payload.dto.NotificationDto;
import com.ajin.notifications.mapper.NotificationMapper;
import com.ajin.notifications.model.Notification;   
import com.ajin.notifications.client.BookingFeignClient;
import com.ajin.notifications.payload.dto.BookingDto;

@RestController
@RequestMapping("/api/notifications/salon-owner")
public class SalonNotificationController {
    
    @Autowired
    private NotificationService notificationService;

    @Autowired
    private BookingFeignClient bookingFeignClient;

    @GetMapping("/salon/{salonId}")
    ResponseEntity<List<NotificationDto>> getAllNotificationsBySalonId(@PathVariable Long salonId){
        List<Notification> notifications = notificationService.getAllNotificationsBySalonId(salonId);
        List<NotificationDto> notificationDtos = notifications.stream().map(notification -> {
            try{
                BookingDto bookDto = bookingFeignClient.getBookingById(notification.getBookingId()).getBody();
                return NotificationMapper.toNotificationDto(notification, bookDto);
            }catch (Exception e) {
                throw new RuntimeException("Booking not found");
            }

        }).collect(Collectors.toList());
        return ResponseEntity.ok(notificationDtos);
    }

   
}
