package com.ajin.notifications.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ajin.notifications.payload.dto.NotificationDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RealTimeCommunicationService {

    private final SimpMessagingTemplate template;

    public void sendNotification(NotificationDto notificationDto) {
        // using this endpoint we will get notification in frontend side
        // "/notification/user" + notificationDto.getUserId()
        template.convertAndSend("/notification/user/" + notificationDto.getUserId(), notificationDto);
        template.convertAndSend("/notification/salon/" + notificationDto.getSalonId(), notificationDto);
        ;
    }

}
