package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DemoAngular1XApp;

import com.mycompany.myapp.domain.WLANGroup;
import com.mycompany.myapp.repository.WLANGroupRepository;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WLANGroupResource REST controller.
 *
 * @see WLANGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoAngular1XApp.class)
public class WLANGroupResourceIntTest {

    private static final String DEFAULT_ALIAS = "AAAAAAAAAA";
    private static final String UPDATED_ALIAS = "BBBBBBBBBB";

    private static final String DEFAULT_SSID = "AAAAAAAAAA";
    private static final String UPDATED_SSID = "BBBBBBBBBB";

    private static final String DEFAULT_ENCRYPTION = "AAAAAAAAAA";
    private static final String UPDATED_ENCRYPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PASSPHASE = "AAAAAAAAAA";
    private static final String UPDATED_PASSPHASE = "BBBBBBBBBB";

    @Autowired
    private WLANGroupRepository wLANGroupRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWLANGroupMockMvc;

    private WLANGroup wLANGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        WLANGroupResource wLANGroupResource = new WLANGroupResource(wLANGroupRepository);
        this.restWLANGroupMockMvc = MockMvcBuilders.standaloneSetup(wLANGroupResource)
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
    public static WLANGroup createEntity(EntityManager em) {
        WLANGroup wLANGroup = new WLANGroup()
            .alias(DEFAULT_ALIAS)
            .ssid(DEFAULT_SSID)
            .encryption(DEFAULT_ENCRYPTION)
            .passphase(DEFAULT_PASSPHASE);
        return wLANGroup;
    }

    @Before
    public void initTest() {
        wLANGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createWLANGroup() throws Exception {
        int databaseSizeBeforeCreate = wLANGroupRepository.findAll().size();

        // Create the WLANGroup
        restWLANGroupMockMvc.perform(post("/api/w-lan-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wLANGroup)))
            .andExpect(status().isCreated());

        // Validate the WLANGroup in the database
        List<WLANGroup> wLANGroupList = wLANGroupRepository.findAll();
        assertThat(wLANGroupList).hasSize(databaseSizeBeforeCreate + 1);
        WLANGroup testWLANGroup = wLANGroupList.get(wLANGroupList.size() - 1);
        assertThat(testWLANGroup.getAlias()).isEqualTo(DEFAULT_ALIAS);
        assertThat(testWLANGroup.getSsid()).isEqualTo(DEFAULT_SSID);
        assertThat(testWLANGroup.getEncryption()).isEqualTo(DEFAULT_ENCRYPTION);
        assertThat(testWLANGroup.getPassphase()).isEqualTo(DEFAULT_PASSPHASE);
    }

    @Test
    @Transactional
    public void createWLANGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wLANGroupRepository.findAll().size();

        // Create the WLANGroup with an existing ID
        wLANGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWLANGroupMockMvc.perform(post("/api/w-lan-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wLANGroup)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<WLANGroup> wLANGroupList = wLANGroupRepository.findAll();
        assertThat(wLANGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWLANGroups() throws Exception {
        // Initialize the database
        wLANGroupRepository.saveAndFlush(wLANGroup);

        // Get all the wLANGroupList
        restWLANGroupMockMvc.perform(get("/api/w-lan-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wLANGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].alias").value(hasItem(DEFAULT_ALIAS.toString())))
            .andExpect(jsonPath("$.[*].ssid").value(hasItem(DEFAULT_SSID.toString())))
            .andExpect(jsonPath("$.[*].encryption").value(hasItem(DEFAULT_ENCRYPTION.toString())))
            .andExpect(jsonPath("$.[*].passphase").value(hasItem(DEFAULT_PASSPHASE.toString())));
    }

    @Test
    @Transactional
    public void getWLANGroup() throws Exception {
        // Initialize the database
        wLANGroupRepository.saveAndFlush(wLANGroup);

        // Get the wLANGroup
        restWLANGroupMockMvc.perform(get("/api/w-lan-groups/{id}", wLANGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wLANGroup.getId().intValue()))
            .andExpect(jsonPath("$.alias").value(DEFAULT_ALIAS.toString()))
            .andExpect(jsonPath("$.ssid").value(DEFAULT_SSID.toString()))
            .andExpect(jsonPath("$.encryption").value(DEFAULT_ENCRYPTION.toString()))
            .andExpect(jsonPath("$.passphase").value(DEFAULT_PASSPHASE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWLANGroup() throws Exception {
        // Get the wLANGroup
        restWLANGroupMockMvc.perform(get("/api/w-lan-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWLANGroup() throws Exception {
        // Initialize the database
        wLANGroupRepository.saveAndFlush(wLANGroup);
        int databaseSizeBeforeUpdate = wLANGroupRepository.findAll().size();

        // Update the wLANGroup
        WLANGroup updatedWLANGroup = wLANGroupRepository.findOne(wLANGroup.getId());
        updatedWLANGroup
            .alias(UPDATED_ALIAS)
            .ssid(UPDATED_SSID)
            .encryption(UPDATED_ENCRYPTION)
            .passphase(UPDATED_PASSPHASE);

        restWLANGroupMockMvc.perform(put("/api/w-lan-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWLANGroup)))
            .andExpect(status().isOk());

        // Validate the WLANGroup in the database
        List<WLANGroup> wLANGroupList = wLANGroupRepository.findAll();
        assertThat(wLANGroupList).hasSize(databaseSizeBeforeUpdate);
        WLANGroup testWLANGroup = wLANGroupList.get(wLANGroupList.size() - 1);
        assertThat(testWLANGroup.getAlias()).isEqualTo(UPDATED_ALIAS);
        assertThat(testWLANGroup.getSsid()).isEqualTo(UPDATED_SSID);
        assertThat(testWLANGroup.getEncryption()).isEqualTo(UPDATED_ENCRYPTION);
        assertThat(testWLANGroup.getPassphase()).isEqualTo(UPDATED_PASSPHASE);
    }

    @Test
    @Transactional
    public void updateNonExistingWLANGroup() throws Exception {
        int databaseSizeBeforeUpdate = wLANGroupRepository.findAll().size();

        // Create the WLANGroup

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWLANGroupMockMvc.perform(put("/api/w-lan-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wLANGroup)))
            .andExpect(status().isCreated());

        // Validate the WLANGroup in the database
        List<WLANGroup> wLANGroupList = wLANGroupRepository.findAll();
        assertThat(wLANGroupList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWLANGroup() throws Exception {
        // Initialize the database
        wLANGroupRepository.saveAndFlush(wLANGroup);
        int databaseSizeBeforeDelete = wLANGroupRepository.findAll().size();

        // Get the wLANGroup
        restWLANGroupMockMvc.perform(delete("/api/w-lan-groups/{id}", wLANGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WLANGroup> wLANGroupList = wLANGroupRepository.findAll();
        assertThat(wLANGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WLANGroup.class);
        WLANGroup wLANGroup1 = new WLANGroup();
        wLANGroup1.setId(1L);
        WLANGroup wLANGroup2 = new WLANGroup();
        wLANGroup2.setId(wLANGroup1.getId());
        assertThat(wLANGroup1).isEqualTo(wLANGroup2);
        wLANGroup2.setId(2L);
        assertThat(wLANGroup1).isNotEqualTo(wLANGroup2);
        wLANGroup1.setId(null);
        assertThat(wLANGroup1).isNotEqualTo(wLANGroup2);
    }
}
