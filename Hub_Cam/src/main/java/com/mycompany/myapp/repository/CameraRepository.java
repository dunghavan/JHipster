package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Camera;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Camera entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CameraRepository extends JpaRepository<Camera,Long> {

    //Get all Cameras by Hub Id:
    @Query("SELECT c FROM Camera c WHERE c.hub.id = ?1")
    public List<Camera> getAllCamerasByHubId(Long hubId);


    //Get hubId list by Org Id:
    @Query("SELECT h.id FROM Hub h WHERE h.organization.id = ?1")
    public List<Long> getListHubIdByOrgId(Long orgId);

}
