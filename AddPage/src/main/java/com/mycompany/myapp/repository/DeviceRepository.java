package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


/**
 * Spring Data JPA repository for the Device entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeviceRepository extends JpaRepository<Device,Long> {
    @Query("SELECT d FROM Device d WHERE LOWER(d.model) = LOWER(:model)")
    public List<Device> find(@Param("model") Integer model);
}
