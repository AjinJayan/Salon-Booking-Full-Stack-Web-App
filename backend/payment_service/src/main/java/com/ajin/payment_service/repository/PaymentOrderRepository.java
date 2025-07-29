package com.ajin.payment_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ajin.payment_service.modal.PaymentOrder;

@Repository
public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {

    Optional<PaymentOrder> findByPaymentLinkId(String paymentLinkId);

}
