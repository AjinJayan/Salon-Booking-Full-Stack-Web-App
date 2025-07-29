package com.ajin.notifications.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceDto {
    private Long id;
    private String name;
    private String description;
    private int price;
    private Long duration;
    private String image;
    private Long categoryId;
    private Long salonId;
}
