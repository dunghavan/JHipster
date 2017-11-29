package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LoginType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LoginType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoginTypeRepository extends JpaRepository<LoginType,Long> {
    
}
