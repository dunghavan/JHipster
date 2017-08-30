package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WLANGroup;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the WLANGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WLANGroupRepository extends JpaRepository<WLANGroup,Long> {

    //Demo method
    @Query("SELECT w FROM WLANGroup w WHERE w.ssid = ?1")
    public List<WLANGroup> customMethod(String ssid);

    // Select WLANGroup by userID
    @Query("SELECT w FROM WLANGroup w WHERE w.owner.id = ?1")
    public List<WLANGroup> getWLANGroupByUserId(Long userId);

    //Select userID by User.login
    @Query("SELECT u.id FROM User u WHERE u.login = ?1")
    public Long getUserIdByUserLogin(String username);
}
