package com.ajin.booking_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SalonReport {
    private Long salonId;
    private String salonName;
    private Integer totalBookings;
    private Double totalEarnings;
    private Integer cancelledBookings;
    private Double totalRefund; // total refund amount will cbe calculated based on the cancelled bookings

}
