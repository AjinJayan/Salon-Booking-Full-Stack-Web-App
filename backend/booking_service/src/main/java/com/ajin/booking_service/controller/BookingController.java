package com.ajin.booking_service.controller;

import java.security.Provider.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.booking_service.model.Booking;
import com.ajin.booking_service.model.SalonReport;
import com.ajin.booking_service.service.BookingService;
import com.ajin.booking_service.client.PaymentFeignClient;
import com.ajin.booking_service.client.SalonFeignClient;
import com.ajin.booking_service.client.ServiceOfferingFeignClient;
import com.ajin.booking_service.client.UserFeignClient;
import com.ajin.booking_service.domain.BookingStatus;
import com.ajin.booking_service.domain.PaymentMethod;
import com.ajin.booking_service.dto.BookingDto;
import com.ajin.booking_service.dto.BookingRequest;
import com.ajin.booking_service.dto.BookingSlotDto;
import com.ajin.booking_service.dto.PaymentLinkResponse;
import com.ajin.booking_service.dto.SalonDto;
import com.ajin.booking_service.dto.UserDto;
import com.ajin.booking_service.mapper.BookingMapper;
import com.ajin.booking_service.dto.ServiceDto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserFeignClient userFeignClient;

    @Autowired
    private SalonFeignClient salonFeignClient;

    @Autowired
    private ServiceOfferingFeignClient serviceOfferingFeignClient;

    @Autowired
    private PaymentFeignClient paymentFeignClient;

    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createBooking(@RequestParam Long salonId,
            @RequestParam PaymentMethod paymentMethod,
            @RequestBody BookingRequest bookingRequest,
            @RequestHeader("Authorization") String jwtToken) {
        // UserDto userDto = new UserDto();
        // userDto.setId(1L);
        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();

        // SalonDto salonDto = new SalonDto();
        // salonDto.setId(1L);
        // salonDto.setOpenTime(LocalTime.of(9, 0));
        // salonDto.setCloseTime(LocalTime.of(17, 0));
        SalonDto salonDto = salonFeignClient.getSalonById(salonId).getBody();

        // Set<ServiceDto> serviceDtoSet = new HashSet<>();
        // ServiceDto serviceDto = new ServiceDto();
        // serviceDto.setId(1L);
        // serviceDto.setDuration(30L);
        // serviceDto.setPrice(100);
        // serviceDto.setName("Haircut");
        // serviceDtoSet.add(serviceDto);
        Set<ServiceDto> serviceDtoSet = serviceOfferingFeignClient
                .getServicesByIds(bookingRequest.getServiceIds()).getBody();
        if (serviceDtoSet.isEmpty())
            throw new RuntimeException("Service not found");

        Booking booking = bookingService.createBooking(bookingRequest, salonDto, userDto, serviceDtoSet);

        PaymentLinkResponse paymentLinkResponse = paymentFeignClient
                .createPaymentLink(BookingMapper.toBookingDto(booking), paymentMethod, jwtToken).getBody();

        return new ResponseEntity<>(paymentLinkResponse, HttpStatus.OK);
    }

    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDto>> getAllBookingsByCustomerId(@RequestHeader("Authorization") String jwtToken) {

        // UserDto userDto = new UserDto();
        // userDto.setId(1L);
        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();
        if (userDto == null) {
            throw new RuntimeException("User not found");
        }
        Set<BookingDto> bookingDtos = bookingService.getBookingByCustomerId(userDto.getId());
        return new ResponseEntity<>(bookingDtos, HttpStatus.OK);
    }

    public Set<BookingDto> getBookingDtos(List<Booking> bookings) {
        return bookings.stream().map(BookingMapper::toBookingDto).collect(Collectors.toSet());
    }

    @GetMapping("/salon")
    public ResponseEntity<Set<BookingDto>> getAllBookingsBySalonId(@RequestHeader("Authorization") String jwtToken) {

        // SalonDto salonDto = new SalonDto();
        // salonDto.setId(1L);
        SalonDto salonDto = salonFeignClient.getSalonByOwnerId(jwtToken).getBody();

        List<Booking> bookings = bookingService.getBookingBySalonId(salonDto.getId());

        Set<BookingDto> bookingDtos = bookings.stream().map(booking -> {
            UserDto userDto = userFeignClient.getUserById(booking.getCustomerId()).getBody();
            Set<ServiceDto> serviceDtos = serviceOfferingFeignClient.getServicesByIds(booking.getServiceIds()).getBody();
            BookingDto bookingDto = BookingMapper.toBookingDto(booking, userDto, salonDto, serviceDtos);
            return bookingDto;
        }).collect(Collectors.toSet());
        return new ResponseEntity<>(bookingDtos, HttpStatus.OK);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long bookingId) {
        return new ResponseEntity<>(bookingService.getBookingById(bookingId),
                HttpStatus.OK);
    }

    @GetMapping("/slots/salon/{salonId}/date")
    public ResponseEntity<Set<BookingSlotDto>> getBookingsBySalonIdAndDate(@PathVariable Long salonId,
            @RequestParam(required = false) LocalDate date) {

        List<Booking> bookings = bookingService.getBookingByDate(date, salonId);
        Set<BookingSlotDto> bookingSlots = bookings.stream().map(booking -> {
            BookingSlotDto bookingSlotDto = new BookingSlotDto();
            bookingSlotDto.setStartTime(booking.getStartTime());
            bookingSlotDto.setEndTime(booking.getEndTime());
            return bookingSlotDto;
        }).collect(Collectors.toSet());
        return new ResponseEntity<>(bookingSlots, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SalonReport> getSalonReport(@RequestHeader("Authorization") String jwtToken) {
        // SalonDto salonDto = new SalonDto();
        // salonDto.setId(1L);
        SalonDto salonDto = salonFeignClient.getSalonByOwnerId(jwtToken).getBody();

        return new ResponseEntity<>(bookingService.getSalonReport(salonDto.getId()), HttpStatus.OK);
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDto> updateBooking(@PathVariable Long bookingId,
            @RequestParam BookingStatus bookingStatus) {
        return new ResponseEntity<>(BookingMapper.toBookingDto(bookingService.updateBooking(bookingId, bookingStatus)),
                HttpStatus.OK);
    }

}
