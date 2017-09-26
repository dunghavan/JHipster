package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DeviceMgmtApp;

import com.mycompany.myapp.domain.SecondEntity;
import com.mycompany.myapp.repository.SecondEntityRepository;
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
 * Test class for the SecondEntityResource REST controller.
 *
 * @see SecondEntityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeviceMgmtApp.class)
public class SecondEntityResourceIntTest {

    private static final String DEFAULT_SECOND_ENTITYFIELD_1 = "AAAAAAAAAA";
    private static final String UPDATED_SECOND_ENTITYFIELD_1 = "BBBBBBBBBB";

    private static final String DEFAULT_SECOND_ENTITYFIELD_2 = "AAAAAAAAAA";
    private static final String UPDATED_SECOND_ENTITYFIELD_2 = "BBBBBBBBBB";

    @Autowired
    private SecondEntityRepository secondEntityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSecondEntityMockMvc;

    private SecondEntity secondEntity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SecondEntityResource secondEntityResource = new SecondEntityResource(secondEntityRepository);
        this.restSecondEntityMockMvc = MockMvcBuilders.standaloneSetup(secondEntityResource)
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
    public static SecondEntity createEntity(EntityManager em) {
        SecondEntity secondEntity = new SecondEntity()
            .secondEntityfield1(DEFAULT_SECOND_ENTITYFIELD_1)
            .secondEntityfield2(DEFAULT_SECOND_ENTITYFIELD_2);
        return secondEntity;
    }

    @Before
    public void initTest() {
        secondEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createSecondEntity() throws Exception {
        int databaseSizeBeforeCreate = secondEntityRepository.findAll().size();

        // Create the SecondEntity
        restSecondEntityMockMvc.perform(post("/api/second-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secondEntity)))
            .andExpect(status().isCreated());

        // Validate the SecondEntity in the database
        List<SecondEntity> secondEntityList = secondEntityRepository.findAll();
        assertThat(secondEntityList).hasSize(databaseSizeBeforeCreate + 1);
        SecondEntity testSecondEntity = secondEntityList.get(secondEntityList.size() - 1);
        assertThat(testSecondEntity.getSecondEntityfield1()).isEqualTo(DEFAULT_SECOND_ENTITYFIELD_1);
        assertThat(testSecondEntity.getSecondEntityfield2()).isEqualTo(DEFAULT_SECOND_ENTITYFIELD_2);
    }

    @Test
    @Transactional
    public void createSecondEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = secondEntityRepository.findAll().size();

        // Create the SecondEntity with an existing ID
        secondEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSecondEntityMockMvc.perform(post("/api/second-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secondEntity)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<SecondEntity> secondEntityList = secondEntityRepository.findAll();
        assertThat(secondEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSecondEntities() throws Exception {
        // Initialize the database
        secondEntityRepository.saveAndFlush(secondEntity);

        // Get all the secondEntityList
        restSecondEntityMockMvc.perform(get("/api/second-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(secondEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].secondEntityfield1").value(hasItem(DEFAULT_SECOND_ENTITYFIELD_1.toString())))
            .andExpect(jsonPath("$.[*].secondEntityfield2").value(hasItem(DEFAULT_SECOND_ENTITYFIELD_2.toString())));
    }

    @Test
    @Transactional
    public void getSecondEntity() throws Exception {
        // Initialize the database
        secondEntityRepository.saveAndFlush(secondEntity);

        // Get the secondEntity
        restSecondEntityMockMvc.perform(get("/api/second-entities/{id}", secondEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(secondEntity.getId().intValue()))
            .andExpect(jsonPath("$.secondEntityfield1").value(DEFAULT_SECOND_ENTITYFIELD_1.toString()))
            .andExpect(jsonPath("$.secondEntityfield2").value(DEFAULT_SECOND_ENTITYFIELD_2.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSecondEntity() throws Exception {
        // Get the secondEntity
        restSecondEntityMockMvc.perform(get("/api/second-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSecondEntity() throws Exception {
        // Initialize the database
        secondEntityRepository.saveAndFlush(secondEntity);
        int databaseSizeBeforeUpdate = secondEntityRepository.findAll().size();

        // Update the secondEntity
        SecondEntity updatedSecondEntity = secondEntityRepository.findOne(secondEntity.getId());
        updatedSecondEntity
            .secondEntityfield1(UPDATED_SECOND_ENTITYFIELD_1)
            .secondEntityfield2(UPDATED_SECOND_ENTITYFIELD_2);

        restSecondEntityMockMvc.perform(put("/api/second-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSecondEntity)))
            .andExpect(status().isOk());

        // Validate the SecondEntity in the database
        List<SecondEntity> secondEntityList = secondEntityRepository.findAll();
        assertThat(secondEntityList).hasSize(databaseSizeBeforeUpdate);
        SecondEntity testSecondEntity = secondEntityList.get(secondEntityList.size() - 1);
        assertThat(testSecondEntity.getSecondEntityfield1()).isEqualTo(UPDATED_SECOND_ENTITYFIELD_1);
        assertThat(testSecondEntity.getSecondEntityfield2()).isEqualTo(UPDATED_SECOND_ENTITYFIELD_2);
    }

    @Test
    @Transactional
    public void updateNonExistingSecondEntity() throws Exception {
        int databaseSizeBeforeUpdate = secondEntityRepository.findAll().size();

        // Create the SecondEntity

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSecondEntityMockMvc.perform(put("/api/second-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secondEntity)))
            .andExpect(status().isCreated());

        // Validate the SecondEntity in the database
        List<SecondEntity> secondEntityList = secondEntityRepository.findAll();
        assertThat(secondEntityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSecondEntity() throws Exception {
        // Initialize the database
        secondEntityRepository.saveAndFlush(secondEntity);
        int databaseSizeBeforeDelete = secondEntityRepository.findAll().size();

        // Get the secondEntity
        restSecondEntityMockMvc.perform(delete("/api/second-entities/{id}", secondEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SecondEntity> secondEntityList = secondEntityRepository.findAll();
        assertThat(secondEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SecondEntity.class);
        SecondEntity secondEntity1 = new SecondEntity();
        secondEntity1.setId(1L);
        SecondEntity secondEntity2 = new SecondEntity();
        secondEntity2.setId(secondEntity1.getId());
        assertThat(secondEntity1).isEqualTo(secondEntity2);
        secondEntity2.setId(2L);
        assertThat(secondEntity1).isNotEqualTo(secondEntity2);
        secondEntity1.setId(null);
        assertThat(secondEntity1).isNotEqualTo(secondEntity2);
    }
}
