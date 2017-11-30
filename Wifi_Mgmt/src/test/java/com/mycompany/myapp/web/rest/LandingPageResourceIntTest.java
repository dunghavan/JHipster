package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.WifiMgmtApp;

import com.mycompany.myapp.domain.LandingPage;
import com.mycompany.myapp.repository.LandingPageRepository;
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
 * Test class for the LandingPageResource REST controller.
 *
 * @see LandingPageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WifiMgmtApp.class)
public class LandingPageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_1 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_1 = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_2 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_2 = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_3 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_3 = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_1 = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_2 = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_3 = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_3 = "BBBBBBBBBB";

    @Autowired
    private LandingPageRepository landingPageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLandingPageMockMvc;

    private LandingPage landingPage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        LandingPageResource landingPageResource = new LandingPageResource(landingPageRepository);
        this.restLandingPageMockMvc = MockMvcBuilders.standaloneSetup(landingPageResource)
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
    public static LandingPage createEntity(EntityManager em) {
        LandingPage landingPage = new LandingPage()
            .name(DEFAULT_NAME)
            .text1(DEFAULT_TEXT_1)
            .text2(DEFAULT_TEXT_2)
            .text3(DEFAULT_TEXT_3)
            .image1(DEFAULT_IMAGE_1)
            .image2(DEFAULT_IMAGE_2)
            .image3(DEFAULT_IMAGE_3);
        return landingPage;
    }

    @Before
    public void initTest() {
        landingPage = createEntity(em);
    }

    @Test
    @Transactional
    public void createLandingPage() throws Exception {
        int databaseSizeBeforeCreate = landingPageRepository.findAll().size();

        // Create the LandingPage
        restLandingPageMockMvc.perform(post("/api/landing-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(landingPage)))
            .andExpect(status().isCreated());

        // Validate the LandingPage in the database
        List<LandingPage> landingPageList = landingPageRepository.findAll();
        assertThat(landingPageList).hasSize(databaseSizeBeforeCreate + 1);
        LandingPage testLandingPage = landingPageList.get(landingPageList.size() - 1);
        assertThat(testLandingPage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLandingPage.getText1()).isEqualTo(DEFAULT_TEXT_1);
        assertThat(testLandingPage.getText2()).isEqualTo(DEFAULT_TEXT_2);
        assertThat(testLandingPage.getText3()).isEqualTo(DEFAULT_TEXT_3);
        assertThat(testLandingPage.getImage1()).isEqualTo(DEFAULT_IMAGE_1);
        assertThat(testLandingPage.getImage2()).isEqualTo(DEFAULT_IMAGE_2);
        assertThat(testLandingPage.getImage3()).isEqualTo(DEFAULT_IMAGE_3);
    }

    @Test
    @Transactional
    public void createLandingPageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = landingPageRepository.findAll().size();

        // Create the LandingPage with an existing ID
        landingPage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLandingPageMockMvc.perform(post("/api/landing-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(landingPage)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<LandingPage> landingPageList = landingPageRepository.findAll();
        assertThat(landingPageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLandingPages() throws Exception {
        // Initialize the database
        landingPageRepository.saveAndFlush(landingPage);

        // Get all the landingPageList
        restLandingPageMockMvc.perform(get("/api/landing-pages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(landingPage.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].text1").value(hasItem(DEFAULT_TEXT_1.toString())))
            .andExpect(jsonPath("$.[*].text2").value(hasItem(DEFAULT_TEXT_2.toString())))
            .andExpect(jsonPath("$.[*].text3").value(hasItem(DEFAULT_TEXT_3.toString())))
            .andExpect(jsonPath("$.[*].image1").value(hasItem(DEFAULT_IMAGE_1.toString())))
            .andExpect(jsonPath("$.[*].image2").value(hasItem(DEFAULT_IMAGE_2.toString())))
            .andExpect(jsonPath("$.[*].image3").value(hasItem(DEFAULT_IMAGE_3.toString())));
    }

    @Test
    @Transactional
    public void getLandingPage() throws Exception {
        // Initialize the database
        landingPageRepository.saveAndFlush(landingPage);

        // Get the landingPage
        restLandingPageMockMvc.perform(get("/api/landing-pages/{id}", landingPage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(landingPage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.text1").value(DEFAULT_TEXT_1.toString()))
            .andExpect(jsonPath("$.text2").value(DEFAULT_TEXT_2.toString()))
            .andExpect(jsonPath("$.text3").value(DEFAULT_TEXT_3.toString()))
            .andExpect(jsonPath("$.image1").value(DEFAULT_IMAGE_1.toString()))
            .andExpect(jsonPath("$.image2").value(DEFAULT_IMAGE_2.toString()))
            .andExpect(jsonPath("$.image3").value(DEFAULT_IMAGE_3.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLandingPage() throws Exception {
        // Get the landingPage
        restLandingPageMockMvc.perform(get("/api/landing-pages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLandingPage() throws Exception {
        // Initialize the database
        landingPageRepository.saveAndFlush(landingPage);
        int databaseSizeBeforeUpdate = landingPageRepository.findAll().size();

        // Update the landingPage
        LandingPage updatedLandingPage = landingPageRepository.findOne(landingPage.getId());
        updatedLandingPage
            .name(UPDATED_NAME)
            .text1(UPDATED_TEXT_1)
            .text2(UPDATED_TEXT_2)
            .text3(UPDATED_TEXT_3)
            .image1(UPDATED_IMAGE_1)
            .image2(UPDATED_IMAGE_2)
            .image3(UPDATED_IMAGE_3);

        restLandingPageMockMvc.perform(put("/api/landing-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLandingPage)))
            .andExpect(status().isOk());

        // Validate the LandingPage in the database
        List<LandingPage> landingPageList = landingPageRepository.findAll();
        assertThat(landingPageList).hasSize(databaseSizeBeforeUpdate);
        LandingPage testLandingPage = landingPageList.get(landingPageList.size() - 1);
        assertThat(testLandingPage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLandingPage.getText1()).isEqualTo(UPDATED_TEXT_1);
        assertThat(testLandingPage.getText2()).isEqualTo(UPDATED_TEXT_2);
        assertThat(testLandingPage.getText3()).isEqualTo(UPDATED_TEXT_3);
        assertThat(testLandingPage.getImage1()).isEqualTo(UPDATED_IMAGE_1);
        assertThat(testLandingPage.getImage2()).isEqualTo(UPDATED_IMAGE_2);
        assertThat(testLandingPage.getImage3()).isEqualTo(UPDATED_IMAGE_3);
    }

    @Test
    @Transactional
    public void updateNonExistingLandingPage() throws Exception {
        int databaseSizeBeforeUpdate = landingPageRepository.findAll().size();

        // Create the LandingPage

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLandingPageMockMvc.perform(put("/api/landing-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(landingPage)))
            .andExpect(status().isCreated());

        // Validate the LandingPage in the database
        List<LandingPage> landingPageList = landingPageRepository.findAll();
        assertThat(landingPageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLandingPage() throws Exception {
        // Initialize the database
        landingPageRepository.saveAndFlush(landingPage);
        int databaseSizeBeforeDelete = landingPageRepository.findAll().size();

        // Get the landingPage
        restLandingPageMockMvc.perform(delete("/api/landing-pages/{id}", landingPage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LandingPage> landingPageList = landingPageRepository.findAll();
        assertThat(landingPageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LandingPage.class);
        LandingPage landingPage1 = new LandingPage();
        landingPage1.setId(1L);
        LandingPage landingPage2 = new LandingPage();
        landingPage2.setId(landingPage1.getId());
        assertThat(landingPage1).isEqualTo(landingPage2);
        landingPage2.setId(2L);
        assertThat(landingPage1).isNotEqualTo(landingPage2);
        landingPage1.setId(null);
        assertThat(landingPage1).isNotEqualTo(landingPage2);
    }
}
