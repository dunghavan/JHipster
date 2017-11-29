package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.AccessPoint;

import com.mycompany.myapp.repository.AccessPointRepository;
import com.mycompany.myapp.repository.search.AccessPointSearchRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.AccessPointDTO;
import com.mycompany.myapp.service.mapper.AccessPointMapper;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
 * REST controller for managing AccessPoint.
 */
@RestController
@RequestMapping("/api")
public class AccessPointResource {

    private final Logger log = LoggerFactory.getLogger(AccessPointResource.class);

    private static final String ENTITY_NAME = "accessPoint";

    private final AccessPointRepository accessPointRepository;

    private final AccessPointMapper accessPointMapper;

    private final AccessPointSearchRepository accessPointSearchRepository;

    public AccessPointResource(AccessPointRepository accessPointRepository, AccessPointMapper accessPointMapper, AccessPointSearchRepository accessPointSearchRepository) {
        this.accessPointRepository = accessPointRepository;
        this.accessPointMapper = accessPointMapper;
        this.accessPointSearchRepository = accessPointSearchRepository;
    }

    /**
     * POST  /access-points : Create a new accessPoint.
     *
     * @param accessPointDTO the accessPointDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accessPointDTO, or with status 400 (Bad Request) if the accessPoint has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/access-points")
    @Timed
    public ResponseEntity<AccessPointDTO> createAccessPoint(@RequestBody AccessPointDTO accessPointDTO) throws URISyntaxException {
        log.debug("REST request to save AccessPoint : {}", accessPointDTO);
        if (accessPointDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new accessPoint cannot already have an ID")).body(null);
        }
        AccessPoint accessPoint = accessPointMapper.toEntity(accessPointDTO);
        accessPoint = accessPointRepository.save(accessPoint);
        AccessPointDTO result = accessPointMapper.toDto(accessPoint);
        accessPointSearchRepository.save(accessPoint);
        return ResponseEntity.created(new URI("/api/access-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /access-points : Updates an existing accessPoint.
     *
     * @param accessPointDTO the accessPointDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accessPointDTO,
     * or with status 400 (Bad Request) if the accessPointDTO is not valid,
     * or with status 500 (Internal Server Error) if the accessPointDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/access-points")
    @Timed
    public ResponseEntity<AccessPointDTO> updateAccessPoint(@RequestBody AccessPointDTO accessPointDTO) throws URISyntaxException {
        log.debug("REST request to update AccessPoint : {}", accessPointDTO);
        if (accessPointDTO.getId() == null) {
            return createAccessPoint(accessPointDTO);
        }
        AccessPoint accessPoint = accessPointMapper.toEntity(accessPointDTO);
        accessPoint = accessPointRepository.save(accessPoint);
        AccessPointDTO result = accessPointMapper.toDto(accessPoint);
        accessPointSearchRepository.save(accessPoint);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accessPointDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /access-points : get all the accessPoints.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of accessPoints in body
     */
    @GetMapping("/access-points")
    @Timed
    public ResponseEntity<List<AccessPointDTO>> getAllAccessPoints(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of AccessPoints");
        Page<AccessPoint> page = accessPointRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/access-points");
        return new ResponseEntity<>(accessPointMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /access-points/:id : get the "id" accessPoint.
     *
     * @param id the id of the accessPointDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accessPointDTO, or with status 404 (Not Found)
     */
    @GetMapping("/access-points/{id}")
    @Timed
    public ResponseEntity<AccessPointDTO> getAccessPoint(@PathVariable Long id) {
        log.debug("REST request to get AccessPoint : {}", id);
        AccessPoint accessPoint = accessPointRepository.findOne(id);
        AccessPointDTO accessPointDTO = accessPointMapper.toDto(accessPoint);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(accessPointDTO));
    }

    /**
     * DELETE  /access-points/:id : delete the "id" accessPoint.
     *
     * @param id the id of the accessPointDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/access-points/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccessPoint(@PathVariable Long id) {
        log.debug("REST request to delete AccessPoint : {}", id);
        accessPointRepository.delete(id);
        accessPointSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/access-points?query=:query : search for the accessPoint corresponding
     * to the query.
     *
     * @param query the query of the accessPoint search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/access-points")
    @Timed
    public ResponseEntity<List<AccessPointDTO>> searchAccessPoints(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of AccessPoints for query {}", query);
        Page<AccessPoint> page = accessPointSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/access-points");
        return new ResponseEntity<>(accessPointMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}
