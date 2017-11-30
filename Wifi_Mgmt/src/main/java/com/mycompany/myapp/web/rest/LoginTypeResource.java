package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.LoginType;

import com.mycompany.myapp.repository.LoginTypeRepository;
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
 * REST controller for managing LoginType.
 */
@RestController
@RequestMapping("/api")
public class LoginTypeResource {

    private final Logger log = LoggerFactory.getLogger(LoginTypeResource.class);

    private static final String ENTITY_NAME = "loginType";

    private final LoginTypeRepository loginTypeRepository;

    public LoginTypeResource(LoginTypeRepository loginTypeRepository) {
        this.loginTypeRepository = loginTypeRepository;
    }

    /**
     * POST  /login-types : Create a new loginType.
     *
     * @param loginType the loginType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new loginType, or with status 400 (Bad Request) if the loginType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/login-types")
    @Timed
    public ResponseEntity<LoginType> createLoginType(@RequestBody LoginType loginType) throws URISyntaxException {
        log.debug("REST request to save LoginType : {}", loginType);
        if (loginType.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new loginType cannot already have an ID")).body(null);
        }
        LoginType result = loginTypeRepository.save(loginType);
        return ResponseEntity.created(new URI("/api/login-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /login-types : Updates an existing loginType.
     *
     * @param loginType the loginType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated loginType,
     * or with status 400 (Bad Request) if the loginType is not valid,
     * or with status 500 (Internal Server Error) if the loginType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/login-types")
    @Timed
    public ResponseEntity<LoginType> updateLoginType(@RequestBody LoginType loginType) throws URISyntaxException {
        log.debug("REST request to update LoginType : {}", loginType);
        if (loginType.getId() == null) {
            return createLoginType(loginType);
        }
        LoginType result = loginTypeRepository.save(loginType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, loginType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /login-types : get all the loginTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of loginTypes in body
     */
    @GetMapping("/login-types")
    @Timed
    public List<LoginType> getAllLoginTypes() {
        log.debug("REST request to get all LoginTypes");
        return loginTypeRepository.findAll();
    }

    /**
     * GET  /login-types/:id : get the "id" loginType.
     *
     * @param id the id of the loginType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the loginType, or with status 404 (Not Found)
     */
    @GetMapping("/login-types/{id}")
    @Timed
    public ResponseEntity<LoginType> getLoginType(@PathVariable Long id) {
        log.debug("REST request to get LoginType : {}", id);
        LoginType loginType = loginTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(loginType));
    }

    /**
     * DELETE  /login-types/:id : delete the "id" loginType.
     *
     * @param id the id of the loginType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/login-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteLoginType(@PathVariable Long id) {
        log.debug("REST request to delete LoginType : {}", id);
        loginTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
