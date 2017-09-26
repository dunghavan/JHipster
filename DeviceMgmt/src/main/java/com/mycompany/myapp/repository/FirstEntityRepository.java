package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FirstEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FirstEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FirstEntityRepository extends JpaRepository<FirstEntity,Long> {
    
}
