package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.LandingPage;

import com.mycompany.myapp.repository.LandingPageRepository;
import com.mycompany.myapp.repository.search.LandingPageSearchRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.LandingPageDTO;
import com.mycompany.myapp.service.mapper.LandingPageMapper;
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
 * REST controller for managing LandingPage.
 */
@RestController
@RequestMapping("/api")
public class LandingPageResource {

    private final Logger log = LoggerFactory.getLogger(LandingPageResource.class);

    private static final String ENTITY_NAME = "landingPage";

    private final LandingPageRepository landingPageRepository;

    private final LandingPageMapper landingPageMapper;

    private final LandingPageSearchRepository landingPageSearchRepository;

    public LandingPageResource(LandingPageRepository landingPageRepository, LandingPageMapper landingPageMapper, LandingPageSearchRepository landingPageSearchRepository) {
        this.landingPageRepository = landingPageRepository;
        this.landingPageMapper = landingPageMapper;
        this.landingPageSearchRepository = landingPageSearchRepository;
    }

    /**
     * POST  /landing-pages : Create a new landingPage.
     *
     * @param landingPageDTO the landingPageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new landingPageDTO, or with status 400 (Bad Request) if the landingPage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/landing-pages")
    @Timed
    public ResponseEntity<LandingPageDTO> createLandingPage(@RequestBody LandingPageDTO landingPageDTO) throws URISyntaxException {
        log.debug("REST request to save LandingPage : {}", landingPageDTO);
        if (landingPageDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new landingPage cannot already have an ID")).body(null);
        }
        LandingPage landingPage = landingPageMapper.toEntity(landingPageDTO);
        landingPage = landingPageRepository.save(landingPage);
        LandingPageDTO result = landingPageMapper.toDto(landingPage);
        landingPageSearchRepository.save(landingPage);
        return ResponseEntity.created(new URI("/api/landing-pages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /landing-pages : Updates an existing landingPage.
     *
     * @param landingPageDTO the landingPageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated landingPageDTO,
     * or with status 400 (Bad Request) if the landingPageDTO is not valid,
     * or with status 500 (Internal Server Error) if the landingPageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/landing-pages")
    @Timed
    public ResponseEntity<LandingPageDTO> updateLandingPage(@RequestBody LandingPageDTO landingPageDTO) throws URISyntaxException {
        log.debug("REST request to update LandingPage : {}", landingPageDTO);
        if (landingPageDTO.getId() == null) {
            return createLandingPage(landingPageDTO);
        }
        LandingPage landingPage = landingPageMapper.toEntity(landingPageDTO);
        landingPage = landingPageRepository.save(landingPage);
        LandingPageDTO result = landingPageMapper.toDto(landingPage);
        landingPageSearchRepository.save(landingPage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, landingPageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /landing-pages : get all the landingPages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of landingPages in body
     */
    @GetMapping("/landing-pages")
    @Timed
    public ResponseEntity<List<LandingPageDTO>> getAllLandingPages(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of LandingPages");
        Page<LandingPage> page = landingPageRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/landing-pages");
        return new ResponseEntity<>(landingPageMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /landing-pages/:id : get the "id" landingPage.
     *
     * @param id the id of the landingPageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the landingPageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/landing-pages/{id}")
    @Timed
    public ResponseEntity<LandingPageDTO> getLandingPage(@PathVariable Long id) {
        log.debug("REST request to get LandingPage : {}", id);
        LandingPage landingPage = landingPageRepository.findOne(id);
        LandingPageDTO landingPageDTO = landingPageMapper.toDto(landingPage);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(landingPageDTO));
    }

    /**
     * DELETE  /landing-pages/:id : delete the "id" landingPage.
     *
     * @param id the id of the landingPageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/landing-pages/{id}")
    @Timed
    public ResponseEntity<Void> deleteLandingPage(@PathVariable Long id) {
        log.debug("REST request to delete LandingPage : {}", id);
        landingPageRepository.delete(id);
        landingPageSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/landing-pages?query=:query : search for the landingPage corresponding
     * to the query.
     *
     * @param query the query of the landingPage search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/landing-pages")
    @Timed
    public ResponseEntity<List<LandingPageDTO>> searchLandingPages(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of LandingPages for query {}", query);
        Page<LandingPage> page = landingPageSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/landing-pages");
        return new ResponseEntity<>(landingPageMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}
