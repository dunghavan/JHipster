package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WLANConfig;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WLANConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WLANConfigRepository extends JpaRepository<WLANConfig,Long> {
    
}
