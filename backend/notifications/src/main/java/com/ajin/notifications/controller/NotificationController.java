package com.ajin.notifications.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.notifications.service.NotificationService;
import com.ajin.notifications.payload.dto.NotificationDto;
import com.ajin.notifications.mapper.NotificationMapper;
import com.ajin.notifications.model.Notification;
import com.ajin.notifications.client.BookingFeignClient;
import com.ajin.notifications.payload.dto.BookingDto;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private BookingFeignClient bookingFeignClient;

    @PostMapping
    ResponseEntity<NotificationDto> createNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.createNotification(notification));
    }

    @GetMapping("/user/{userId}")
    ResponseEntity<List<NotificationDto>> getAllNotificationsByUserId(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getAllNotificationsByUserId(userId);
        List<NotificationDto> notificationDtos = notifications.stream().map(notification -> {
            try {
                BookingDto bookDto = bookingFeignClient.getBookingById(notification.getBookingId()).getBody();
                return NotificationMapper.toNotificationDto(notification, bookDto);
            } catch (Exception e) {
                throw new RuntimeException("Booking not found");
            }

        }).collect(Collectors.toList());
        return ResponseEntity.ok(notificationDtos);
    }

    @PutMapping("/{notificationId}/read")
    ResponseEntity<NotificationDto> markNotificationAsRead(@PathVariable Long notificationId) {
        Notification notification = notificationService.markNotificationAsRead(notificationId);

        try {
            BookingDto bookDto = bookingFeignClient.getBookingById(notification.getBookingId()).getBody();
            return ResponseEntity.ok(NotificationMapper.toNotificationDto(notification, bookDto));
        } catch (Exception e) {
            throw new RuntimeException("Booking not found");
        }
    }

}
