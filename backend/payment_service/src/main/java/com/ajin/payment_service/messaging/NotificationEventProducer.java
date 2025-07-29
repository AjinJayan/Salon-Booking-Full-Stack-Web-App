package com.ajin.payment_service.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import com.ajin.payment_service.dto.NotificationDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationEventProducer {
    public final RabbitTemplate rabbitTemplate;

    public void sentNotification(Long bookingId, Long userId, Long salonId){
        NotificationDto notificationDto = NotificationDto.builder()
        .bookingId(bookingId)
        .userId(userId)
        .salonId(salonId)
        .isRead(false)
        .type("BOOKING")
        .description("New Booking got confirmed.")
        .build();
        rabbitTemplate.convertAndSend("notification-queue", notificationDto);
    }
}
 