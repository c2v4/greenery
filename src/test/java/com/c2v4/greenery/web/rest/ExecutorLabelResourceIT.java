package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.domain.ExecutorLabel;
import com.c2v4.greenery.repository.ExecutorLabelRepository;
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
 * Integration tests for the {@Link ExecutorLabelResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class ExecutorLabelResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ExecutorLabelRepository executorLabelRepository;

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

    private MockMvc restExecutorLabelMockMvc;

    private ExecutorLabel executorLabel;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExecutorLabelResource executorLabelResource = new ExecutorLabelResource(executorLabelRepository);
        this.restExecutorLabelMockMvc = MockMvcBuilders.standaloneSetup(executorLabelResource)
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
    public static ExecutorLabel createEntity(EntityManager em) {
        ExecutorLabel executorLabel = new ExecutorLabel()
            .name(DEFAULT_NAME);
        return executorLabel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExecutorLabel createUpdatedEntity(EntityManager em) {
        ExecutorLabel executorLabel = new ExecutorLabel()
            .name(UPDATED_NAME);
        return executorLabel;
    }

    @BeforeEach
    public void initTest() {
        executorLabel = createEntity(em);
    }

    @Test
    @Transactional
    public void createExecutorLabel() throws Exception {
        int databaseSizeBeforeCreate = executorLabelRepository.findAll().size();

        // Create the ExecutorLabel
        restExecutorLabelMockMvc.perform(post("/api/executor-labels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorLabel)))
            .andExpect(status().isCreated());

        // Validate the ExecutorLabel in the database
        List<ExecutorLabel> executorLabelList = executorLabelRepository.findAll();
        assertThat(executorLabelList).hasSize(databaseSizeBeforeCreate + 1);
        ExecutorLabel testExecutorLabel = executorLabelList.get(executorLabelList.size() - 1);
        assertThat(testExecutorLabel.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createExecutorLabelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = executorLabelRepository.findAll().size();

        // Create the ExecutorLabel with an existing ID
        executorLabel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExecutorLabelMockMvc.perform(post("/api/executor-labels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorLabel)))
            .andExpect(status().isBadRequest());

        // Validate the ExecutorLabel in the database
        List<ExecutorLabel> executorLabelList = executorLabelRepository.findAll();
        assertThat(executorLabelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExecutorLabels() throws Exception {
        // Initialize the database
        executorLabelRepository.saveAndFlush(executorLabel);

        // Get all the executorLabelList
        restExecutorLabelMockMvc.perform(get("/api/executor-labels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(executorLabel.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getExecutorLabel() throws Exception {
        // Initialize the database
        executorLabelRepository.saveAndFlush(executorLabel);

        // Get the executorLabel
        restExecutorLabelMockMvc.perform(get("/api/executor-labels/{id}", executorLabel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(executorLabel.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExecutorLabel() throws Exception {
        // Get the executorLabel
        restExecutorLabelMockMvc.perform(get("/api/executor-labels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExecutorLabel() throws Exception {
        // Initialize the database
        executorLabelRepository.saveAndFlush(executorLabel);

        int databaseSizeBeforeUpdate = executorLabelRepository.findAll().size();

        // Update the executorLabel
        ExecutorLabel updatedExecutorLabel = executorLabelRepository.findById(executorLabel.getId()).get();
        // Disconnect from session so that the updates on updatedExecutorLabel are not directly saved in db
        em.detach(updatedExecutorLabel);
        updatedExecutorLabel
            .name(UPDATED_NAME);

        restExecutorLabelMockMvc.perform(put("/api/executor-labels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExecutorLabel)))
            .andExpect(status().isOk());

        // Validate the ExecutorLabel in the database
        List<ExecutorLabel> executorLabelList = executorLabelRepository.findAll();
        assertThat(executorLabelList).hasSize(databaseSizeBeforeUpdate);
        ExecutorLabel testExecutorLabel = executorLabelList.get(executorLabelList.size() - 1);
        assertThat(testExecutorLabel.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingExecutorLabel() throws Exception {
        int databaseSizeBeforeUpdate = executorLabelRepository.findAll().size();

        // Create the ExecutorLabel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExecutorLabelMockMvc.perform(put("/api/executor-labels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(executorLabel)))
            .andExpect(status().isBadRequest());

        // Validate the ExecutorLabel in the database
        List<ExecutorLabel> executorLabelList = executorLabelRepository.findAll();
        assertThat(executorLabelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExecutorLabel() throws Exception {
        // Initialize the database
        executorLabelRepository.saveAndFlush(executorLabel);

        int databaseSizeBeforeDelete = executorLabelRepository.findAll().size();

        // Delete the executorLabel
        restExecutorLabelMockMvc.perform(delete("/api/executor-labels/{id}", executorLabel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ExecutorLabel> executorLabelList = executorLabelRepository.findAll();
        assertThat(executorLabelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExecutorLabel.class);
        ExecutorLabel executorLabel1 = new ExecutorLabel();
        executorLabel1.setId(1L);
        ExecutorLabel executorLabel2 = new ExecutorLabel();
        executorLabel2.setId(executorLabel1.getId());
        assertThat(executorLabel1).isEqualTo(executorLabel2);
        executorLabel2.setId(2L);
        assertThat(executorLabel1).isNotEqualTo(executorLabel2);
        executorLabel1.setId(null);
        assertThat(executorLabel1).isNotEqualTo(executorLabel2);
    }
}
