package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.domain.Numeric;
import com.c2v4.greenery.repository.NumericRepository;
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

import com.c2v4.greenery.domain.enumeration.Operation;
/**
 * Integration tests for the {@Link NumericResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class NumericResourceIT {

    private static final Float DEFAULT_VALUE = 1F;
    private static final Float UPDATED_VALUE = 2F;

    private static final Operation DEFAULT_OPERATION = Operation.ADD;
    private static final Operation UPDATED_OPERATION = Operation.SUBTRACT;

    @Autowired
    private NumericRepository numericRepository;

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

    private MockMvc restNumericMockMvc;

    private Numeric numeric;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NumericResource numericResource = new NumericResource(numericRepository);
        this.restNumericMockMvc = MockMvcBuilders.standaloneSetup(numericResource)
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
    public static Numeric createEntity(EntityManager em) {
        Numeric numeric = new Numeric()
            .value(DEFAULT_VALUE)
            .operation(DEFAULT_OPERATION);
        return numeric;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Numeric createUpdatedEntity(EntityManager em) {
        Numeric numeric = new Numeric()
            .value(UPDATED_VALUE)
            .operation(UPDATED_OPERATION);
        return numeric;
    }

    @BeforeEach
    public void initTest() {
        numeric = createEntity(em);
    }

    @Test
    @Transactional
    public void createNumeric() throws Exception {
        int databaseSizeBeforeCreate = numericRepository.findAll().size();

        // Create the Numeric
        restNumericMockMvc.perform(post("/api/numerics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(numeric)))
            .andExpect(status().isCreated());

        // Validate the Numeric in the database
        List<Numeric> numericList = numericRepository.findAll();
        assertThat(numericList).hasSize(databaseSizeBeforeCreate + 1);
        Numeric testNumeric = numericList.get(numericList.size() - 1);
        assertThat(testNumeric.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testNumeric.getOperation()).isEqualTo(DEFAULT_OPERATION);
    }

    @Test
    @Transactional
    public void createNumericWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = numericRepository.findAll().size();

        // Create the Numeric with an existing ID
        numeric.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNumericMockMvc.perform(post("/api/numerics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(numeric)))
            .andExpect(status().isBadRequest());

        // Validate the Numeric in the database
        List<Numeric> numericList = numericRepository.findAll();
        assertThat(numericList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNumerics() throws Exception {
        // Initialize the database
        numericRepository.saveAndFlush(numeric);

        // Get all the numericList
        restNumericMockMvc.perform(get("/api/numerics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(numeric.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].operation").value(hasItem(DEFAULT_OPERATION.toString())));
    }
    
    @Test
    @Transactional
    public void getNumeric() throws Exception {
        // Initialize the database
        numericRepository.saveAndFlush(numeric);

        // Get the numeric
        restNumericMockMvc.perform(get("/api/numerics/{id}", numeric.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(numeric.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()))
            .andExpect(jsonPath("$.operation").value(DEFAULT_OPERATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNumeric() throws Exception {
        // Get the numeric
        restNumericMockMvc.perform(get("/api/numerics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNumeric() throws Exception {
        // Initialize the database
        numericRepository.saveAndFlush(numeric);

        int databaseSizeBeforeUpdate = numericRepository.findAll().size();

        // Update the numeric
        Numeric updatedNumeric = numericRepository.findById(numeric.getId()).get();
        // Disconnect from session so that the updates on updatedNumeric are not directly saved in db
        em.detach(updatedNumeric);
        updatedNumeric
            .value(UPDATED_VALUE)
            .operation(UPDATED_OPERATION);

        restNumericMockMvc.perform(put("/api/numerics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNumeric)))
            .andExpect(status().isOk());

        // Validate the Numeric in the database
        List<Numeric> numericList = numericRepository.findAll();
        assertThat(numericList).hasSize(databaseSizeBeforeUpdate);
        Numeric testNumeric = numericList.get(numericList.size() - 1);
        assertThat(testNumeric.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testNumeric.getOperation()).isEqualTo(UPDATED_OPERATION);
    }

    @Test
    @Transactional
    public void updateNonExistingNumeric() throws Exception {
        int databaseSizeBeforeUpdate = numericRepository.findAll().size();

        // Create the Numeric

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNumericMockMvc.perform(put("/api/numerics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(numeric)))
            .andExpect(status().isBadRequest());

        // Validate the Numeric in the database
        List<Numeric> numericList = numericRepository.findAll();
        assertThat(numericList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNumeric() throws Exception {
        // Initialize the database
        numericRepository.saveAndFlush(numeric);

        int databaseSizeBeforeDelete = numericRepository.findAll().size();

        // Delete the numeric
        restNumericMockMvc.perform(delete("/api/numerics/{id}", numeric.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Numeric> numericList = numericRepository.findAll();
        assertThat(numericList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Numeric.class);
        Numeric numeric1 = new Numeric();
        numeric1.setId(1L);
        Numeric numeric2 = new Numeric();
        numeric2.setId(numeric1.getId());
        assertThat(numeric1).isEqualTo(numeric2);
        numeric2.setId(2L);
        assertThat(numeric1).isNotEqualTo(numeric2);
        numeric1.setId(null);
        assertThat(numeric1).isNotEqualTo(numeric2);
    }
}
