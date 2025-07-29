package com.ajin.service_offering.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CategoryDto {
    private Long id;
    private String name;
    private String image;
}
