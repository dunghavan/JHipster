package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HubCamApp;

import com.mycompany.myapp.domain.Camera;
import com.mycompany.myapp.repository.CameraRepository;
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
 * Test class for the CameraResource REST controller.
 *
 * @see CameraResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HubCamApp.class)
public class CameraResourceIntTest {

    private static final String DEFAULT_ALIAS = "AAAAAAAAAA";
    private static final String UPDATED_ALIAS = "BBBBBBBBBB";

    private static final String DEFAULT_LNG = "AAAAAAAAAA";
    private static final String UPDATED_LNG = "BBBBBBBBBB";

    private static final String DEFAULT_LAT = "AAAAAAAAAA";
    private static final String UPDATED_LAT = "BBBBBBBBBB";

    private static final String DEFAULT_ICON = "AAAAAAAAAA";
    private static final String UPDATED_ICON = "BBBBBBBBBB";

    private static final String DEFAULT_ICONCLUSTER = "AAAAAAAAAA";
    private static final String UPDATED_ICONCLUSTER = "BBBBBBBBBB";

    private static final Integer DEFAULT_MAINSTREAM = 11;
    private static final Integer UPDATED_MAINSTREAM = 10;

    private static final Integer DEFAULT_SUBSTREAM = 11;
    private static final Integer UPDATED_SUBSTREAM = 10;

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_UID = "AAAAAAAAAA";
    private static final String UPDATED_UID = "BBBBBBBBBB";

    @Autowired
    private CameraRepository cameraRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCameraMockMvc;

    private Camera camera;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CameraResource cameraResource = new CameraResource(cameraRepository);
        this.restCameraMockMvc = MockMvcBuilders.standaloneSetup(cameraResource)
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
    public static Camera createEntity(EntityManager em) {
        Camera camera = new Camera()
            .alias(DEFAULT_ALIAS)
            .lng(DEFAULT_LNG)
            .lat(DEFAULT_LAT)
            .icon(DEFAULT_ICON)
            .iconcluster(DEFAULT_ICONCLUSTER)
            .mainstream(DEFAULT_MAINSTREAM)
            .substream(DEFAULT_SUBSTREAM)
            .address(DEFAULT_ADDRESS)
            .uid(DEFAULT_UID);
        return camera;
    }

    @Before
    public void initTest() {
        camera = createEntity(em);
    }

