package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.LoginType;

import com.mycompany.myapp.repository.LoginTypeRepository;
import com.mycompany.myapp.repository.search.LoginTypeSearchRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.LoginTypeDTO;
import com.mycompany.myapp.service.mapper.LoginTypeMapper;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing LoginType.
 */
@RestController
@RequestMapping("/api")
public class LoginTypeResource {

    private final Logger log = LoggerFactory.getLogger(LoginTypeResource.class);

    private static final String ENTITY_NAME = "loginType";

    private final LoginTypeRepository loginTypeRepository;

    private final LoginTypeMapper loginTypeMapper;

    private final LoginTypeSearchRepository loginTypeSearchRepository;

    public LoginTypeResource(LoginTypeRepository loginTypeRepository, LoginTypeMapper loginTypeMapper, LoginTypeSearchRepository loginTypeSearchRepository) {
        this.loginTypeRepository = loginTypeRepository;
        this.loginTypeMapper = loginTypeMapper;
        this.loginTypeSearchRepository = loginTypeSearchRepository;
    }

    /**
     * POST  /login-types : Create a new loginType.
     *
     * @param loginTypeDTO the loginTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new loginTypeDTO, or with status 400 (Bad Request) if the loginType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/login-types")
    @Timed
    public ResponseEntity<LoginTypeDTO> createLoginType(@RequestBody LoginTypeDTO loginTypeDTO) throws URISyntaxException {
        log.debug("REST request to save LoginType : {}", loginTypeDTO);
        if (loginTypeDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new loginType cannot already have an ID")).body(null);
        }
        LoginType loginType = loginTypeMapper.toEntity(loginTypeDTO);
        loginType = loginTypeRepository.save(loginType);
        LoginTypeDTO result = loginTypeMapper.toDto(loginType);
        loginTypeSearchRepository.save(loginType);
        return ResponseEntity.created(new URI("/api/login-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /login-types : Updates an existing loginType.
     *
     * @param loginTypeDTO the loginTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated loginTypeDTO,
     * or with status 400 (Bad Request) if the loginTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the loginTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/login-types")
    @Timed
    public ResponseEntity<LoginTypeDTO> updateLoginType(@RequestBody LoginTypeDTO loginTypeDTO) throws URISyntaxException {
        log.debug("REST request to update LoginType : {}", loginTypeDTO);
        if (loginTypeDTO.getId() == null) {
            return createLoginType(loginTypeDTO);
        }
        LoginType loginType = loginTypeMapper.toEntity(loginTypeDTO);
        loginType = loginTypeRepository.save(loginType);
        LoginTypeDTO result = loginTypeMapper.toDto(loginType);
        loginTypeSearchRepository.save(loginType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, loginTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /login-types : get all the loginTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of loginTypes in body
     */
    @GetMapping("/login-types")
    @Timed
    public ResponseEntity<List<LoginTypeDTO>> getAllLoginTypes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of LoginTypes");
        Page<LoginType> page = loginTypeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/login-types");
        return new ResponseEntity<>(loginTypeMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /login-types/:id : get the "id" loginType.
     *
     * @param id the id of the loginTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the loginTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/login-types/{id}")
    @Timed
    public ResponseEntity<LoginTypeDTO> getLoginType(@PathVariable Long id) {
        log.debug("REST request to get LoginType : {}", id);
        LoginType loginType = loginTypeRepository.findOne(id);
        LoginTypeDTO loginTypeDTO = loginTypeMapper.toDto(loginType);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(loginTypeDTO));
    }

    /**
     * DELETE  /login-types/:id : delete the "id" loginType.
     *
     * @param id the id of the loginTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/login-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteLoginType(@PathVariable Long id) {
        log.debug("REST request to delete LoginType : {}", id);
        loginTypeRepository.delete(id);
        loginTypeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/login-types?query=:query : search for the loginType corresponding
     * to the query.
     *
     * @param query the query of the loginType search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/login-types")
    @Timed
    public ResponseEntity<List<LoginTypeDTO>> searchLoginTypes(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of LoginTypes for query {}", query);
        Page<LoginType> page = loginTypeSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/login-types");
        return new ResponseEntity<>(loginTypeMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}
