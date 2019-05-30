package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.repository.SchedulerConfigRepository;
import com.c2v4.greenery.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.c2v4.greenery.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link SchedulerConfigResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class SchedulerConfigResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SchedulerConfigRepository schedulerConfigRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSchedulerConfigMockMvc;

    private SchedulerConfig schedulerConfig;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SchedulerConfigResource schedulerConfigResource = new SchedulerConfigResource(schedulerConfigRepository);
        this.restSchedulerConfigMockMvc = MockMvcBuilders.standaloneSetup(schedulerConfigResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SchedulerConfig createEntity(EntityManager em) {
        SchedulerConfig schedulerConfig = new SchedulerConfig()
            .type(DEFAULT_TYPE)
            .name(DEFAULT_NAME);
        return schedulerConfig;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SchedulerConfig createUpdatedEntity(EntityManager em) {
        SchedulerConfig schedulerConfig = new SchedulerConfig()
            .type(UPDATED_TYPE)
            .name(UPDATED_NAME);
        return schedulerConfig;
    }

    @BeforeEach
    public void initTest() {
        schedulerConfig = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchedulerConfig() throws Exception {
        int databaseSizeBeforeCreate = schedulerConfigRepository.findAll().size();

        // Create the SchedulerConfig
        restSchedulerConfigMockMvc.perform(post("/api/scheduler-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedulerConfig)))
            .andExpect(status().isCreated());

        // Validate the SchedulerConfig in the database
        List<SchedulerConfig> schedulerConfigList = schedulerConfigRepository.findAll();
        assertThat(schedulerConfigList).hasSize(databaseSizeBeforeCreate + 1);
        SchedulerConfig testSchedulerConfig = schedulerConfigList.get(schedulerConfigList.size() - 1);
        assertThat(testSchedulerConfig.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSchedulerConfig.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSchedulerConfigWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = schedulerConfigRepository.findAll().size();

        // Create the SchedulerConfig with an existing ID
        schedulerConfig.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchedulerConfigMockMvc.perform(post("/api/scheduler-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedulerConfig)))
            .andExpect(status().isBadRequest());

        // Validate the SchedulerConfig in the database
        List<SchedulerConfig> schedulerConfigList = schedulerConfigRepository.findAll();
        assertThat(schedulerConfigList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = schedulerConfigRepository.findAll().size();
        // set the field null
        schedulerConfig.setType(null);

        // Create the SchedulerConfig, which fails.

        restSchedulerConfigMockMvc.perform(post("/api/scheduler-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedulerConfig)))
            .andExpect(status().isBadRequest());

        List<SchedulerConfig> schedulerConfigList = schedulerConfigRepository.findAll();
        assertThat(schedulerConfigList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = schedulerConfigRepository.findAll().size();
        // set the field null
        schedulerConfig.setName(null);

        // Create the SchedulerConfig, which fails.

        restSchedulerConfigMockMvc.perform(post("/api/scheduler-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedulerConfig)))
            .andExpect(status().isBadRequest());

        List<SchedulerConfig> schedulerConfigList = schedulerConfigRepository.findAll();
        assertThat(schedulerConfigList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSchedulerConfigs() throws Exception {
        // Initialize the database
        schedulerConfigRepository.saveAndFlush(schedulerConfig);

        // Get all the schedulerConfigList
        restSchedulerConfigMockMvc.perform(get("/api/scheduler-configs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schedulerConfig.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getSchedulerConfig() throws Exception {
        // Initialize the database
        schedulerConfigRepository.saveAndFlush(schedulerConfig);

        // Get the schedulerConfig
        restSchedulerConfigMockMvc.perform(get("/api/scheduler-configs/{id}", schedulerConfig.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schedulerConfig.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSchedulerConfig() throws Exception {
        // Get the schedulerConfig
        restSchedulerConfigMockMvc.perform(get("/api/scheduler-configs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchedulerConfig() throws Exception {
        // Initialize the database
        schedulerConfigRepository.saveAndFlush(schedulerConfig);

        int databaseSizeBeforeUpdate = schedulerConfigRepository.findAll().size();

        // Update the schedulerConfig
        SchedulerConfig updatedSchedulerConfig = schedulerConfigRepository.findById(schedulerConfig.getId()).get();
        // Disconnect from session so that the updates on updatedSchedulerConfig are not directly saved in db
        em.detach(updatedSchedulerConfig);
        updatedSchedulerConfig
            .type(UPDATED_TYPE)
            .name(UPDATED_NAME);

        restSchedulerConfigMockMvc.perform(put("/api/scheduler-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSchedulerConfig)))
            .andExpect(status().isOk());

        // Validate the SchedulerConfig in the database
        List<SchedulerConfig> schedulerConfigList = schedulerConfigRepository.findAll();
        assertThat(schedulerConfigList).hasSize(databaseSizeBeforeUpdate);
        SchedulerConfig testSchedulerConfig = schedulerConfigList.get(schedulerConfigList.size() - 1);
        assertThat(testSchedulerConfig.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSchedulerConfig.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSchedulerConfig() throws Exception {
        int databaseSizeBeforeUpdate = schedulerConfigRepository.findAll().size();

        // Create the SchedulerConfig

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSchedulerConfigMockMvc.perform(put("/api/scheduler-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedulerConfig)))
            .andExpect(status().isBadRequest());

        // Validate the SchedulerConfig in the database
        List<SchedulerConfig> schedulerConfigList = schedulerConfigRepository.findAll();
        assertThat(schedulerConfigList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSchedulerConfig() throws Exception {
        // Initialize the database
        schedulerConfigRepository.saveAndFlush(schedulerConfig);

        int databaseSizeBeforeDelete = schedulerConfigRepository.findAll().size();

        // Delete the schedulerConfig
        restSchedulerConfigMockMvc.perform(delete("/api/scheduler-configs/{id}", schedulerConfig.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<SchedulerConfig> schedulerConfigList = schedulerConfigRepository.findAll();
        assertThat(schedulerConfigList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchedulerConfig.class);
        SchedulerConfig schedulerConfig1 = new SchedulerConfig();
        schedulerConfig1.setId(1L);
        SchedulerConfig schedulerConfig2 = new SchedulerConfig();
        schedulerConfig2.setId(schedulerConfig1.getId());
        assertThat(schedulerConfig1).isEqualTo(schedulerConfig2);
        schedulerConfig2.setId(2L);
        assertThat(schedulerConfig1).isNotEqualTo(schedulerConfig2);
        schedulerConfig1.setId(null);
        assertThat(schedulerConfig1).isNotEqualTo(schedulerConfig2);
    }
}
