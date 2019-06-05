package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.domain.ExecutorConfig;
import com.c2v4.greenery.repository.ExecutorConfigRepository;
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
 * Integration tests for the {@Link ExecutorConfigResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class ExecutorConfigResourceIT {

    @Autowired
    private ExecutorConfigRepository executorConfigRepository;

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

    private MockMvc restExecutorConfigMockMvc;

    private ExecutorConfig executorConfig;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExecutorConfigResource executorConfigResource = new ExecutorConfigResource(executorConfigRepository);
        this.restExecutorConfigMockMvc = MockMvcBuilders.standaloneSetup(executorConfigResource)
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
    public static ExecutorConfig createEntity(EntityManager em) {
        ExecutorConfig executorConfig = new ExecutorConfig();
        return executorConfig;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExecutorConfig createUpdatedEntity(EntityManager em) {
        ExecutorConfig executorConfig = new ExecutorConfig();
        return executorConfig;
    }

    @BeforeEach
    public void initTest() {
        executorConfig = createEntity(em);
    }

    @Test
    @Transactional
    public void createExecutorConfig() throws Exception {
        int databaseSizeBeforeCreate = executorConfigRepository.findAll().size();

        // Create the ExecutorConfig
        restExecutorConfigMockMvc.perform(post("/api/executor-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorConfig)))
            .andExpect(status().isCreated());

        // Validate the ExecutorConfig in the database
        List<ExecutorConfig> executorConfigList = executorConfigRepository.findAll();
        assertThat(executorConfigList).hasSize(databaseSizeBeforeCreate + 1);
        ExecutorConfig testExecutorConfig = executorConfigList.get(executorConfigList.size() - 1);
    }

    @Test
    @Transactional
    public void createExecutorConfigWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = executorConfigRepository.findAll().size();

        // Create the ExecutorConfig with an existing ID
        executorConfig.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExecutorConfigMockMvc.perform(post("/api/executor-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorConfig)))
            .andExpect(status().isBadRequest());

        // Validate the ExecutorConfig in the database
        List<ExecutorConfig> executorConfigList = executorConfigRepository.findAll();
        assertThat(executorConfigList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExecutorConfigs() throws Exception {
        // Initialize the database
        executorConfigRepository.saveAndFlush(executorConfig);

        // Get all the executorConfigList
        restExecutorConfigMockMvc.perform(get("/api/executor-configs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(executorConfig.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getExecutorConfig() throws Exception {
        // Initialize the database
        executorConfigRepository.saveAndFlush(executorConfig);

        // Get the executorConfig
        restExecutorConfigMockMvc.perform(get("/api/executor-configs/{id}", executorConfig.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(executorConfig.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExecutorConfig() throws Exception {
        // Get the executorConfig
        restExecutorConfigMockMvc.perform(get("/api/executor-configs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExecutorConfig() throws Exception {
        // Initialize the database
        executorConfigRepository.saveAndFlush(executorConfig);

        int databaseSizeBeforeUpdate = executorConfigRepository.findAll().size();

        // Update the executorConfig
        ExecutorConfig updatedExecutorConfig = executorConfigRepository.findById(executorConfig.getId()).get();
        // Disconnect from session so that the updates on updatedExecutorConfig are not directly saved in db
        em.detach(updatedExecutorConfig);

        restExecutorConfigMockMvc.perform(put("/api/executor-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExecutorConfig)))
            .andExpect(status().isOk());

        // Validate the ExecutorConfig in the database
        List<ExecutorConfig> executorConfigList = executorConfigRepository.findAll();
        assertThat(executorConfigList).hasSize(databaseSizeBeforeUpdate);
        ExecutorConfig testExecutorConfig = executorConfigList.get(executorConfigList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingExecutorConfig() throws Exception {
        int databaseSizeBeforeUpdate = executorConfigRepository.findAll().size();

        // Create the ExecutorConfig

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExecutorConfigMockMvc.perform(put("/api/executor-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorConfig)))
            .andExpect(status().isBadRequest());

        // Validate the ExecutorConfig in the database
        List<ExecutorConfig> executorConfigList = executorConfigRepository.findAll();
        assertThat(executorConfigList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExecutorConfig() throws Exception {
        // Initialize the database
        executorConfigRepository.saveAndFlush(executorConfig);

        int databaseSizeBeforeDelete = executorConfigRepository.findAll().size();

        // Delete the executorConfig
        restExecutorConfigMockMvc.perform(delete("/api/executor-configs/{id}", executorConfig.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ExecutorConfig> executorConfigList = executorConfigRepository.findAll();
        assertThat(executorConfigList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExecutorConfig.class);
        ExecutorConfig executorConfig1 = new ExecutorConfig();
        executorConfig1.setId(1L);
        ExecutorConfig executorConfig2 = new ExecutorConfig();
        executorConfig2.setId(executorConfig1.getId());
        assertThat(executorConfig1).isEqualTo(executorConfig2);
        executorConfig2.setId(2L);
        assertThat(executorConfig1).isNotEqualTo(executorConfig2);
        executorConfig1.setId(null);
        assertThat(executorConfig1).isNotEqualTo(executorConfig2);
    }
}
