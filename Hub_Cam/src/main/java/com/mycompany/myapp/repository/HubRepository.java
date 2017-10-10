package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Hub;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Hub entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HubRepository extends JpaRepository<Hub,Long> {

    //Get alls hub by OrgId:
    @Query("SELECT h FROM Hub h WHERE h.organization.id = ?1")
    public List<Hub> getHubsByOrgId(Long orgId);
}
