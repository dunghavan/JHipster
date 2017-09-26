package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DeviceMgmtApp;

import com.mycompany.myapp.domain.Hub;
import com.mycompany.myapp.repository.HubRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HubResource REST controller.
 *
 * @see HubResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeviceMgmtApp.class)
public class HubResourceIntTest {

    private static final Integer DEFAULT_UID = 11;
    private static final Integer UPDATED_UID = 10;

    private static final String DEFAULT_ALIAS = "AAAAAAAAAA";
    private static final String UPDATED_ALIAS = "BBBBBBBBBB";

    private static final String DEFAULT_UUID = "AAAAAAAAAA";
    private static final String UPDATED_UUID = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_LASTACTIVE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LASTACTIVE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private HubRepository hubRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHubMockMvc;

    private Hub hub;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        HubResource hubResource = new HubResource(hubRepository);
        this.restHubMockMvc = MockMvcBuilders.standaloneSetup(hubResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hub createEntity(EntityManager em) {
        Hub hub = new Hub()
            .uid(DEFAULT_UID)
            .alias(DEFAULT_ALIAS)
            .uuid(DEFAULT_UUID)
            .lastactive(DEFAULT_LASTACTIVE);
        return hub;
    }

    @Before
    public void initTest() {
        hub = createEntity(em);
    }

    @Test
    @Transactional
    public void createHub() throws Exception {
        int databaseSizeBeforeCreate = hubRepository.findAll().size();

        // Create the Hub
        restHubMockMvc.perform(post("/api/hubs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hub)))
            .andExpect(status().isCreated());

        // Validate the Hub in the database
        List<Hub> hubList = hubRepository.findAll();
        assertThat(hubList).hasSize(databaseSizeBeforeCreate + 1);
        Hub testHub = hubList.get(hubList.size() - 1);
        assertThat(testHub.getUid()).isEqualTo(DEFAULT_UID);
        assertThat(testHub.getAlias()).isEqualTo(DEFAULT_ALIAS);
        assertThat(testHub.getUuid()).isEqualTo(DEFAULT_UUID);
        assertThat(testHub.getLastactive()).isEqualTo(DEFAULT_LASTACTIVE);
    }

    @Test
    @Transactional
    public void createHubWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hubRepository.findAll().size();

        // Create the Hub with an existing ID
        hub.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHubMockMvc.perform(post("/api/hubs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hub)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Hub> hubList = hubRepository.findAll();
        assertThat(hubList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHubs() throws Exception {
        // Initialize the database
        hubRepository.saveAndFlush(hub);

        // Get all the hubList
        restHubMockMvc.perform(get("/api/hubs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hub.getId().intValue())))
            .andExpect(jsonPath("$.[*].uid").value(hasItem(DEFAULT_UID)))
            .andExpect(jsonPath("$.[*].alias").value(hasItem(DEFAULT_ALIAS.toString())))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(DEFAULT_UUID.toString())))
            .andExpect(jsonPath("$.[*].lastactive").value(hasItem(sameInstant(DEFAULT_LASTACTIVE))));
    }

    @Test
    @Transactional
    public void getHub() throws Exception {
        // Initialize the database
        hubRepository.saveAndFlush(hub);

        // Get the hub
        restHubMockMvc.perform(get("/api/hubs/{id}", hub.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hub.getId().intValue()))
            .andExpect(jsonPath("$.uid").value(DEFAULT_UID))
            .andExpect(jsonPath("$.alias").value(DEFAULT_ALIAS.toString()))
            .andExpect(jsonPath("$.uuid").value(DEFAULT_UUID.toString()))
            .andExpect(jsonPath("$.lastactive").value(sameInstant(DEFAULT_LASTACTIVE)));
    }

    @Test
    @Transactional
    public void getNonExistingHub() throws Exception {
        // Get the hub
        restHubMockMvc.perform(get("/api/hubs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHub() throws Exception {
        // Initialize the database
        hubRepository.saveAndFlush(hub);
        int databaseSizeBeforeUpdate = hubRepository.findAll().size();

        // Update the hub
        Hub updatedHub = hubRepository.findOne(hub.getId());
        updatedHub
            .uid(UPDATED_UID)
            .alias(UPDATED_ALIAS)
            .uuid(UPDATED_UUID)
            .lastactive(UPDATED_LASTACTIVE);

        restHubMockMvc.perform(put("/api/hubs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHub)))
            .andExpect(status().isOk());

        // Validate the Hub in the database
        List<Hub> hubList = hubRepository.findAll();
        assertThat(hubList).hasSize(databaseSizeBeforeUpdate);
        Hub testHub = hubList.get(hubList.size() - 1);
        assertThat(testHub.getUid()).isEqualTo(UPDATED_UID);
        assertThat(testHub.getAlias()).isEqualTo(UPDATED_ALIAS);
        assertThat(testHub.getUuid()).isEqualTo(UPDATED_UUID);
        assertThat(testHub.getLastactive()).isEqualTo(UPDATED_LASTACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingHub() throws Exception {
        int databaseSizeBeforeUpdate = hubRepository.findAll().size();

        // Create the Hub

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHubMockMvc.perform(put("/api/hubs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hub)))
            .andExpect(status().isCreated());

        // Validate the Hub in the database
        List<Hub> hubList = hubRepository.findAll();
        assertThat(hubList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHub() throws Exception {
        // Initialize the database
        hubRepository.saveAndFlush(hub);
        int databaseSizeBeforeDelete = hubRepository.findAll().size();

        // Get the hub
        restHubMockMvc.perform(delete("/api/hubs/{id}", hub.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Hub> hubList = hubRepository.findAll();
        assertThat(hubList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hub.class);
        Hub hub1 = new Hub();
        hub1.setId(1L);
        Hub hub2 = new Hub();
        hub2.setId(hub1.getId());
        assertThat(hub1).isEqualTo(hub2);
        hub2.setId(2L);
        assertThat(hub1).isNotEqualTo(hub2);
        hub1.setId(null);
        assertThat(hub1).isNotEqualTo(hub2);
    }
}
