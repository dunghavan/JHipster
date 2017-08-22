package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.WLANGroup;

import com.mycompany.myapp.repository.WLANGroupRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing WLANGroup.
 */
@RestController
@RequestMapping("/api")
public class WLANGroupResource {

    private final Logger log = LoggerFactory.getLogger(WLANGroupResource.class);

    private static final String ENTITY_NAME = "wLANGroup";

    private final WLANGroupRepository wLANGroupRepository;

    public WLANGroupResource(WLANGroupRepository wLANGroupRepository) {
        this.wLANGroupRepository = wLANGroupRepository;
    }

    /**
     * POST  /w-lan-groups : Create a new wLANGroup.
     *
     * @param wLANGroup the wLANGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wLANGroup, or with status 400 (Bad Request) if the wLANGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/w-lan-groups")
    @Timed
    public ResponseEntity<WLANGroup> createWLANGroup(@RequestBody WLANGroup wLANGroup) throws URISyntaxException {
        log.debug("REST request to save WLANGroup : {}", wLANGroup);
        if (wLANGroup.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new wLANGroup cannot already have an ID")).body(null);
        }
        WLANGroup result = wLANGroupRepository.save(wLANGroup);
        return ResponseEntity.created(new URI("/api/w-lan-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /w-lan-groups : Updates an existing wLANGroup.
     *
     * @param wLANGroup the wLANGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wLANGroup,
     * or with status 400 (Bad Request) if the wLANGroup is not valid,
     * or with status 500 (Internal Server Error) if the wLANGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/w-lan-groups")
    @Timed
    public ResponseEntity<WLANGroup> updateWLANGroup(@RequestBody WLANGroup wLANGroup) throws URISyntaxException {
        log.debug("REST request to update WLANGroup : {}", wLANGroup);
        if (wLANGroup.getId() == null) {
            return createWLANGroup(wLANGroup);
        }
        WLANGroup result = wLANGroupRepository.save(wLANGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wLANGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /w-lan-groups : get all the wLANGroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of wLANGroups in body
     */
    @GetMapping("/w-lan-groups")
    @Timed
    public ResponseEntity<List<WLANGroup>> getAllWLANGroups(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of WLANGroups");
        Page<WLANGroup> page = wLANGroupRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/w-lan-groups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /w-lan-groups/:id : get the "id" wLANGroup.
     *
     * @param id the id of the wLANGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wLANGroup, or with status 404 (Not Found)
     */
    @GetMapping("/w-lan-groups/{id}")
    @Timed
    public ResponseEntity<WLANGroup> getWLANGroup(@PathVariable Long id) {
        log.debug("REST request to get WLANGroup : {}", id);
        WLANGroup wLANGroup = wLANGroupRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(wLANGroup));
    }

    /**
     * DELETE  /w-lan-groups/:id : delete the "id" wLANGroup.
     *
     * @param id the id of the wLANGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/w-lan-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteWLANGroup(@PathVariable Long id) {
        log.debug("REST request to delete WLANGroup : {}", id);
        wLANGroupRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
