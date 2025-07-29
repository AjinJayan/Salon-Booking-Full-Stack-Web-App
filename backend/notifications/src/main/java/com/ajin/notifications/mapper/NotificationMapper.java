package com.ajin.notifications.mapper;

import com.ajin.notifications.model.Notification;
import com.ajin.notifications.payload.dto.BookingDto;
import com.ajin.notifications.payload.dto.NotificationDto;

public class NotificationMapper {
    public static NotificationDto toNotificationDto(Notification notification, BookingDto bookingDto){
        return NotificationDto.builder()
                .id(notification.getId())
                .type(notification.getType())
                .isRead(notification.getIsRead())
                .userId(notification.getUserId())
                .salonId(notification.getSalonId())
                .bookingId(notification.getBookingId())
                .description(notification.getDescription())
                .createdAt(notification.getCreatedAt())
                .booking(bookingDto)
                .build();
    }

    public static Notification toNotification(NotificationDto notificationDto){
        return Notification.builder()
                .type(notificationDto.getType())
                .isRead(false)
                .userId(notificationDto.getUserId())
                .salonId(notificationDto.getSalonId())
                .bookingId(notificationDto.getBookingId())
                .description(notificationDto.getDescription())
                .build();
    }
}
