package com.ajin.payment_service.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import com.ajin.payment_service.modal.PaymentOrder;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BookingEventProducer {
    public final RabbitTemplate rabbitTemplate;

    public void sentBookingUpdateEvent(PaymentOrder paymentOrder){
        rabbitTemplate.convertAndSend("booking-queue", paymentOrder);
    }
}
