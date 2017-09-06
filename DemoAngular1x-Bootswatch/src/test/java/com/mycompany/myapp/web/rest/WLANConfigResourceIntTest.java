package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DemoAngular1XApp;

import com.mycompany.myapp.domain.WLANConfig;
import com.mycompany.myapp.repository.WLANConfigRepository;
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
 * Test class for the WLANConfigResource REST controller.
 *
 * @see WLANConfigResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoAngular1XApp.class)
public class WLANConfigResourceIntTest {

    private static final String DEFAULT_ALIAS = "AAAAAAAAAA";
    private static final String UPDATED_ALIAS = "BBBBBBBBBB";

    private static final Integer DEFAULT_CHANEL = 1;
    private static final Integer UPDATED_CHANEL = 2;

    private static final Integer DEFAULT_MAX_ASSOC = 1;
    private static final Integer UPDATED_MAX_ASSOC = 2;

    private static final String DEFAULT_HT_MODE = "AAAAAAAAAA";
    private static final String UPDATED_HT_MODE = "BBBBBBBBBB";

    private static final Integer DEFAULT_TX_POWER = 1;
    private static final Integer UPDATED_TX_POWER = 2;

    private static final Integer DEFAULT_MAX_INACTIVITY = 1;
    private static final Integer UPDATED_MAX_INACTIVITY = 2;

    @Autowired
    private WLANConfigRepository wLANConfigRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWLANConfigMockMvc;

    private WLANConfig wLANConfig;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        WLANConfigResource wLANConfigResource = new WLANConfigResource(wLANConfigRepository);
        this.restWLANConfigMockMvc = MockMvcBuilders.standaloneSetup(wLANConfigResource)
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
    public static WLANConfig createEntity(EntityManager em) {
        WLANConfig wLANConfig = new WLANConfig()
            .alias(DEFAULT_ALIAS)
            .chanel(DEFAULT_CHANEL)
            .maxAssoc(DEFAULT_MAX_ASSOC)
            .htMode(DEFAULT_HT_MODE)
            .txPower(DEFAULT_TX_POWER)
            .maxInactivity(DEFAULT_MAX_INACTIVITY);
        return wLANConfig;
    }

    @Before
    public void initTest() {
        wLANConfig = createEntity(em);
    }

