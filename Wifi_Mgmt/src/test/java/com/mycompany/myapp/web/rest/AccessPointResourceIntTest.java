package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.WifiMgmtApp;

import com.mycompany.myapp.domain.AccessPoint;
import com.mycompany.myapp.repository.AccessPointRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AccessPointResource REST controller.
 *
 * @see AccessPointResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WifiMgmtApp.class)
public class AccessPointResourceIntTest {

    private static final String DEFAULT_MAC = "AAAAAAAAAA";
    private static final String UPDATED_MAC = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    private static final LocalDate DEFAULT_LAST_ACTIVE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_ACTIVE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AccessPointRepository accessPointRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAccessPointMockMvc;

    private AccessPoint accessPoint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AccessPointResource accessPointResource = new AccessPointResource(accessPointRepository);
        this.restAccessPointMockMvc = MockMvcBuilders.standaloneSetup(accessPointResource)
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
    public static AccessPoint createEntity(EntityManager em) {
        AccessPoint accessPoint = new AccessPoint()
            .mac(DEFAULT_MAC)
            .description(DEFAULT_DESCRIPTION)
            .status(DEFAULT_STATUS)
            .lastActive(DEFAULT_LAST_ACTIVE);
        return accessPoint;
    }

    @Before
    public void initTest() {
        accessPoint = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccessPoint() throws Exception {
        int databaseSizeBeforeCreate = accessPointRepository.findAll().size();

        // Create the AccessPoint
        restAccessPointMockMvc.perform(post("/api/access-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accessPoint)))
            .andExpect(status().isCreated());

        // Validate the AccessPoint in the database
        List<AccessPoint> accessPointList = accessPointRepository.findAll();
        assertThat(accessPointList).hasSize(databaseSizeBeforeCreate + 1);
        AccessPoint testAccessPoint = accessPointList.get(accessPointList.size() - 1);
        assertThat(testAccessPoint.getMac()).isEqualTo(DEFAULT_MAC);
        assertThat(testAccessPoint.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAccessPoint.isStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAccessPoint.getLastActive()).isEqualTo(DEFAULT_LAST_ACTIVE);
    }

    @Test
    @Transactional
    public void createAccessPointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accessPointRepository.findAll().size();

        // Create the AccessPoint with an existing ID
        accessPoint.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccessPointMockMvc.perform(post("/api/access-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accessPoint)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<AccessPoint> accessPointList = accessPointRepository.findAll();
        assertThat(accessPointList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAccessPoints() throws Exception {
        // Initialize the database
        accessPointRepository.saveAndFlush(accessPoint);

        // Get all the accessPointList
        restAccessPointMockMvc.perform(get("/api/access-points?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accessPoint.getId().intValue())))
            .andExpect(jsonPath("$.[*].mac").value(hasItem(DEFAULT_MAC.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].lastActive").value(hasItem(DEFAULT_LAST_ACTIVE.toString())));
    }

    @Test
    @Transactional
    public void getAccessPoint() throws Exception {
        // Initialize the database
        accessPointRepository.saveAndFlush(accessPoint);

        // Get the accessPoint
        restAccessPointMockMvc.perform(get("/api/access-points/{id}", accessPoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accessPoint.getId().intValue()))
            .andExpect(jsonPath("$.mac").value(DEFAULT_MAC.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()))
            .andExpect(jsonPath("$.lastActive").value(DEFAULT_LAST_ACTIVE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAccessPoint() throws Exception {
        // Get the accessPoint
        restAccessPointMockMvc.perform(get("/api/access-points/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccessPoint() throws Exception {
        // Initialize the database
        accessPointRepository.saveAndFlush(accessPoint);
        int databaseSizeBeforeUpdate = accessPointRepository.findAll().size();

        // Update the accessPoint
        AccessPoint updatedAccessPoint = accessPointRepository.findOne(accessPoint.getId());
        updatedAccessPoint
            .mac(UPDATED_MAC)
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS)
            .lastActive(UPDATED_LAST_ACTIVE);

        restAccessPointMockMvc.perform(put("/api/access-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccessPoint)))
            .andExpect(status().isOk());

        // Validate the AccessPoint in the database
        List<AccessPoint> accessPointList = accessPointRepository.findAll();
        assertThat(accessPointList).hasSize(databaseSizeBeforeUpdate);
        AccessPoint testAccessPoint = accessPointList.get(accessPointList.size() - 1);
        assertThat(testAccessPoint.getMac()).isEqualTo(UPDATED_MAC);
        assertThat(testAccessPoint.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAccessPoint.isStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAccessPoint.getLastActive()).isEqualTo(UPDATED_LAST_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingAccessPoint() throws Exception {
        int databaseSizeBeforeUpdate = accessPointRepository.findAll().size();

        // Create the AccessPoint

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAccessPointMockMvc.perform(put("/api/access-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accessPoint)))
            .andExpect(status().isCreated());

        // Validate the AccessPoint in the database
        List<AccessPoint> accessPointList = accessPointRepository.findAll();
        assertThat(accessPointList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAccessPoint() throws Exception {
        // Initialize the database
        accessPointRepository.saveAndFlush(accessPoint);
        int databaseSizeBeforeDelete = accessPointRepository.findAll().size();

        // Get the accessPoint
        restAccessPointMockMvc.perform(delete("/api/access-points/{id}", accessPoint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AccessPoint> accessPointList = accessPointRepository.findAll();
        assertThat(accessPointList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccessPoint.class);
        AccessPoint accessPoint1 = new AccessPoint();
        accessPoint1.setId(1L);
        AccessPoint accessPoint2 = new AccessPoint();
        accessPoint2.setId(accessPoint1.getId());
        assertThat(accessPoint1).isEqualTo(accessPoint2);
        accessPoint2.setId(2L);
        assertThat(accessPoint1).isNotEqualTo(accessPoint2);
        accessPoint1.setId(null);
        assertThat(accessPoint1).isNotEqualTo(accessPoint2);
    }
}
