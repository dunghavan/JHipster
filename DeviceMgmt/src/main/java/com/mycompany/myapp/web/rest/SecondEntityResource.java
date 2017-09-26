package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.SecondEntity;

import com.mycompany.myapp.repository.SecondEntityRepository;
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
 * REST controller for managing SecondEntity.
 */
@RestController
@RequestMapping("/api")
public class SecondEntityResource {

    private final Logger log = LoggerFactory.getLogger(SecondEntityResource.class);

    private static final String ENTITY_NAME = "secondEntity";

    private final SecondEntityRepository secondEntityRepository;

    public SecondEntityResource(SecondEntityRepository secondEntityRepository) {
        this.secondEntityRepository = secondEntityRepository;
    }

    /**
     * POST  /second-entities : Create a new secondEntity.
     *
     * @param secondEntity the secondEntity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new secondEntity, or with status 400 (Bad Request) if the secondEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/second-entities")
    @Timed
    public ResponseEntity<SecondEntity> createSecondEntity(@RequestBody SecondEntity secondEntity) throws URISyntaxException {
        log.debug("REST request to save SecondEntity : {}", secondEntity);
        if (secondEntity.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new secondEntity cannot already have an ID")).body(null);
        }
        SecondEntity result = secondEntityRepository.save(secondEntity);
        return ResponseEntity.created(new URI("/api/second-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /second-entities : Updates an existing secondEntity.
     *
     * @param secondEntity the secondEntity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated secondEntity,
     * or with status 400 (Bad Request) if the secondEntity is not valid,
     * or with status 500 (Internal Server Error) if the secondEntity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/second-entities")
    @Timed
    public ResponseEntity<SecondEntity> updateSecondEntity(@RequestBody SecondEntity secondEntity) throws URISyntaxException {
        log.debug("REST request to update SecondEntity : {}", secondEntity);
        if (secondEntity.getId() == null) {
            return createSecondEntity(secondEntity);
        }
        SecondEntity result = secondEntityRepository.save(secondEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, secondEntity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /second-entities : get all the secondEntities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of secondEntities in body
     */
    @GetMapping("/second-entities")
    @Timed
    public List<SecondEntity> getAllSecondEntities() {
        log.debug("REST request to get all SecondEntities");
        return secondEntityRepository.findAll();
    }

    /**
     * GET  /second-entities/:id : get the "id" secondEntity.
     *
     * @param id the id of the secondEntity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the secondEntity, or with status 404 (Not Found)
     */
    @GetMapping("/second-entities/{id}")
    @Timed
    public ResponseEntity<SecondEntity> getSecondEntity(@PathVariable Long id) {
        log.debug("REST request to get SecondEntity : {}", id);
        SecondEntity secondEntity = secondEntityRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(secondEntity));
    }

    /**
     * DELETE  /second-entities/:id : delete the "id" secondEntity.
     *
     * @param id the id of the secondEntity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/second-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteSecondEntity(@PathVariable Long id) {
        log.debug("REST request to delete SecondEntity : {}", id);
        secondEntityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
