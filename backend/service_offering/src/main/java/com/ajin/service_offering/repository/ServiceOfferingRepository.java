package com.ajin.service_offering.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ajin.service_offering.model.ServiceOffering;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {

    Set<ServiceOffering> findBySalonId(Long salonId);

}
