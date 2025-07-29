package com.ajin.salon_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajin.salon_service.client.UserFeignClient;
import com.ajin.salon_service.dto.SalonDto;
import com.ajin.salon_service.dto.UserDto;
import com.ajin.salon_service.mapper.SalonMapper;
import com.ajin.salon_service.model.Salon;
import com.ajin.salon_service.service.SalonService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/salons")
public class SalonController {

    @Autowired
    private SalonService salonService;

    @Autowired
    private UserFeignClient userFeignClient;

    @PostMapping
    public ResponseEntity<SalonDto> createSalon(@RequestBody SalonDto salonDto,
            @RequestHeader("Authorization") String jwtToken) {
        // UserDto userDto = UserDto.builder().id(1L).build(); // UserId will be in the
        // request header, Header also will
        // have JWT token
        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();
        Salon salon = salonService.createSalon(salonDto, userDto);
        return new ResponseEntity<>(SalonMapper.convertToDto(salon), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SalonDto>> getAllSalons() {
        List<Salon> salons = salonService.getAllSalons();
        List<SalonDto> salonDtoList = salons.stream().map(SalonMapper::convertToDto).collect(Collectors.toList());
        return new ResponseEntity<>(salonDtoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalonDto> getSalonById(@PathVariable Long id) {
        Salon salon = salonService.getSalonById(id);
        return new ResponseEntity<>(SalonMapper.convertToDto(salon), HttpStatus.OK);
    }

    @GetMapping("/owner")
    public ResponseEntity<SalonDto> getSalonByOwnerId(@RequestHeader("Authorization") String jwtToken) {
        // UserDto userDto = UserDto.builder().id(1L).build(); // UserId will be in the
        // request header, Header also will
        // // have JWT token
        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();
        if (userDto == null) {
            throw new RuntimeException("User not found");
        }

        Salon salon = salonService.getSalonByOwnerId(userDto.getId());
        return new ResponseEntity<>(SalonMapper.convertToDto(salon), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SalonDto>> searchSalon(@RequestParam String keyword) {
        List<Salon> salons = salonService.searchSalon(keyword);
        List<SalonDto> salonDtoList = salons.stream().map(SalonMapper::convertToDto).collect(Collectors.toList());
        return new ResponseEntity<>(salonDtoList, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalonDto> updateSalon(@RequestBody SalonDto salonDto,
            @PathVariable Long id, @RequestHeader("Authorization") String jwtToken) {
        // UserDto userDto = UserDto.builder().id(1L).build(); // UserId will be in the
        // request header, Header also will
        // // have JWT token
        UserDto userDto = userFeignClient.getUserProfileInfo(jwtToken).getBody();
        Salon salon = salonService.updateSalon(salonDto, userDto, id);
        return new ResponseEntity<>(SalonMapper.convertToDto(salon), HttpStatus.OK);
    }

}
