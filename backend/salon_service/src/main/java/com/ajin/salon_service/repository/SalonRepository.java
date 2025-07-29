package com.ajin.salon_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ajin.salon_service.model.Salon;

public interface SalonRepository extends JpaRepository<Salon, Long> {

    Optional<Salon> findByOwnerId(Long ownerId);

    @Query("SELECT s FROM Salon s WHERE"
            + "(LOWER(s.city) LIKE CONCAT('%',  LOWER(:keyword), '%'))"
            + "OR LOWER(s.name) LIKE CONCAT('%', LOWER(:keyword), '%')"
            + "OR LOWER(s.address) LIKE CONCAT('%', LOWER(:keyword), '%')")
    List<Salon> findByKeyword(@Param("keyword") String keyword);

}