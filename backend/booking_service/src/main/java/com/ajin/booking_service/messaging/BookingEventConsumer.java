package com.ajin.booking_service.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.ajin.booking_service.model.PaymentOrder;
import com.ajin.booking_service.service.BookingService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BookingEventConsumer {

    private final BookingService bookingService;

    @RabbitListener(queues = "booking-queue")
    public void bookingUpdateListener(PaymentOrder paymentOrder){
        bookingService.bookingSuccess(paymentOrder);
    }
}
    