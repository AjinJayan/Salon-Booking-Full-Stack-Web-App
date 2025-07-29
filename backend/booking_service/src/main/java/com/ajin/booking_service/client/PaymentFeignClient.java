package com.ajin.booking_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.ajin.booking_service.domain.PaymentMethod;
import com.ajin.booking_service.dto.BookingDto;
import com.ajin.booking_service.dto.PaymentLinkResponse;

@FeignClient(name = "PAYMENT-SERVICE")
public interface PaymentFeignClient {

    @PostMapping("/api/payment/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@RequestBody BookingDto bookingDto,
            @RequestParam PaymentMethod paymentMethod, @RequestHeader("Authorization") String jwtToken);

}
