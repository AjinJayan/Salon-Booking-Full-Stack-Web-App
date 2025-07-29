package com.ajin.notifications.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ajin.notifications.model.Notification;
import com.ajin.notifications.repository.NotificationRepository;
import com.ajin.notifications.payload.dto.BookingDto;
import com.ajin.notifications.payload.dto.NotificationDto;
import com.ajin.notifications.client.BookingFeignClient;
import com.ajin.notifications.mapper.NotificationMapper;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private BookingFeignClient bookingFeignClient;

    @Autowired
    private RealTimeCommunicationService realTimeCommunicationService;

    public NotificationDto createNotification(Notification notification) {
        Notification savedNotification = notificationRepository.save(notification);

        BookingDto bookingDto = bookingFeignClient.getBookingById(notification.getBookingId()).getBody();
        NotificationDto notificationDto = NotificationMapper.toNotificationDto(savedNotification, bookingDto);

        // Once we integrate Websocket we are going to send notification to froentend
        // from here.
        realTimeCommunicationService.sendNotification(notificationDto); // its like when we want to send the
                                                                        // notification
        return notificationDto;
    }
    
    public List<Notification> getAllNotificationsByUserId(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        notifications.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));
        return notifications;
    }

    public List<Notification> getAllNotificationsBySalonId(Long salonId) {
        List<Notification> notifications = notificationRepository.findBySalonId(salonId);
        notifications.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));
        return notifications;
    }

    public Notification markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setIsRead(true);
        return notificationRepository.save(notification);
    }

}
