package com.ajin.payment_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.payment_service.client.UserFeignClient;
import com.ajin.payment_service.domain.PaymentMethod;
import com.ajin.payment_service.dto.BookingDto;
import com.ajin.payment_service.dto.PaymentLinkResponse;
import com.ajin.payment_service.dto.UserDto;
import com.ajin.payment_service.modal.PaymentOrder;
import com.ajin.payment_service.service.PaymentOrderService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

@RestController
@RequestMapping("/api/payment")
public class PaymentControlller {

    @Autowired
    private UserFeignClient userFeignClient;

    @Autowired
    private PaymentOrderService paymentOrderService;

    @PostMapping("/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@RequestBody BookingDto bookingDto,
            @RequestParam PaymentMethod paymentMethod, @RequestHeader("Authorization") String jwtToken)
            throws RazorpayException, StripeException {
        // UserDto userDto = new UserDto();
        // userDto.setId(1L);
        // userDto.setFullName("John Doe");
        // userDto.setEmail("john.doe@example.com");

        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();
        if (userDto == null) {
            throw new RuntimeException("User not found");
        }

        PaymentLinkResponse paymentLinkResponse = paymentOrderService.createOrder(userDto, bookingDto, paymentMethod);
        return ResponseEntity.ok(paymentLinkResponse);
    }

    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<PaymentOrder> getPaymentOrderById(@PathVariable Long paymentOrderId) {
        return ResponseEntity.ok(paymentOrderService.getPaymentOrderById(paymentOrderId));
    }

    @PatchMapping("/proceed")
    public ResponseEntity<Boolean> proceedPayment(@RequestParam String paymentId, @RequestParam String paymentLinkId)
            throws RazorpayException {
        PaymentOrder paymentOrder = paymentOrderService.getPaymentOrderByPaymentLinkId(paymentLinkId);
        return ResponseEntity.ok(paymentOrderService.proceedPayment(paymentOrder, paymentId, paymentLinkId));
    }

}
