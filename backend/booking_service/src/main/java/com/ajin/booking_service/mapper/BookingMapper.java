package com.ajin.booking_service.mapper;

import java.util.Set;

import com.ajin.booking_service.dto.BookingDto;
import com.ajin.booking_service.dto.SalonDto;
import com.ajin.booking_service.dto.ServiceDto;
import com.ajin.booking_service.dto.UserDto;
import com.ajin.booking_service.model.Booking;

public class BookingMapper {
    public static BookingDto toBookingDto(Booking booking, SalonDto salonDto, Set<ServiceDto> serviceDtos) {
        return BookingDto.builder()
                .id(booking.getId())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .totalPrice(booking.getTotalPrice())
                .customerId(booking.getCustomerId())
                .salonId(booking.getSalonId())
                .serviceIds(booking.getServiceIds())
                .bookingStatus(booking.getBookingStatus())
                .salonDto(salonDto)
                .serviceDtos(serviceDtos)
                .build();
    }

    public static BookingDto toBookingDto(Booking booking, UserDto userDto, SalonDto salonDto,  Set<ServiceDto> serviceDtos) {
        return BookingDto.builder()
                .id(booking.getId())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .totalPrice(booking.getTotalPrice())
                .customerId(booking.getCustomerId())
                .salonId(booking.getSalonId())
                .serviceIds(booking.getServiceIds())
                .bookingStatus(booking.getBookingStatus())
                .userDto(userDto)
                .salonDto(salonDto)
                .serviceDtos(serviceDtos)
                .build();
    }

    public static BookingDto toBookingDto(Booking booking) {
        return BookingDto.builder()
                .id(booking.getId())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .totalPrice(booking.getTotalPrice())
                .customerId(booking.getCustomerId())
                .salonId(booking.getSalonId())
                .serviceIds(booking.getServiceIds())
                .bookingStatus(booking.getBookingStatus())
                .build();
    }
}
