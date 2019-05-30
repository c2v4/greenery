package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.domain.ExecutorType;
import com.c2v4.greenery.repository.ExecutorTypeRepository;
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
 * Integration tests for the {@Link ExecutorTypeResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class ExecutorTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ExecutorTypeRepository executorTypeRepository;

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

    private MockMvc restExecutorTypeMockMvc;

    private ExecutorType executorType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExecutorTypeResource executorTypeResource = new ExecutorTypeResource(executorTypeRepository);
        this.restExecutorTypeMockMvc = MockMvcBuilders.standaloneSetup(executorTypeResource)
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
    public static ExecutorType createEntity(EntityManager em) {
        ExecutorType executorType = new ExecutorType()
            .name(DEFAULT_NAME);
        return executorType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExecutorType createUpdatedEntity(EntityManager em) {
        ExecutorType executorType = new ExecutorType()
            .name(UPDATED_NAME);
        return executorType;
    }

    @BeforeEach
    public void initTest() {
        executorType = createEntity(em);
    }

    @Test
    @Transactional
    public void createExecutorType() throws Exception {
        int databaseSizeBeforeCreate = executorTypeRepository.findAll().size();

        // Create the ExecutorType
        restExecutorTypeMockMvc.perform(post("/api/executor-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorType)))
            .andExpect(status().isCreated());

        // Validate the ExecutorType in the database
        List<ExecutorType> executorTypeList = executorTypeRepository.findAll();
        assertThat(executorTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ExecutorType testExecutorType = executorTypeList.get(executorTypeList.size() - 1);
        assertThat(testExecutorType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createExecutorTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = executorTypeRepository.findAll().size();

        // Create the ExecutorType with an existing ID
        executorType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExecutorTypeMockMvc.perform(post("/api/executor-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorType)))
            .andExpect(status().isBadRequest());

        // Validate the ExecutorType in the database
        List<ExecutorType> executorTypeList = executorTypeRepository.findAll();
        assertThat(executorTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExecutorTypes() throws Exception {
        // Initialize the database
        executorTypeRepository.saveAndFlush(executorType);

        // Get all the executorTypeList
        restExecutorTypeMockMvc.perform(get("/api/executor-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(executorType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getExecutorType() throws Exception {
        // Initialize the database
        executorTypeRepository.saveAndFlush(executorType);

        // Get the executorType
        restExecutorTypeMockMvc.perform(get("/api/executor-types/{id}", executorType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(executorType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExecutorType() throws Exception {
        // Get the executorType
        restExecutorTypeMockMvc.perform(get("/api/executor-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExecutorType() throws Exception {
        // Initialize the database
        executorTypeRepository.saveAndFlush(executorType);

        int databaseSizeBeforeUpdate = executorTypeRepository.findAll().size();

        // Update the executorType
        ExecutorType updatedExecutorType = executorTypeRepository.findById(executorType.getId()).get();
        // Disconnect from session so that the updates on updatedExecutorType are not directly saved in db
        em.detach(updatedExecutorType);
        updatedExecutorType
            .name(UPDATED_NAME);

        restExecutorTypeMockMvc.perform(put("/api/executor-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExecutorType)))
            .andExpect(status().isOk());

        // Validate the ExecutorType in the database
        List<ExecutorType> executorTypeList = executorTypeRepository.findAll();
        assertThat(executorTypeList).hasSize(databaseSizeBeforeUpdate);
        ExecutorType testExecutorType = executorTypeList.get(executorTypeList.size() - 1);
        assertThat(testExecutorType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingExecutorType() throws Exception {
        int databaseSizeBeforeUpdate = executorTypeRepository.findAll().size();

        // Create the ExecutorType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExecutorTypeMockMvc.perform(put("/api/executor-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorType)))
            .andExpect(status().isBadRequest());

        // Validate the ExecutorType in the database
        List<ExecutorType> executorTypeList = executorTypeRepository.findAll();
        assertThat(executorTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExecutorType() throws Exception {
        // Initialize the database
        executorTypeRepository.saveAndFlush(executorType);

        int databaseSizeBeforeDelete = executorTypeRepository.findAll().size();

        // Delete the executorType
        restExecutorTypeMockMvc.perform(delete("/api/executor-types/{id}", executorType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ExecutorType> executorTypeList = executorTypeRepository.findAll();
        assertThat(executorTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExecutorType.class);
        ExecutorType executorType1 = new ExecutorType();
        executorType1.setId(1L);
        ExecutorType executorType2 = new ExecutorType();
        executorType2.setId(executorType1.getId());
        assertThat(executorType1).isEqualTo(executorType2);
        executorType2.setId(2L);
        assertThat(executorType1).isNotEqualTo(executorType2);
        executorType1.setId(null);
        assertThat(executorType1).isNotEqualTo(executorType2);
    }
}
