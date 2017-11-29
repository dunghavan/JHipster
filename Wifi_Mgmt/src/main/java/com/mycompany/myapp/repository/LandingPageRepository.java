package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LandingPage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LandingPage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LandingPageRepository extends JpaRepository<LandingPage,Long> {
    
}
