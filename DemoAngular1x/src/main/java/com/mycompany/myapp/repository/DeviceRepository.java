package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Device;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.util.Assert;

import javax.persistence.LockModeType;
import java.util.Map;


/**
 * Spring Data JPA repository for the Device entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeviceRepository extends JpaRepository<Device,Long> {

}
