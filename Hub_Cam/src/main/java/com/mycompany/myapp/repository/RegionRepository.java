package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Region;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Region entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegionRepository extends JpaRepository<Region,Long> {

    //Get Region by OrgId
    @Query("SELECT r FROM Region r WHERE r.organization.id = ?1")
    public List<Region> getRegionByOrgId(Long orgId);
}
