package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DeviceMgmtApp;

import com.mycompany.myapp.domain.FirstEntity;
import com.mycompany.myapp.repository.FirstEntityRepository;
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
 * Test class for the FirstEntityResource REST controller.
 *
 * @see FirstEntityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeviceMgmtApp.class)
public class FirstEntityResourceIntTest {

    private static final String DEFAULT_FIRST_ENTITYFIELD_1 = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_ENTITYFIELD_1 = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_ENTITYFIELD_2 = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_ENTITYFIELD_2 = "BBBBBBBBBB";

    @Autowired
    private FirstEntityRepository firstEntityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFirstEntityMockMvc;

    private FirstEntity firstEntity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        FirstEntityResource firstEntityResource = new FirstEntityResource(firstEntityRepository);
        this.restFirstEntityMockMvc = MockMvcBuilders.standaloneSetup(firstEntityResource)
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
    public static FirstEntity createEntity(EntityManager em) {
        FirstEntity firstEntity = new FirstEntity()
            .firstEntityfield1(DEFAULT_FIRST_ENTITYFIELD_1)
            .firstEntityfield2(DEFAULT_FIRST_ENTITYFIELD_2);
        return firstEntity;
    }

    @Before
    public void initTest() {
        firstEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createFirstEntity() throws Exception {
        int databaseSizeBeforeCreate = firstEntityRepository.findAll().size();

        // Create the FirstEntity
        restFirstEntityMockMvc.perform(post("/api/first-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(firstEntity)))
            .andExpect(status().isCreated());

        // Validate the FirstEntity in the database
        List<FirstEntity> firstEntityList = firstEntityRepository.findAll();
        assertThat(firstEntityList).hasSize(databaseSizeBeforeCreate + 1);
        FirstEntity testFirstEntity = firstEntityList.get(firstEntityList.size() - 1);
        assertThat(testFirstEntity.getFirstEntityfield1()).isEqualTo(DEFAULT_FIRST_ENTITYFIELD_1);
        assertThat(testFirstEntity.getFirstEntityfield2()).isEqualTo(DEFAULT_FIRST_ENTITYFIELD_2);
    }

    @Test
    @Transactional
    public void createFirstEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = firstEntityRepository.findAll().size();

        // Create the FirstEntity with an existing ID
        firstEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFirstEntityMockMvc.perform(post("/api/first-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(firstEntity)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<FirstEntity> firstEntityList = firstEntityRepository.findAll();
        assertThat(firstEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFirstEntities() throws Exception {
        // Initialize the database
        firstEntityRepository.saveAndFlush(firstEntity);

        // Get all the firstEntityList
        restFirstEntityMockMvc.perform(get("/api/first-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(firstEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstEntityfield1").value(hasItem(DEFAULT_FIRST_ENTITYFIELD_1.toString())))
            .andExpect(jsonPath("$.[*].firstEntityfield2").value(hasItem(DEFAULT_FIRST_ENTITYFIELD_2.toString())));
    }

    @Test
    @Transactional
    public void getFirstEntity() throws Exception {
        // Initialize the database
        firstEntityRepository.saveAndFlush(firstEntity);

        // Get the firstEntity
        restFirstEntityMockMvc.perform(get("/api/first-entities/{id}", firstEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(firstEntity.getId().intValue()))
            .andExpect(jsonPath("$.firstEntityfield1").value(DEFAULT_FIRST_ENTITYFIELD_1.toString()))
            .andExpect(jsonPath("$.firstEntityfield2").value(DEFAULT_FIRST_ENTITYFIELD_2.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFirstEntity() throws Exception {
        // Get the firstEntity
        restFirstEntityMockMvc.perform(get("/api/first-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFirstEntity() throws Exception {
        // Initialize the database
        firstEntityRepository.saveAndFlush(firstEntity);
        int databaseSizeBeforeUpdate = firstEntityRepository.findAll().size();

        // Update the firstEntity
        FirstEntity updatedFirstEntity = firstEntityRepository.findOne(firstEntity.getId());
        updatedFirstEntity
            .firstEntityfield1(UPDATED_FIRST_ENTITYFIELD_1)
            .firstEntityfield2(UPDATED_FIRST_ENTITYFIELD_2);

        restFirstEntityMockMvc.perform(put("/api/first-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFirstEntity)))
            .andExpect(status().isOk());

        // Validate the FirstEntity in the database
        List<FirstEntity> firstEntityList = firstEntityRepository.findAll();
        assertThat(firstEntityList).hasSize(databaseSizeBeforeUpdate);
        FirstEntity testFirstEntity = firstEntityList.get(firstEntityList.size() - 1);
        assertThat(testFirstEntity.getFirstEntityfield1()).isEqualTo(UPDATED_FIRST_ENTITYFIELD_1);
        assertThat(testFirstEntity.getFirstEntityfield2()).isEqualTo(UPDATED_FIRST_ENTITYFIELD_2);
    }

    @Test
    @Transactional
    public void updateNonExistingFirstEntity() throws Exception {
        int databaseSizeBeforeUpdate = firstEntityRepository.findAll().size();

        // Create the FirstEntity

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFirstEntityMockMvc.perform(put("/api/first-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(firstEntity)))
            .andExpect(status().isCreated());

        // Validate the FirstEntity in the database
        List<FirstEntity> firstEntityList = firstEntityRepository.findAll();
        assertThat(firstEntityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFirstEntity() throws Exception {
        // Initialize the database
        firstEntityRepository.saveAndFlush(firstEntity);
        int databaseSizeBeforeDelete = firstEntityRepository.findAll().size();

        // Get the firstEntity
        restFirstEntityMockMvc.perform(delete("/api/first-entities/{id}", firstEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FirstEntity> firstEntityList = firstEntityRepository.findAll();
        assertThat(firstEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FirstEntity.class);
        FirstEntity firstEntity1 = new FirstEntity();
        firstEntity1.setId(1L);
        FirstEntity firstEntity2 = new FirstEntity();
        firstEntity2.setId(firstEntity1.getId());
        assertThat(firstEntity1).isEqualTo(firstEntity2);
        firstEntity2.setId(2L);
        assertThat(firstEntity1).isNotEqualTo(firstEntity2);
        firstEntity1.setId(null);
        assertThat(firstEntity1).isNotEqualTo(firstEntity2);
    }
}
