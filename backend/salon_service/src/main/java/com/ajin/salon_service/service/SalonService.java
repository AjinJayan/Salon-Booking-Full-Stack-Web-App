package com.ajin.salon_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ajin.salon_service.dto.SalonDto;
import com.ajin.salon_service.model.Salon;
import com.ajin.salon_service.repository.SalonRepository;
import com.ajin.salon_service.dto.UserDto;

@Service
public class SalonService {
    @Autowired
    private SalonRepository salonRepository;

    public Salon createSalon(SalonDto salonDto, UserDto userDto) {
        Salon salon = new Salon();
        salon.setName(salonDto.getName());
        salon.setImages(salonDto.getImages());
        salon.setAddress(salonDto.getAddress());
        salon.setPhoneNumber(salonDto.getPhoneNumber());
        salon.setEmail(salonDto.getEmail());
        salon.setCity(salonDto.getCity());
        salon.setOwnerId(userDto.getId());
        salon.setOpenTime(salonDto.getOpenTime());
        salon.setCloseTime(salonDto.getCloseTime());
        return salonRepository.save(salon);
    }

    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    public Salon getSalonById(Long salonId) {
        return salonRepository.findById(salonId).orElseThrow(() -> new RuntimeException("Salon not found"));
    }

    public Salon updateSalon(SalonDto salonDto, UserDto userDto, Long salonId) {
        Salon salon = salonRepository.findById(salonId)
                .orElseThrow(() -> new RuntimeException("Salon not found"));
        // Only the owner of the salon can update it
        if (salon != null && salon.getOwnerId().equals(userDto.getId())) {
            salon.setName(salonDto.getName());
            salon.setImages(salonDto.getImages());
            salon.setAddress(salonDto.getAddress());
            salon.setPhoneNumber(salonDto.getPhoneNumber());
            salon.setEmail(salonDto.getEmail());
            salon.setCity(salonDto.getCity());
            salon.setOwnerId(userDto.getId());
            salon.setOpenTime(salonDto.getOpenTime());
            salon.setCloseTime(salonDto.getCloseTime());
            return salonRepository.save(salon);
        } else
            throw new RuntimeException("Salon not exists or you are not the owner");
    }

    public Salon getSalonByOwnerId(Long ownerId) {
        return salonRepository.findByOwnerId(ownerId).orElseThrow(() -> new RuntimeException("Salon not found"));
    }

    public List<Salon> searchSalon(String keyword) {
        return salonRepository.findByKeyword(keyword);
    }

}
