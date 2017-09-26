package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.FirstEntity;

import com.mycompany.myapp.repository.FirstEntityRepository;
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
 * REST controller for managing FirstEntity.
 */
@RestController
@RequestMapping("/api")
public class FirstEntityResource {

    private final Logger log = LoggerFactory.getLogger(FirstEntityResource.class);

    private static final String ENTITY_NAME = "firstEntity";

    private final FirstEntityRepository firstEntityRepository;

    public FirstEntityResource(FirstEntityRepository firstEntityRepository) {
        this.firstEntityRepository = firstEntityRepository;
    }

    /**
     * POST  /first-entities : Create a new firstEntity.
     *
     * @param firstEntity the firstEntity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new firstEntity, or with status 400 (Bad Request) if the firstEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/first-entities")
    @Timed
    public ResponseEntity<FirstEntity> createFirstEntity(@RequestBody FirstEntity firstEntity) throws URISyntaxException {
        log.debug("REST request to save FirstEntity : {}", firstEntity);
        if (firstEntity.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new firstEntity cannot already have an ID")).body(null);
        }
        FirstEntity result = firstEntityRepository.save(firstEntity);
        return ResponseEntity.created(new URI("/api/first-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /first-entities : Updates an existing firstEntity.
     *
     * @param firstEntity the firstEntity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated firstEntity,
     * or with status 400 (Bad Request) if the firstEntity is not valid,
     * or with status 500 (Internal Server Error) if the firstEntity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/first-entities")
    @Timed
    public ResponseEntity<FirstEntity> updateFirstEntity(@RequestBody FirstEntity firstEntity) throws URISyntaxException {
        log.debug("REST request to update FirstEntity : {}", firstEntity);
        if (firstEntity.getId() == null) {
            return createFirstEntity(firstEntity);
        }
        FirstEntity result = firstEntityRepository.save(firstEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, firstEntity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /first-entities : get all the firstEntities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of firstEntities in body
     */
    @GetMapping("/first-entities")
    @Timed
    public List<FirstEntity> getAllFirstEntities() {
        log.debug("REST request to get all FirstEntities");
        return firstEntityRepository.findAll();
    }

    /**
     * GET  /first-entities/:id : get the "id" firstEntity.
     *
     * @param id the id of the firstEntity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the firstEntity, or with status 404 (Not Found)
     */
    @GetMapping("/first-entities/{id}")
    @Timed
    public ResponseEntity<FirstEntity> getFirstEntity(@PathVariable Long id) {
        log.debug("REST request to get FirstEntity : {}", id);
        FirstEntity firstEntity = firstEntityRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(firstEntity));
    }

    /**
     * DELETE  /first-entities/:id : delete the "id" firstEntity.
     *
     * @param id the id of the firstEntity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/first-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteFirstEntity(@PathVariable Long id) {
        log.debug("REST request to delete FirstEntity : {}", id);
        firstEntityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
