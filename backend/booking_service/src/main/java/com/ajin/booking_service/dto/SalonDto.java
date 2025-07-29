package com.ajin.booking_service.dto;

import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SalonDto {
    private Long id;
    private String name;
    private List<String> images;
    private String address;
    private String phoneNumber;
    private String email;
    private String city;
    private LocalTime openTime;
    private LocalTime closeTime;
    private Long ownerId;
}
