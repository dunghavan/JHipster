package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.LandingPage;

import com.mycompany.myapp.repository.LandingPageRepository;
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
 * REST controller for managing LandingPage.
 */
@RestController
@RequestMapping("/api")
public class LandingPageResource {

    private final Logger log = LoggerFactory.getLogger(LandingPageResource.class);

    private static final String ENTITY_NAME = "landingPage";

    private final LandingPageRepository landingPageRepository;

    public LandingPageResource(LandingPageRepository landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }

    /**
     * POST  /landing-pages : Create a new landingPage.
     *
     * @param landingPage the landingPage to create
     * @return the ResponseEntity with status 201 (Created) and with body the new landingPage, or with status 400 (Bad Request) if the landingPage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/landing-pages")
    @Timed
    public ResponseEntity<LandingPage> createLandingPage(@RequestBody LandingPage landingPage) throws URISyntaxException {
        log.debug("REST request to save LandingPage : {}", landingPage);
        if (landingPage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new landingPage cannot already have an ID")).body(null);
        }
        LandingPage result = landingPageRepository.save(landingPage);
        return ResponseEntity.created(new URI("/api/landing-pages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /landing-pages : Updates an existing landingPage.
     *
     * @param landingPage the landingPage to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated landingPage,
     * or with status 400 (Bad Request) if the landingPage is not valid,
     * or with status 500 (Internal Server Error) if the landingPage couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/landing-pages")
    @Timed
    public ResponseEntity<LandingPage> updateLandingPage(@RequestBody LandingPage landingPage) throws URISyntaxException {
        log.debug("REST request to update LandingPage : {}", landingPage);
        if (landingPage.getId() == null) {
            return createLandingPage(landingPage);
        }
        LandingPage result = landingPageRepository.save(landingPage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, landingPage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /landing-pages : get all the landingPages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of landingPages in body
     */
    @GetMapping("/landing-pages")
    @Timed
    public List<LandingPage> getAllLandingPages() {
        log.debug("REST request to get all LandingPages");
        return landingPageRepository.findAll();
    }

    /**
     * GET  /landing-pages/:id : get the "id" landingPage.
     *
     * @param id the id of the landingPage to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the landingPage, or with status 404 (Not Found)
     */
    @GetMapping("/landing-pages/{id}")
    @Timed
    public ResponseEntity<LandingPage> getLandingPage(@PathVariable Long id) {
        log.debug("REST request to get LandingPage : {}", id);
        LandingPage landingPage = landingPageRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(landingPage));
    }

    /**
     * DELETE  /landing-pages/:id : delete the "id" landingPage.
     *
     * @param id the id of the landingPage to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/landing-pages/{id}")
    @Timed
    public ResponseEntity<Void> deleteLandingPage(@PathVariable Long id) {
        log.debug("REST request to delete LandingPage : {}", id);
        landingPageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
