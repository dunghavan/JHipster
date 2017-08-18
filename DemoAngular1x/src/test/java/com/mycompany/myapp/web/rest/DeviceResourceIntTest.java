package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DemoAngular1XApp;

import com.mycompany.myapp.domain.Device;
import com.mycompany.myapp.repository.DeviceRepository;
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
 * Test class for the DeviceResource REST controller.
 *
 * @see DeviceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoAngular1XApp.class)
public class DeviceResourceIntTest {

    private static final String DEFAULT_DEVICE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DEVICE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IP_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_IP_ADDRESS = "BBBBBBBBBB";

    private static final Long DEFAULT_DOWNLOAD = 1L;
    private static final Long UPDATED_DOWNLOAD = 2L;

    private static final Long DEFAULT_UPLOAD = 1L;
    private static final Long UPDATED_UPLOAD = 2L;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeviceMockMvc;

    private Device device;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DeviceResource deviceResource = new DeviceResource(deviceRepository);
        this.restDeviceMockMvc = MockMvcBuilders.standaloneSetup(deviceResource)
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
    public static Device createEntity(EntityManager em) {
        Device device = new Device()
            .deviceName(DEFAULT_DEVICE_NAME)
            .ipAddress(DEFAULT_IP_ADDRESS)
            .download(DEFAULT_DOWNLOAD)
            .upload(DEFAULT_UPLOAD);
        return device;
    }

    @Before
    public void initTest() {
        device = createEntity(em);
    }

    @Test
    @Transactional
    public void createDevice() throws Exception {
        int databaseSizeBeforeCreate = deviceRepository.findAll().size();

        // Create the Device
        restDeviceMockMvc.perform(post("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isCreated());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeCreate + 1);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getDeviceName()).isEqualTo(DEFAULT_DEVICE_NAME);
        assertThat(testDevice.getIpAddress()).isEqualTo(DEFAULT_IP_ADDRESS);
        assertThat(testDevice.getDownload()).isEqualTo(DEFAULT_DOWNLOAD);
        assertThat(testDevice.getUpload()).isEqualTo(DEFAULT_UPLOAD);
    }

    @Test
    @Transactional
    public void createDeviceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deviceRepository.findAll().size();

        // Create the Device with an existing ID
        device.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeviceMockMvc.perform(post("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDevices() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        // Get all the deviceList
        restDeviceMockMvc.perform(get("/api/devices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(device.getId().intValue())))
            .andExpect(jsonPath("$.[*].deviceName").value(hasItem(DEFAULT_DEVICE_NAME.toString())))
            .andExpect(jsonPath("$.[*].ipAddress").value(hasItem(DEFAULT_IP_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].download").value(hasItem(DEFAULT_DOWNLOAD.intValue())))
            .andExpect(jsonPath("$.[*].upload").value(hasItem(DEFAULT_UPLOAD.intValue())));
    }

    @Test
    @Transactional
    public void getDevice() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        // Get the device
        restDeviceMockMvc.perform(get("/api/devices/{id}", device.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(device.getId().intValue()))
            .andExpect(jsonPath("$.deviceName").value(DEFAULT_DEVICE_NAME.toString()))
            .andExpect(jsonPath("$.ipAddress").value(DEFAULT_IP_ADDRESS.toString()))
            .andExpect(jsonPath("$.download").value(DEFAULT_DOWNLOAD.intValue()))
            .andExpect(jsonPath("$.upload").value(DEFAULT_UPLOAD.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDevice() throws Exception {
        // Get the device
        restDeviceMockMvc.perform(get("/api/devices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDevice() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Update the device
        Device updatedDevice = deviceRepository.findOne(device.getId());
        updatedDevice
            .deviceName(UPDATED_DEVICE_NAME)
            .ipAddress(UPDATED_IP_ADDRESS)
            .download(UPDATED_DOWNLOAD)
            .upload(UPDATED_UPLOAD);

        restDeviceMockMvc.perform(put("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDevice)))
            .andExpect(status().isOk());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getDeviceName()).isEqualTo(UPDATED_DEVICE_NAME);
        assertThat(testDevice.getIpAddress()).isEqualTo(UPDATED_IP_ADDRESS);
        assertThat(testDevice.getDownload()).isEqualTo(UPDATED_DOWNLOAD);
        assertThat(testDevice.getUpload()).isEqualTo(UPDATED_UPLOAD);
    }

    @Test
    @Transactional
    public void updateNonExistingDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Create the Device

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDeviceMockMvc.perform(put("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isCreated());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDevice() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);
        int databaseSizeBeforeDelete = deviceRepository.findAll().size();

        // Get the device
        restDeviceMockMvc.perform(delete("/api/devices/{id}", device.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Device.class);
        Device device1 = new Device();
        device1.setId(1L);
        Device device2 = new Device();
        device2.setId(device1.getId());
        assertThat(device1).isEqualTo(device2);
        device2.setId(2L);
        assertThat(device1).isNotEqualTo(device2);
        device1.setId(null);
        assertThat(device1).isNotEqualTo(device2);
    }
}
