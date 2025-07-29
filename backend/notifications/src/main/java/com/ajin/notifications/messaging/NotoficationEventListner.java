package com.ajin.notifications.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.ajin.notifications.model.Notification;
import com.ajin.notifications.service.NotificationService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotoficationEventListner {

    private final NotificationService notificationService;
    @RabbitListener(queues = "notification-queue")
    public void notificationListner(Notification notification){
        notificationService.createNotification(notification);
    }
}
