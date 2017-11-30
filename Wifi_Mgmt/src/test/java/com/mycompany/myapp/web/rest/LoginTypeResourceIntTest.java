package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.WifiMgmtApp;

import com.mycompany.myapp.domain.LoginType;
import com.mycompany.myapp.repository.LoginTypeRepository;
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
 * Test class for the LoginTypeResource REST controller.
 *
 * @see LoginTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WifiMgmtApp.class)
public class LoginTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private LoginTypeRepository loginTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLoginTypeMockMvc;

    private LoginType loginType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        LoginTypeResource loginTypeResource = new LoginTypeResource(loginTypeRepository);
        this.restLoginTypeMockMvc = MockMvcBuilders.standaloneSetup(loginTypeResource)
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
    public static LoginType createEntity(EntityManager em) {
        LoginType loginType = new LoginType()
            .name(DEFAULT_NAME);
        return loginType;
    }

    @Before
    public void initTest() {
        loginType = createEntity(em);
    }

    @Test
    @Transactional
    public void createLoginType() throws Exception {
        int databaseSizeBeforeCreate = loginTypeRepository.findAll().size();

        // Create the LoginType
        restLoginTypeMockMvc.perform(post("/api/login-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loginType)))
            .andExpect(status().isCreated());

        // Validate the LoginType in the database
        List<LoginType> loginTypeList = loginTypeRepository.findAll();
        assertThat(loginTypeList).hasSize(databaseSizeBeforeCreate + 1);
        LoginType testLoginType = loginTypeList.get(loginTypeList.size() - 1);
        assertThat(testLoginType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createLoginTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = loginTypeRepository.findAll().size();

        // Create the LoginType with an existing ID
        loginType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLoginTypeMockMvc.perform(post("/api/login-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loginType)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<LoginType> loginTypeList = loginTypeRepository.findAll();
        assertThat(loginTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLoginTypes() throws Exception {
        // Initialize the database
        loginTypeRepository.saveAndFlush(loginType);

        // Get all the loginTypeList
        restLoginTypeMockMvc.perform(get("/api/login-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(loginType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getLoginType() throws Exception {
        // Initialize the database
        loginTypeRepository.saveAndFlush(loginType);

        // Get the loginType
        restLoginTypeMockMvc.perform(get("/api/login-types/{id}", loginType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(loginType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLoginType() throws Exception {
        // Get the loginType
        restLoginTypeMockMvc.perform(get("/api/login-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLoginType() throws Exception {
        // Initialize the database
        loginTypeRepository.saveAndFlush(loginType);
        int databaseSizeBeforeUpdate = loginTypeRepository.findAll().size();

        // Update the loginType
        LoginType updatedLoginType = loginTypeRepository.findOne(loginType.getId());
        updatedLoginType
            .name(UPDATED_NAME);

        restLoginTypeMockMvc.perform(put("/api/login-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLoginType)))
            .andExpect(status().isOk());

        // Validate the LoginType in the database
        List<LoginType> loginTypeList = loginTypeRepository.findAll();
        assertThat(loginTypeList).hasSize(databaseSizeBeforeUpdate);
        LoginType testLoginType = loginTypeList.get(loginTypeList.size() - 1);
        assertThat(testLoginType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingLoginType() throws Exception {
        int databaseSizeBeforeUpdate = loginTypeRepository.findAll().size();

        // Create the LoginType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLoginTypeMockMvc.perform(put("/api/login-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loginType)))
            .andExpect(status().isCreated());

        // Validate the LoginType in the database
        List<LoginType> loginTypeList = loginTypeRepository.findAll();
        assertThat(loginTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLoginType() throws Exception {
        // Initialize the database
        loginTypeRepository.saveAndFlush(loginType);
        int databaseSizeBeforeDelete = loginTypeRepository.findAll().size();

        // Get the loginType
        restLoginTypeMockMvc.perform(delete("/api/login-types/{id}", loginType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LoginType> loginTypeList = loginTypeRepository.findAll();
        assertThat(loginTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LoginType.class);
        LoginType loginType1 = new LoginType();
        loginType1.setId(1L);
        LoginType loginType2 = new LoginType();
        loginType2.setId(loginType1.getId());
        assertThat(loginType1).isEqualTo(loginType2);
        loginType2.setId(2L);
        assertThat(loginType1).isNotEqualTo(loginType2);
        loginType1.setId(null);
        assertThat(loginType1).isNotEqualTo(loginType2);
    }
}
