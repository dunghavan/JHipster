package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WLANConfig;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the WLANConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WLANConfigRepository extends JpaRepository<WLANConfig,Long> {

    //Select userID by User.login
    @Query("SELECT u.id FROM User u WHERE u.login = ?1")
    public Long getUserIdByUserLogin(String username);

    // Get all WlanGroup's id by current user's id:
    @Query("SELECT w.id FROM WLANGroup w WHERE w.owner.id = ?1")
    public List<Long> getListWlanGroupId(Long currentUserId);

    // Get all WlanConfig belong to list WlanGroup:
    @Query("SELECT w FROM WLANConfig w WHERE w.wlanGroup.id = ?1")
    public List<WLANConfig> getWLANConfigByWLANGroupId(Long wlanGroupId);
}
