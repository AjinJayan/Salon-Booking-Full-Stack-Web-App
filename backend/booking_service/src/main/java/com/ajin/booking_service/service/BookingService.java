package com.ajin.booking_service.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import com.ajin.booking_service.client.SalonFeignClient;
import com.ajin.booking_service.client.ServiceOfferingFeignClient;
import com.ajin.booking_service.client.UserFeignClient;
import com.ajin.booking_service.domain.BookingStatus;
import com.ajin.booking_service.dto.BookingDto;
import com.ajin.booking_service.dto.BookingRequest;
import com.ajin.booking_service.dto.SalonDto;
import com.ajin.booking_service.dto.ServiceDto;
import com.ajin.booking_service.dto.UserDto;
import com.ajin.booking_service.mapper.BookingMapper;
import com.ajin.booking_service.model.Booking;
import com.ajin.booking_service.model.PaymentOrder;
import com.ajin.booking_service.model.SalonReport;
import com.ajin.booking_service.repository.BookingRepository;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    SalonFeignClient salonFeignClient;

    @Autowired
    UserFeignClient userFeignClient;

    @Autowired
    ServiceOfferingFeignClient serviceOfferingFeignClient;

    public Booking createBooking(BookingRequest bookingRequest, SalonDto salonDto, UserDto userDto,
            Set<ServiceDto> serviceDto) {

        LocalDateTime bookingStartTime = bookingRequest.getStartTime();
        long totalDuration = serviceDto.stream().mapToLong(ServiceDto::getDuration).sum();
        LocalDateTime bookingEndTime = bookingRequest.getStartTime().plusMinutes(totalDuration);

        bookingRequest.setEndTime(bookingEndTime);

        checkSlotAvaliability(bookingRequest, salonDto);
        Set<Long> salonServiceIds = serviceDto.stream().map(ServiceDto::getId).collect(Collectors.toSet());

        Booking booking = new Booking();
        booking.setCustomerId(userDto.getId());
        booking.setEndTime(bookingEndTime);
        booking.setStartTime(bookingStartTime);
        booking.setTotalPrice(serviceDto.stream().mapToDouble(ServiceDto::getPrice).sum());
        booking.setSalonId(salonDto.getId());
        booking.setServiceIds(salonServiceIds);
        booking.setBookingStatus(BookingStatus.PENDING);
        return bookingRepository.save(booking);
    }

    /**
     * Checks the availability of the booking slot for a given salon and booking
     * request.
     * 
     * Validates that the booking time falls within the salon's working hours.
     * Additionally, it checks if the requested booking slot overlaps with any
     * existing
     * bookings for the salon, throwing a RuntimeException if the slot is
     * unavailable.
     * 
     * @param bookingRequest The booking request containing start and end times.
     * @param salonDto       The salon details containing working hours.
     * @throws RuntimeException if the booking time is outside the salon's working
     *                          hours
     *                          or if the slot is already booked.
     */
    public void checkSlotAvaliability(BookingRequest bookingRequest, SalonDto salonDto) {
        LocalDateTime salonOpenDateTime = salonDto.getOpenTime().atDate(bookingRequest.getStartTime().toLocalDate());
        LocalDateTime salonCloseDateTime = salonDto.getCloseTime().atDate(bookingRequest.getStartTime().toLocalDate());

        if (bookingRequest.getStartTime().isBefore(salonOpenDateTime)
                || bookingRequest.getEndTime().isAfter(salonCloseDateTime))
            throw new RuntimeException("Booking time must be within the salon's working hours.");
        List<Booking> existingBookings = getBookingBySalonId(salonDto.getId());
        for (Booking existingBooking : existingBookings) {
            if (bookingRequest.getStartTime().isBefore(existingBooking.getEndTime())
                    && bookingRequest.getEndTime().isAfter(existingBooking.getStartTime()))
                throw new RuntimeException("The slot is not avaliable, book another slot.");

            if (bookingRequest.getStartTime().isEqual(existingBooking.getStartTime())
                    || bookingRequest.getEndTime().isEqual(existingBooking.getEndTime()))
                throw new RuntimeException("The slot is not avaliable, book another slot.");

        }
    }

    public Set<BookingDto> getBookingByCustomerId(Long customerId) {
        List<Booking> bookings = bookingRepository.findByCustomerId(customerId);
        Set<BookingDto> bookingDtos = bookings.stream().map(booking -> {
            SalonDto salonDto = salonFeignClient.getSalonById(booking.getSalonId()).getBody();
            Set<ServiceDto> serviceDtos = serviceOfferingFeignClient.getServicesByIds(booking.getServiceIds())
                    .getBody();
            BookingDto bookingDto = BookingMapper.toBookingDto(booking, salonDto, serviceDtos);
            return bookingDto;
        }).collect(Collectors.toSet());
        return bookingDtos;
    }

    public List<Booking> getBookingBySalonId(Long salonId) {
        List<Booking> bookings = bookingRepository.findBySalonId(salonId);
        return bookings;
    }

    public BookingDto getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        SalonDto salonDto = salonFeignClient.getSalonById(booking.getSalonId()).getBody();
        Set<ServiceDto> serviceDtos = serviceOfferingFeignClient.getServicesByIds(booking.getServiceIds()).getBody();
        BookingDto bookingDto = BookingMapper.toBookingDto(booking, salonDto, serviceDtos);
        return bookingDto;
    }

    public Booking updateBooking(Long id, BookingStatus bookingStatus) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        booking.setBookingStatus(bookingStatus);
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingByDate(LocalDate date, Long salonId) {
        List<Booking> allBookings = getBookingBySalonId(salonId);

        if (date == null)
            return allBookings;

        List<Booking> filteredBookings = allBookings.stream()
                .filter(booking -> booking.getStartTime().toLocalDate().equals(date))
                .collect(Collectors.toList());
        return filteredBookings;
    }

    public SalonReport getSalonReport(Long salonId) {
        List<Booking> allBookings = getBookingBySalonId(salonId);
        int totalBookings = allBookings.size();
        double totalEarnings = allBookings.stream().mapToDouble(Booking::getTotalPrice).sum();

        List<Booking> cancelledBookings = allBookings.stream()
                .filter(booking -> booking.getBookingStatus().equals(BookingStatus.CANCELLED))
                .collect(Collectors.toList());

        double totalRefund = cancelledBookings.stream().mapToDouble(Booking::getTotalPrice).sum();

        SalonReport newSalonReport = new SalonReport();
        newSalonReport.setCancelledBookings(cancelledBookings.size());
        newSalonReport.setSalonId(salonId);
        newSalonReport.setTotalEarnings(totalEarnings);
        newSalonReport.setTotalBookings(totalBookings);
        newSalonReport.setTotalRefund(totalRefund);

        return newSalonReport;
    }

    public void bookingSuccess(PaymentOrder paymentOrder) {
        updateBooking(paymentOrder.getBookingId(), BookingStatus.CONFIRMED);
    }

}