    @Test
    @Transactional
    public void createCamera() throws Exception {
        int databaseSizeBeforeCreate = cameraRepository.findAll().size();

        // Create the Camera
        restCameraMockMvc.perform(post("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camera)))
            .andExpect(status().isCreated());

        // Validate the Camera in the database
        List<Camera> cameraList = cameraRepository.findAll();
        assertThat(cameraList).hasSize(databaseSizeBeforeCreate + 1);
        Camera testCamera = cameraList.get(cameraList.size() - 1);
        assertThat(testCamera.getAlias()).isEqualTo(DEFAULT_ALIAS);
        assertThat(testCamera.getLng()).isEqualTo(DEFAULT_LNG);
        assertThat(testCamera.getLat()).isEqualTo(DEFAULT_LAT);
        assertThat(testCamera.getIcon()).isEqualTo(DEFAULT_ICON);
        assertThat(testCamera.getIconcluster()).isEqualTo(DEFAULT_ICONCLUSTER);
        assertThat(testCamera.getMainstream()).isEqualTo(DEFAULT_MAINSTREAM);
        assertThat(testCamera.getSubstream()).isEqualTo(DEFAULT_SUBSTREAM);
        assertThat(testCamera.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testCamera.getUid()).isEqualTo(DEFAULT_UID);
    }

    @Test
    @Transactional
    public void createCameraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cameraRepository.findAll().size();

        // Create the Camera with an existing ID
        camera.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCameraMockMvc.perform(post("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camera)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Camera> cameraList = cameraRepository.findAll();
        assertThat(cameraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAliasIsRequired() throws Exception {
        int databaseSizeBeforeTest = cameraRepository.findAll().size();
        // set the field null
        camera.setAlias(null);

        // Create the Camera, which fails.

        restCameraMockMvc.perform(post("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camera)))
            .andExpect(status().isBadRequest());

        List<Camera> cameraList = cameraRepository.findAll();
        assertThat(cameraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCameras() throws Exception {
        // Initialize the database
        cameraRepository.saveAndFlush(camera);

        // Get all the cameraList
        restCameraMockMvc.perform(get("/api/cameras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(camera.getId().intValue())))
            .andExpect(jsonPath("$.[*].alias").value(hasItem(DEFAULT_ALIAS.toString())))
            .andExpect(jsonPath("$.[*].lng").value(hasItem(DEFAULT_LNG.toString())))
            .andExpect(jsonPath("$.[*].lat").value(hasItem(DEFAULT_LAT.toString())))
            .andExpect(jsonPath("$.[*].icon").value(hasItem(DEFAULT_ICON.toString())))
            .andExpect(jsonPath("$.[*].iconcluster").value(hasItem(DEFAULT_ICONCLUSTER.toString())))
            .andExpect(jsonPath("$.[*].mainstream").value(hasItem(DEFAULT_MAINSTREAM)))
            .andExpect(jsonPath("$.[*].substream").value(hasItem(DEFAULT_SUBSTREAM)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].uid").value(hasItem(DEFAULT_UID.toString())));
    }

    @Test
    @Transactional
    public void getCamera() throws Exception {
        // Initialize the database
        cameraRepository.saveAndFlush(camera);

        // Get the camera
        restCameraMockMvc.perform(get("/api/cameras/{id}", camera.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(camera.getId().intValue()))
            .andExpect(jsonPath("$.alias").value(DEFAULT_ALIAS.toString()))
            .andExpect(jsonPath("$.lng").value(DEFAULT_LNG.toString()))
            .andExpect(jsonPath("$.lat").value(DEFAULT_LAT.toString()))
            .andExpect(jsonPath("$.icon").value(DEFAULT_ICON.toString()))
            .andExpect(jsonPath("$.iconcluster").value(DEFAULT_ICONCLUSTER.toString()))
            .andExpect(jsonPath("$.mainstream").value(DEFAULT_MAINSTREAM))
            .andExpect(jsonPath("$.substream").value(DEFAULT_SUBSTREAM))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.uid").value(DEFAULT_UID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCamera() throws Exception {
        // Get the camera
        restCameraMockMvc.perform(get("/api/cameras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCamera() throws Exception {
        // Initialize the database
        cameraRepository.saveAndFlush(camera);
        int databaseSizeBeforeUpdate = cameraRepository.findAll().size();

        // Update the camera
        Camera updatedCamera = cameraRepository.findOne(camera.getId());
        updatedCamera
            .alias(UPDATED_ALIAS)
            .lng(UPDATED_LNG)
            .lat(UPDATED_LAT)
            .icon(UPDATED_ICON)
            .iconcluster(UPDATED_ICONCLUSTER)
            .mainstream(UPDATED_MAINSTREAM)
            .substream(UPDATED_SUBSTREAM)
            .address(UPDATED_ADDRESS)
            .uid(UPDATED_UID);

        restCameraMockMvc.perform(put("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCamera)))
            .andExpect(status().isOk());

        // Validate the Camera in the database
        List<Camera> cameraList = cameraRepository.findAll();
        assertThat(cameraList).hasSize(databaseSizeBeforeUpdate);
        Camera testCamera = cameraList.get(cameraList.size() - 1);
        assertThat(testCamera.getAlias()).isEqualTo(UPDATED_ALIAS);
        assertThat(testCamera.getLng()).isEqualTo(UPDATED_LNG);
        assertThat(testCamera.getLat()).isEqualTo(UPDATED_LAT);
        assertThat(testCamera.getIcon()).isEqualTo(UPDATED_ICON);
        assertThat(testCamera.getIconcluster()).isEqualTo(UPDATED_ICONCLUSTER);
        assertThat(testCamera.getMainstream()).isEqualTo(UPDATED_MAINSTREAM);
        assertThat(testCamera.getSubstream()).isEqualTo(UPDATED_SUBSTREAM);
        assertThat(testCamera.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testCamera.getUid()).isEqualTo(UPDATED_UID);
    }

    @Test
    @Transactional
    public void updateNonExistingCamera() throws Exception {
        int databaseSizeBeforeUpdate = cameraRepository.findAll().size();

        // Create the Camera

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCameraMockMvc.perform(put("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camera)))
            .andExpect(status().isCreated());

        // Validate the Camera in the database
        List<Camera> cameraList = cameraRepository.findAll();
        assertThat(cameraList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCamera() throws Exception {
        // Initialize the database
        cameraRepository.saveAndFlush(camera);
        int databaseSizeBeforeDelete = cameraRepository.findAll().size();

        // Get the camera
        restCameraMockMvc.perform(delete("/api/cameras/{id}", camera.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Camera> cameraList = cameraRepository.findAll();
        assertThat(cameraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Camera.class);
        Camera camera1 = new Camera();
        camera1.setId(1L);
        Camera camera2 = new Camera();
        camera2.setId(camera1.getId());
        assertThat(camera1).isEqualTo(camera2);
        camera2.setId(2L);
        assertThat(camera1).isNotEqualTo(camera2);
        camera1.setId(null);
        assertThat(camera1).isNotEqualTo(camera2);
    }
}
