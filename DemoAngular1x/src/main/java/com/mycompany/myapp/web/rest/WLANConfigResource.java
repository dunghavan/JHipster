package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.WLANConfig;

import com.mycompany.myapp.repository.WLANConfigRepository;
import com.mycompany.myapp.repository.WLANGroupRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.*;

import org.springframework.security.core.Authentication;


/**
 * REST controller for managing WLANConfig.
 */
@RestController
@RequestMapping("/api")
public class WLANConfigResource {

    private final Logger log = LoggerFactory.getLogger(WLANConfigResource.class);

    private static final String ENTITY_NAME = "wLANConfig";

    private final WLANConfigRepository wLANConfigRepository;

    public WLANConfigResource(WLANConfigRepository wLANConfigRepository) {
        this.wLANConfigRepository = wLANConfigRepository;
    }

    /**
     * POST  /w-lan-configs : Create a new wLANConfig.
     *
     * @param wLANConfig the wLANConfig to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wLANConfig, or with status 400 (Bad Request) if the wLANConfig has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/w-lan-configs")
    @Timed
    public ResponseEntity<WLANConfig> createWLANConfig(@RequestBody WLANConfig wLANConfig) throws URISyntaxException {
        log.debug("REST request to save WLANConfig : {}", wLANConfig);
        if (wLANConfig.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new wLANConfig cannot already have an ID")).body(null);
        }
        WLANConfig result = wLANConfigRepository.save(wLANConfig);
        return ResponseEntity.created(new URI("/api/w-lan-configs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /w-lan-configs : Updates an existing wLANConfig.
     *
     * @param wLANConfig the wLANConfig to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wLANConfig,
     * or with status 400 (Bad Request) if the wLANConfig is not valid,
     * or with status 500 (Internal Server Error) if the wLANConfig couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/w-lan-configs")
    @Timed
    public ResponseEntity<WLANConfig> updateWLANConfig(@RequestBody WLANConfig wLANConfig) throws URISyntaxException {
        log.debug("REST request to update WLANConfig : {}", wLANConfig);
        if (wLANConfig.getId() == null) {
            return createWLANConfig(wLANConfig);
        }
        WLANConfig result = wLANConfigRepository.save(wLANConfig);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wLANConfig.getId().toString()))
            .body(result);
    }


    /**
     * @Dung Add:
     * GET  /w-lan-configs : get all the wLANConfigs by WlanGroup.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of wLANConfigs in body
     */

    @GetMapping("/w-lan-configs/get-by-wlan-group")
    @Timed
    public ResponseEntity<List<WLANConfig>> getWLANConfigsByWlanGroup(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of WLANConfigs by WlanGroup");

        List<Long> listWlanGroupId = wLANConfigRepository.getListWlanGroupId(getCurrentUserId());
        List<WLANConfig> list = new ArrayList<WLANConfig>();
        for (Long id: listWlanGroupId) {
            list.addAll(wLANConfigRepository.getWLANConfigByWLANGroupId(id));
        }
        log.debug("-------------------List WlanGroup id: " + listWlanGroupId.toString());
        Page<WLANConfig> page = new PageImpl<WLANConfig>(list);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/w-lan-configs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    //Method get current userId:
    public Long getCurrentUserId(){
        // Get username logged in via Authenticate:
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return wLANConfigRepository.getUserIdByUserLogin(username);
    }

    /**
     * GET  /w-lan-configs : get all the wLANConfigs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of wLANConfigs in body
     */
    @GetMapping("/w-lan-configs")
    @Timed
    public ResponseEntity<List<WLANConfig>> getAllWLANConfigs(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of WLANConfigs");
        Page<WLANConfig> page = wLANConfigRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/w-lan-configs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /w-lan-configs/:id : get the "id" wLANConfig.
     *
     * @param id the id of the wLANConfig to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wLANConfig, or with status 404 (Not Found)
     */
    @GetMapping("/w-lan-configs/{id}")
    @Timed
    public ResponseEntity<WLANConfig> getWLANConfig(@PathVariable Long id) {
        log.debug("REST request to get WLANConfig : {}", id);
        WLANConfig wLANConfig = wLANConfigRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(wLANConfig));
    }

    /**
     * DELETE  /w-lan-configs/:id : delete the "id" wLANConfig.
     *
     * @param id the id of the wLANConfig to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/w-lan-configs/{id}")
    @Timed
    public ResponseEntity<Void> deleteWLANConfig(@PathVariable Long id) {
        log.debug("REST request to delete WLANConfig : {}", id);
        wLANConfigRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
