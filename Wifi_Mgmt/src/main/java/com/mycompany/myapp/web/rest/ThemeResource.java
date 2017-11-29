package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Theme;

import com.mycompany.myapp.repository.ThemeRepository;
import com.mycompany.myapp.repository.search.ThemeSearchRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.ThemeDTO;
import com.mycompany.myapp.service.mapper.ThemeMapper;
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
 * REST controller for managing Theme.
 */
@RestController
@RequestMapping("/api")
public class ThemeResource {

    private final Logger log = LoggerFactory.getLogger(ThemeResource.class);

    private static final String ENTITY_NAME = "theme";

    private final ThemeRepository themeRepository;

    private final ThemeMapper themeMapper;

    private final ThemeSearchRepository themeSearchRepository;

    public ThemeResource(ThemeRepository themeRepository, ThemeMapper themeMapper, ThemeSearchRepository themeSearchRepository) {
        this.themeRepository = themeRepository;
        this.themeMapper = themeMapper;
        this.themeSearchRepository = themeSearchRepository;
    }

    /**
     * POST  /themes : Create a new theme.
     *
     * @param themeDTO the themeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new themeDTO, or with status 400 (Bad Request) if the theme has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/themes")
    @Timed
    public ResponseEntity<ThemeDTO> createTheme(@RequestBody ThemeDTO themeDTO) throws URISyntaxException {
        log.debug("REST request to save Theme : {}", themeDTO);
        if (themeDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new theme cannot already have an ID")).body(null);
        }
        Theme theme = themeMapper.toEntity(themeDTO);
        theme = themeRepository.save(theme);
        ThemeDTO result = themeMapper.toDto(theme);
        themeSearchRepository.save(theme);
        return ResponseEntity.created(new URI("/api/themes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /themes : Updates an existing theme.
     *
     * @param themeDTO the themeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated themeDTO,
     * or with status 400 (Bad Request) if the themeDTO is not valid,
     * or with status 500 (Internal Server Error) if the themeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/themes")
    @Timed
    public ResponseEntity<ThemeDTO> updateTheme(@RequestBody ThemeDTO themeDTO) throws URISyntaxException {
        log.debug("REST request to update Theme : {}", themeDTO);
        if (themeDTO.getId() == null) {
            return createTheme(themeDTO);
        }
        Theme theme = themeMapper.toEntity(themeDTO);
        theme = themeRepository.save(theme);
        ThemeDTO result = themeMapper.toDto(theme);
        themeSearchRepository.save(theme);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, themeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /themes : get all the themes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of themes in body
     */
    @GetMapping("/themes")
    @Timed
    public ResponseEntity<List<ThemeDTO>> getAllThemes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Themes");
        Page<Theme> page = themeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/themes");
        return new ResponseEntity<>(themeMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /themes/:id : get the "id" theme.
     *
     * @param id the id of the themeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the themeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/themes/{id}")
    @Timed
    public ResponseEntity<ThemeDTO> getTheme(@PathVariable Long id) {
        log.debug("REST request to get Theme : {}", id);
        Theme theme = themeRepository.findOne(id);
        ThemeDTO themeDTO = themeMapper.toDto(theme);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(themeDTO));
    }

    /**
     * DELETE  /themes/:id : delete the "id" theme.
     *
     * @param id the id of the themeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/themes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTheme(@PathVariable Long id) {
        log.debug("REST request to delete Theme : {}", id);
        themeRepository.delete(id);
        themeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/themes?query=:query : search for the theme corresponding
     * to the query.
     *
     * @param query the query of the theme search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/themes")
    @Timed
    public ResponseEntity<List<ThemeDTO>> searchThemes(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Themes for query {}", query);
        Page<Theme> page = themeSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/themes");
        return new ResponseEntity<>(themeMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}
