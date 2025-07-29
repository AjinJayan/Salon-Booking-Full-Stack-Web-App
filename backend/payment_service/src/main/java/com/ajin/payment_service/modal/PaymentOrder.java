package com.ajin.payment_service.modal;

import com.ajin.payment_service.domain.PaymentMethod;
import com.ajin.payment_service.domain.PaymentOrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payment_order")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private PaymentOrderStatus paymentOrderStatus = PaymentOrderStatus.PENDING;

    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    private String paymentLinkId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long bookingId;

    @Column(nullable = false)
    private Long salonId;
}
