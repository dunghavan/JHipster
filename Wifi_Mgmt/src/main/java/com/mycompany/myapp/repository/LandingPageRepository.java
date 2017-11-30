package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LandingPage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the LandingPage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LandingPageRepository extends JpaRepository<LandingPage,Long> {
    
    @Query("select distinct landing_page from LandingPage landing_page left join fetch landing_page.loginTypes")
    List<LandingPage> findAllWithEagerRelationships();

    @Query("select landing_page from LandingPage landing_page left join fetch landing_page.loginTypes where landing_page.id =:id")
    LandingPage findOneWithEagerRelationships(@Param("id") Long id);
    
}
