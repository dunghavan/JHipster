package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Hub;

import com.mycompany.myapp.repository.HubRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Hub.
 */
@RestController
@RequestMapping("/api")
public class HubResource {

    private final Logger log = LoggerFactory.getLogger(HubResource.class);

    private static final String ENTITY_NAME = "hub";

    private final HubRepository hubRepository;

    public HubResource(HubRepository hubRepository) {
        this.hubRepository = hubRepository;
    }

    /**
     * POST  /hubs : Create a new hub.
     *
     * @param hub the hub to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hub, or with status 400 (Bad Request) if the hub has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hubs")
    @Timed
    public ResponseEntity<Hub> createHub(@Valid @RequestBody Hub hub) throws URISyntaxException {
        log.debug("REST request to save Hub : {}", hub);
        if (hub.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new hub cannot already have an ID")).body(null);
        }
        Hub result = hubRepository.save(hub);
        return ResponseEntity.created(new URI("/api/hubs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hubs : Updates an existing hub.
     *
     * @param hub the hub to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hub,
     * or with status 400 (Bad Request) if the hub is not valid,
     * or with status 500 (Internal Server Error) if the hub couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hubs")
    @Timed
    public ResponseEntity<Hub> updateHub(@Valid @RequestBody Hub hub) throws URISyntaxException {
        log.debug("REST request to update Hub : {}", hub);
        if (hub.getId() == null) {
            return createHub(hub);
        }
        Hub result = hubRepository.save(hub);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hub.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hubs : get all the hubs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hubs in body
     */
    @GetMapping("/hubs")
    @Timed
    public List<Hub> getAllHubs() {
        log.debug("REST request to get all Hubs");
        return hubRepository.findAll();
    }


    /**
     * GET  /hubs : get the hubs by orgId
     */
    @GetMapping("/hubs/get-by-org-id")
    @Timed
    public List<Hub> getHubsByOrgId() {
        log.debug("REST request to get Hubs by Org Id");
        Long orgId = SecurityUtils.getCurrentUserOrganizationId();
        return hubRepository.getHubsByOrgId(orgId);
    }


    /**
     * GET  /hubs/:id : get the "id" hub.
     *
     * @param id the id of the hub to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hub, or with status 404 (Not Found)
     */
    @GetMapping("/hubs/{id}")
    @Timed
    public ResponseEntity<Hub> getHub(@PathVariable Long id) {
        log.debug("REST request to get Hub : {}", id);
        Hub hub = hubRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hub));
    }

    /**
     * DELETE  /hubs/:id : delete the "id" hub.
     *
     * @param id the id of the hub to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hubs/{id}")
    @Timed
    public ResponseEntity<Void> deleteHub(@PathVariable Long id) {
        log.debug("REST request to delete Hub : {}", id);
        hubRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
