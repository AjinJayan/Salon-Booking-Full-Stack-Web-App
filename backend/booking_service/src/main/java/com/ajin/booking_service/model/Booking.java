package com.ajin.booking_service.model;

import java.time.LocalDateTime;
import java.util.Set;

import com.ajin.booking_service.domain.BookingStatus;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookings")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long salonId;
    private Long customerId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ElementCollection
    private Set<Long> serviceIds;

    private BookingStatus bookingStatus = BookingStatus.PENDING;
    private Double totalPrice;
}
