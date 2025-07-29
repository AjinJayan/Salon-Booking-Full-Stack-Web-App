package com.ajin.notifications.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ajin.notifications.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

    List<Notification> findByUserId(Long userId);

    List<Notification> findBySalonId(Long salonId);

}
