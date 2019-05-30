package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.domain.SchedulerType;
import com.c2v4.greenery.repository.SchedulerTypeRepository;
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
 * Integration tests for the {@Link SchedulerTypeResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class SchedulerTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SchedulerTypeRepository schedulerTypeRepository;

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

    private MockMvc restSchedulerTypeMockMvc;

    private SchedulerType schedulerType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SchedulerTypeResource schedulerTypeResource = new SchedulerTypeResource(schedulerTypeRepository);
        this.restSchedulerTypeMockMvc = MockMvcBuilders.standaloneSetup(schedulerTypeResource)
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
    public static SchedulerType createEntity(EntityManager em) {
        SchedulerType schedulerType = new SchedulerType()
            .name(DEFAULT_NAME);
        return schedulerType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SchedulerType createUpdatedEntity(EntityManager em) {
        SchedulerType schedulerType = new SchedulerType()
            .name(UPDATED_NAME);
        return schedulerType;
    }

    @BeforeEach
    public void initTest() {
        schedulerType = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchedulerType() throws Exception {
        int databaseSizeBeforeCreate = schedulerTypeRepository.findAll().size();

        // Create the SchedulerType
        restSchedulerTypeMockMvc.perform(post("/api/scheduler-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedulerType)))
            .andExpect(status().isCreated());

        // Validate the SchedulerType in the database
        List<SchedulerType> schedulerTypeList = schedulerTypeRepository.findAll();
        assertThat(schedulerTypeList).hasSize(databaseSizeBeforeCreate + 1);
        SchedulerType testSchedulerType = schedulerTypeList.get(schedulerTypeList.size() - 1);
        assertThat(testSchedulerType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSchedulerTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = schedulerTypeRepository.findAll().size();

        // Create the SchedulerType with an existing ID
        schedulerType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchedulerTypeMockMvc.perform(post("/api/scheduler-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedulerType)))
            .andExpect(status().isBadRequest());

        // Validate the SchedulerType in the database
        List<SchedulerType> schedulerTypeList = schedulerTypeRepository.findAll();
        assertThat(schedulerTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSchedulerTypes() throws Exception {
        // Initialize the database
        schedulerTypeRepository.saveAndFlush(schedulerType);

        // Get all the schedulerTypeList
        restSchedulerTypeMockMvc.perform(get("/api/scheduler-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schedulerType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getSchedulerType() throws Exception {
        // Initialize the database
        schedulerTypeRepository.saveAndFlush(schedulerType);

        // Get the schedulerType
        restSchedulerTypeMockMvc.perform(get("/api/scheduler-types/{id}", schedulerType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schedulerType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSchedulerType() throws Exception {
        // Get the schedulerType
        restSchedulerTypeMockMvc.perform(get("/api/scheduler-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchedulerType() throws Exception {
        // Initialize the database
        schedulerTypeRepository.saveAndFlush(schedulerType);

        int databaseSizeBeforeUpdate = schedulerTypeRepository.findAll().size();

        // Update the schedulerType
        SchedulerType updatedSchedulerType = schedulerTypeRepository.findById(schedulerType.getId()).get();
        // Disconnect from session so that the updates on updatedSchedulerType are not directly saved in db
        em.detach(updatedSchedulerType);
        updatedSchedulerType
            .name(UPDATED_NAME);

        restSchedulerTypeMockMvc.perform(put("/api/scheduler-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSchedulerType)))
            .andExpect(status().isOk());

        // Validate the SchedulerType in the database
        List<SchedulerType> schedulerTypeList = schedulerTypeRepository.findAll();
        assertThat(schedulerTypeList).hasSize(databaseSizeBeforeUpdate);
        SchedulerType testSchedulerType = schedulerTypeList.get(schedulerTypeList.size() - 1);
        assertThat(testSchedulerType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSchedulerType() throws Exception {
        int databaseSizeBeforeUpdate = schedulerTypeRepository.findAll().size();

        // Create the SchedulerType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSchedulerTypeMockMvc.perform(put("/api/scheduler-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schedulerType)))
            .andExpect(status().isBadRequest());

        // Validate the SchedulerType in the database
        List<SchedulerType> schedulerTypeList = schedulerTypeRepository.findAll();
        assertThat(schedulerTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSchedulerType() throws Exception {
        // Initialize the database
        schedulerTypeRepository.saveAndFlush(schedulerType);

        int databaseSizeBeforeDelete = schedulerTypeRepository.findAll().size();

        // Delete the schedulerType
        restSchedulerTypeMockMvc.perform(delete("/api/scheduler-types/{id}", schedulerType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<SchedulerType> schedulerTypeList = schedulerTypeRepository.findAll();
        assertThat(schedulerTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchedulerType.class);
        SchedulerType schedulerType1 = new SchedulerType();
        schedulerType1.setId(1L);
        SchedulerType schedulerType2 = new SchedulerType();
        schedulerType2.setId(schedulerType1.getId());
        assertThat(schedulerType1).isEqualTo(schedulerType2);
        schedulerType2.setId(2L);
        assertThat(schedulerType1).isNotEqualTo(schedulerType2);
        schedulerType1.setId(null);
        assertThat(schedulerType1).isNotEqualTo(schedulerType2);
    }
}
