package com.ajin.salon_service.mapper;

import com.ajin.salon_service.dto.SalonDto;
import com.ajin.salon_service.model.Salon;

public class SalonMapper {
    public static SalonDto convertToDto(Salon salon) {
        SalonDto salonDto = new SalonDto();
        salonDto.setId(salon.getId());
        salonDto.setName(salon.getName());
        salonDto.setImages(salon.getImages());
        salonDto.setAddress(salon.getAddress());
        salonDto.setPhoneNumber(salon.getPhoneNumber());
        salonDto.setEmail(salon.getEmail());
        salonDto.setCity(salon.getCity());
        salonDto.setOpenTime(salon.getOpenTime());
        salonDto.setCloseTime(salon.getCloseTime());
        salonDto.setOwnerId(salon.getOwnerId());
        return salonDto;
    }
}
