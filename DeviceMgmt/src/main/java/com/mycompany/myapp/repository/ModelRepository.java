package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Model;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Model entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModelRepository extends JpaRepository<Model,Long> {
    
}
