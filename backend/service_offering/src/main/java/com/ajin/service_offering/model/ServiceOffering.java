package com.ajin.service_offering.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "service_offerings")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ServiceOffering {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private Long duration;

    @Column(nullable = false)
    private Long categoryId;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private Long salonId;

}