    @Test
    @Transactional
    public void createWLANConfig() throws Exception {
        int databaseSizeBeforeCreate = wLANConfigRepository.findAll().size();

        // Create the WLANConfig
        restWLANConfigMockMvc.perform(post("/api/w-lan-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wLANConfig)))
            .andExpect(status().isCreated());

        // Validate the WLANConfig in the database
        List<WLANConfig> wLANConfigList = wLANConfigRepository.findAll();
        assertThat(wLANConfigList).hasSize(databaseSizeBeforeCreate + 1);
        WLANConfig testWLANConfig = wLANConfigList.get(wLANConfigList.size() - 1);
        assertThat(testWLANConfig.getAlias()).isEqualTo(DEFAULT_ALIAS);
        assertThat(testWLANConfig.getChanel()).isEqualTo(DEFAULT_CHANEL);
        assertThat(testWLANConfig.getMaxAssoc()).isEqualTo(DEFAULT_MAX_ASSOC);
        assertThat(testWLANConfig.getHtMode()).isEqualTo(DEFAULT_HT_MODE);
        assertThat(testWLANConfig.getTxPower()).isEqualTo(DEFAULT_TX_POWER);
        assertThat(testWLANConfig.getMaxInactivity()).isEqualTo(DEFAULT_MAX_INACTIVITY);
    }

    @Test
    @Transactional
    public void createWLANConfigWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wLANConfigRepository.findAll().size();

        // Create the WLANConfig with an existing ID
        wLANConfig.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWLANConfigMockMvc.perform(post("/api/w-lan-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wLANConfig)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<WLANConfig> wLANConfigList = wLANConfigRepository.findAll();
        assertThat(wLANConfigList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWLANConfigs() throws Exception {
        // Initialize the database
        wLANConfigRepository.saveAndFlush(wLANConfig);

        // Get all the wLANConfigList
        restWLANConfigMockMvc.perform(get("/api/w-lan-configs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wLANConfig.getId().intValue())))
            .andExpect(jsonPath("$.[*].alias").value(hasItem(DEFAULT_ALIAS.toString())))
            .andExpect(jsonPath("$.[*].chanel").value(hasItem(DEFAULT_CHANEL)))
            .andExpect(jsonPath("$.[*].maxAssoc").value(hasItem(DEFAULT_MAX_ASSOC)))
            .andExpect(jsonPath("$.[*].htMode").value(hasItem(DEFAULT_HT_MODE.toString())))
            .andExpect(jsonPath("$.[*].txPower").value(hasItem(DEFAULT_TX_POWER)))
            .andExpect(jsonPath("$.[*].maxInactivity").value(hasItem(DEFAULT_MAX_INACTIVITY)));
    }

    @Test
    @Transactional
    public void getWLANConfig() throws Exception {
        // Initialize the database
        wLANConfigRepository.saveAndFlush(wLANConfig);

        // Get the wLANConfig
        restWLANConfigMockMvc.perform(get("/api/w-lan-configs/{id}", wLANConfig.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wLANConfig.getId().intValue()))
            .andExpect(jsonPath("$.alias").value(DEFAULT_ALIAS.toString()))
            .andExpect(jsonPath("$.chanel").value(DEFAULT_CHANEL))
            .andExpect(jsonPath("$.maxAssoc").value(DEFAULT_MAX_ASSOC))
            .andExpect(jsonPath("$.htMode").value(DEFAULT_HT_MODE.toString()))
            .andExpect(jsonPath("$.txPower").value(DEFAULT_TX_POWER))
            .andExpect(jsonPath("$.maxInactivity").value(DEFAULT_MAX_INACTIVITY));
    }

    @Test
    @Transactional
    public void getNonExistingWLANConfig() throws Exception {
        // Get the wLANConfig
        restWLANConfigMockMvc.perform(get("/api/w-lan-configs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWLANConfig() throws Exception {
        // Initialize the database
        wLANConfigRepository.saveAndFlush(wLANConfig);
        int databaseSizeBeforeUpdate = wLANConfigRepository.findAll().size();

        // Update the wLANConfig
        WLANConfig updatedWLANConfig = wLANConfigRepository.findOne(wLANConfig.getId());
        updatedWLANConfig
            .alias(UPDATED_ALIAS)
            .chanel(UPDATED_CHANEL)
            .maxAssoc(UPDATED_MAX_ASSOC)
            .htMode(UPDATED_HT_MODE)
            .txPower(UPDATED_TX_POWER)
            .maxInactivity(UPDATED_MAX_INACTIVITY);

        restWLANConfigMockMvc.perform(put("/api/w-lan-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWLANConfig)))
            .andExpect(status().isOk());

        // Validate the WLANConfig in the database
        List<WLANConfig> wLANConfigList = wLANConfigRepository.findAll();
        assertThat(wLANConfigList).hasSize(databaseSizeBeforeUpdate);
        WLANConfig testWLANConfig = wLANConfigList.get(wLANConfigList.size() - 1);
        assertThat(testWLANConfig.getAlias()).isEqualTo(UPDATED_ALIAS);
        assertThat(testWLANConfig.getChanel()).isEqualTo(UPDATED_CHANEL);
        assertThat(testWLANConfig.getMaxAssoc()).isEqualTo(UPDATED_MAX_ASSOC);
        assertThat(testWLANConfig.getHtMode()).isEqualTo(UPDATED_HT_MODE);
        assertThat(testWLANConfig.getTxPower()).isEqualTo(UPDATED_TX_POWER);
        assertThat(testWLANConfig.getMaxInactivity()).isEqualTo(UPDATED_MAX_INACTIVITY);
    }

    @Test
    @Transactional
    public void updateNonExistingWLANConfig() throws Exception {
        int databaseSizeBeforeUpdate = wLANConfigRepository.findAll().size();

        // Create the WLANConfig

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWLANConfigMockMvc.perform(put("/api/w-lan-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wLANConfig)))
            .andExpect(status().isCreated());

        // Validate the WLANConfig in the database
        List<WLANConfig> wLANConfigList = wLANConfigRepository.findAll();
        assertThat(wLANConfigList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWLANConfig() throws Exception {
        // Initialize the database
        wLANConfigRepository.saveAndFlush(wLANConfig);
        int databaseSizeBeforeDelete = wLANConfigRepository.findAll().size();

        // Get the wLANConfig
        restWLANConfigMockMvc.perform(delete("/api/w-lan-configs/{id}", wLANConfig.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WLANConfig> wLANConfigList = wLANConfigRepository.findAll();
        assertThat(wLANConfigList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WLANConfig.class);
        WLANConfig wLANConfig1 = new WLANConfig();
        wLANConfig1.setId(1L);
        WLANConfig wLANConfig2 = new WLANConfig();
        wLANConfig2.setId(wLANConfig1.getId());
        assertThat(wLANConfig1).isEqualTo(wLANConfig2);
        wLANConfig2.setId(2L);
        assertThat(wLANConfig1).isNotEqualTo(wLANConfig2);
        wLANConfig1.setId(null);
        assertThat(wLANConfig1).isNotEqualTo(wLANConfig2);
    }
}
