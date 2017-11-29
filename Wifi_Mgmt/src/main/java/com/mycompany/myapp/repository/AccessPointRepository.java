package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AccessPoint;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AccessPoint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccessPointRepository extends JpaRepository<AccessPoint,Long> {
    
}
