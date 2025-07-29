package com.ajin.payment_service.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ajin.payment_service.domain.PaymentMethod;
import com.ajin.payment_service.domain.PaymentOrderStatus;
import com.ajin.payment_service.dto.BookingDto;
import com.ajin.payment_service.dto.UserDto;
import com.ajin.payment_service.messaging.BookingEventProducer;
import com.ajin.payment_service.messaging.NotificationEventProducer;
import com.ajin.payment_service.modal.PaymentOrder;
import com.ajin.payment_service.dto.PaymentLinkResponse;
import com.ajin.payment_service.repository.PaymentOrderRepository;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Service
public class PaymentOrderService {

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Autowired
    private BookingEventProducer bookingEventProducer;

    @Autowired
    private NotificationEventProducer notificationEventProducer;

    // This is the way to inject the values from application.yml
    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    @Value("${razorpay.api.secret}")
    private String razorpayApiSecret;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${stripe.api.secret}")
    private String stripeApiSecret;

    public PaymentLinkResponse createOrder(UserDto userDto, BookingDto bookingDto, PaymentMethod paymentMethod)
            throws RazorpayException, StripeException {
        Double amount = bookingDto.getTotalPrice();
        PaymentOrder paymentOrder = PaymentOrder.builder()
                .amount(amount)
                .paymentMethod(paymentMethod)
                .userId(userDto.getId())
                .bookingId(bookingDto.getId())
                .salonId(bookingDto.getSalonId())
                .paymentOrderStatus(PaymentOrderStatus.PENDING)
                .build();
        PaymentOrder savedPaymentOrder = paymentOrderRepository.save(paymentOrder);

        PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();
        if (paymentMethod == PaymentMethod.RAZORPAY) {
            PaymentLink paymentLink = createRazorpayPaymentLink(userDto, amount, savedPaymentOrder.getId());
            paymentLinkResponse.setPaymentLinkId(paymentLink.get("id"));
            paymentLinkResponse.setPaymentLinkUrl(paymentLink.get("short_url"));

            savedPaymentOrder.setPaymentLinkId(paymentLinkResponse.getPaymentLinkId());
            paymentOrderRepository.save(savedPaymentOrder);

        } else {
            String paymentUrl = createStripePaymentLink(userDto, amount, savedPaymentOrder.getId());
            paymentLinkResponse.setPaymentLinkUrl(paymentUrl);
        }

        return paymentLinkResponse;

    }

    public PaymentOrder getPaymentOrderById(Long id) {
        return paymentOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment order not found with id: " + id));
    }

    public PaymentOrder getPaymentOrderByPaymentLinkId(String paymentLinkId) {
        return paymentOrderRepository.findByPaymentLinkId(paymentLinkId).orElseThrow(
                () -> new RuntimeException("Payment order not found with payment link id: " + paymentLinkId));
    }

    public PaymentLink createRazorpayPaymentLink(UserDto userDto, Double amount, Long orderId)
            throws RazorpayException {
        Double amountInPaise = amount * 100; // we need to give it in paise

        RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey, razorpayApiSecret);
        JSONObject paymemtLinkRequest = new JSONObject();
        paymemtLinkRequest.put("amount", amountInPaise);
        paymemtLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("email", userDto.getEmail());
        customer.put("name", userDto.getFullName());

        paymemtLinkRequest.put("customer", customer);

        // This will help to notfiy the user on email as well, so incase if payment page
        // is closed the user can continue the payment from the email
        JSONObject notify = new JSONObject();
        notify.put("email", true);
        paymemtLinkRequest.put("notify", notify);

        paymemtLinkRequest.put("reminder_enable", true);

        // This page will be created in the frontend
        // upon successfull payment it will be redirected to this page
        paymemtLinkRequest.put("callback_url", "http://localhost:5173/payment-success/" + orderId);
        paymemtLinkRequest.put("callback_method", "get");
        return razorpayClient.paymentLink.create(paymemtLinkRequest);

    }

    public String createStripePaymentLink(UserDto userDto, Double amount, Long orderId) throws StripeException {

        Stripe.apiKey = stripeApiSecret;
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/payment-success/" + orderId)
                .setCancelUrl("http://localhost:5173/payment-failure/" + orderId)
                .addLineItem(
                        SessionCreateParams.LineItem.builder().setQuantity(1L)
                                .setPriceData(SessionCreateParams.LineItem.PriceData.builder().setCurrency("usd")
                                        .setUnitAmount(amount.longValue() * 100)
                                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName("salon appointment booking ").build())
                                        .build())
                                .build())
                .build();

        Session session = Session.create(params);
        return session.getUrl();

    }

    // update the payment status
    public Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId, String paymentLinkId)
            throws RazorpayException {
        if (paymentOrder.getPaymentOrderStatus().equals(PaymentOrderStatus.PENDING)) {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
                RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey, razorpayApiSecret);
                Payment payment = razorpayClient.payments.fetch(paymentId);// fetch the payment details from the razor
                                                                           // pay database4
                Integer amount = payment.get("amount");
                String status = payment.get("status");

                if (status.equals("captured")) {
                    bookingEventProducer.sentBookingUpdateEvent(paymentOrder);
                    notificationEventProducer.sentNotification(paymentOrder.getBookingId(), paymentOrder.getUserId(), paymentOrder.getSalonId());

                    paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
                    paymentOrderRepository.save(paymentOrder);
                    return true;
                    // Here we will produce one event using kafka or rabbitq that update the status
                    // of the booking
                }
                return false;
            } else {
                paymentOrder.setPaymentOrderStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
        }
        return false;
    }
}
