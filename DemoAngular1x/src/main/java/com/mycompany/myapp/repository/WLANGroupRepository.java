package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WLANGroup;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WLANGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WLANGroupRepository extends JpaRepository<WLANGroup,Long> {
    
}
