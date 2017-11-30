package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.AccessPoint;

import com.mycompany.myapp.repository.AccessPointRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AccessPoint.
 */
@RestController
@RequestMapping("/api")
public class AccessPointResource {

    private final Logger log = LoggerFactory.getLogger(AccessPointResource.class);

    private static final String ENTITY_NAME = "accessPoint";

    private final AccessPointRepository accessPointRepository;

    public AccessPointResource(AccessPointRepository accessPointRepository) {
        this.accessPointRepository = accessPointRepository;
    }

    /**
     * POST  /access-points : Create a new accessPoint.
     *
     * @param accessPoint the accessPoint to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accessPoint, or with status 400 (Bad Request) if the accessPoint has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/access-points")
    @Timed
    public ResponseEntity<AccessPoint> createAccessPoint(@RequestBody AccessPoint accessPoint) throws URISyntaxException {
        log.debug("REST request to save AccessPoint : {}", accessPoint);
        if (accessPoint.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new accessPoint cannot already have an ID")).body(null);
        }
        AccessPoint result = accessPointRepository.save(accessPoint);
        return ResponseEntity.created(new URI("/api/access-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /access-points : Updates an existing accessPoint.
     *
     * @param accessPoint the accessPoint to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accessPoint,
     * or with status 400 (Bad Request) if the accessPoint is not valid,
     * or with status 500 (Internal Server Error) if the accessPoint couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/access-points")
    @Timed
    public ResponseEntity<AccessPoint> updateAccessPoint(@RequestBody AccessPoint accessPoint) throws URISyntaxException {
        log.debug("REST request to update AccessPoint : {}", accessPoint);
        if (accessPoint.getId() == null) {
            return createAccessPoint(accessPoint);
        }
        AccessPoint result = accessPointRepository.save(accessPoint);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accessPoint.getId().toString()))
            .body(result);
    }

    /**
     * GET  /access-points : get all the accessPoints.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of accessPoints in body
     */
    @GetMapping("/access-points")
    @Timed
    public List<AccessPoint> getAllAccessPoints() {
        log.debug("REST request to get all AccessPoints");
        return accessPointRepository.findAll();
    }

    /**
     * GET  /access-points/:id : get the "id" accessPoint.
     *
     * @param id the id of the accessPoint to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accessPoint, or with status 404 (Not Found)
     */
    @GetMapping("/access-points/{id}")
    @Timed
    public ResponseEntity<AccessPoint> getAccessPoint(@PathVariable Long id) {
        log.debug("REST request to get AccessPoint : {}", id);
        AccessPoint accessPoint = accessPointRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(accessPoint));
    }

    /**
     * DELETE  /access-points/:id : delete the "id" accessPoint.
     *
     * @param id the id of the accessPoint to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/access-points/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccessPoint(@PathVariable Long id) {
        log.debug("REST request to delete AccessPoint : {}", id);
        accessPointRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
