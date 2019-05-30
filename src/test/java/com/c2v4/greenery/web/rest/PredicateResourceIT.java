package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.domain.Predicate;
import com.c2v4.greenery.repository.PredicateRepository;
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

import com.c2v4.greenery.domain.enumeration.PredicateLogic;
/**
 * Integration tests for the {@Link PredicateResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class PredicateResourceIT {

    private static final PredicateLogic DEFAULT_PREDICATE_LOGIC = PredicateLogic.AND;
    private static final PredicateLogic UPDATED_PREDICATE_LOGIC = PredicateLogic.OR;

    @Autowired
    private PredicateRepository predicateRepository;

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

    private MockMvc restPredicateMockMvc;

    private Predicate predicate;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PredicateResource predicateResource = new PredicateResource(predicateRepository);
        this.restPredicateMockMvc = MockMvcBuilders.standaloneSetup(predicateResource)
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
    public static Predicate createEntity(EntityManager em) {
        Predicate predicate = new Predicate()
            .predicateLogic(DEFAULT_PREDICATE_LOGIC);
        return predicate;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Predicate createUpdatedEntity(EntityManager em) {
        Predicate predicate = new Predicate()
            .predicateLogic(UPDATED_PREDICATE_LOGIC);
        return predicate;
    }

    @BeforeEach
    public void initTest() {
        predicate = createEntity(em);
    }

    @Test
    @Transactional
    public void createPredicate() throws Exception {
        int databaseSizeBeforeCreate = predicateRepository.findAll().size();

        // Create the Predicate
        restPredicateMockMvc.perform(post("/api/predicates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(predicate)))
            .andExpect(status().isCreated());

        // Validate the Predicate in the database
        List<Predicate> predicateList = predicateRepository.findAll();
        assertThat(predicateList).hasSize(databaseSizeBeforeCreate + 1);
        Predicate testPredicate = predicateList.get(predicateList.size() - 1);
        assertThat(testPredicate.getPredicateLogic()).isEqualTo(DEFAULT_PREDICATE_LOGIC);
    }

    @Test
    @Transactional
    public void createPredicateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = predicateRepository.findAll().size();

        // Create the Predicate with an existing ID
        predicate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPredicateMockMvc.perform(post("/api/predicates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(predicate)))
            .andExpect(status().isBadRequest());

        // Validate the Predicate in the database
        List<Predicate> predicateList = predicateRepository.findAll();
        assertThat(predicateList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkPredicateLogicIsRequired() throws Exception {
        int databaseSizeBeforeTest = predicateRepository.findAll().size();
        // set the field null
        predicate.setPredicateLogic(null);

        // Create the Predicate, which fails.

        restPredicateMockMvc.perform(post("/api/predicates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(predicate)))
            .andExpect(status().isBadRequest());

        List<Predicate> predicateList = predicateRepository.findAll();
        assertThat(predicateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPredicates() throws Exception {
        // Initialize the database
        predicateRepository.saveAndFlush(predicate);

        // Get all the predicateList
        restPredicateMockMvc.perform(get("/api/predicates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(predicate.getId().intValue())))
            .andExpect(jsonPath("$.[*].predicateLogic").value(hasItem(DEFAULT_PREDICATE_LOGIC.toString())));
    }
    
    @Test
    @Transactional
    public void getPredicate() throws Exception {
        // Initialize the database
        predicateRepository.saveAndFlush(predicate);

        // Get the predicate
        restPredicateMockMvc.perform(get("/api/predicates/{id}", predicate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(predicate.getId().intValue()))
            .andExpect(jsonPath("$.predicateLogic").value(DEFAULT_PREDICATE_LOGIC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPredicate() throws Exception {
        // Get the predicate
        restPredicateMockMvc.perform(get("/api/predicates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePredicate() throws Exception {
        // Initialize the database
        predicateRepository.saveAndFlush(predicate);

        int databaseSizeBeforeUpdate = predicateRepository.findAll().size();

        // Update the predicate
        Predicate updatedPredicate = predicateRepository.findById(predicate.getId()).get();
        // Disconnect from session so that the updates on updatedPredicate are not directly saved in db
        em.detach(updatedPredicate);
        updatedPredicate
            .predicateLogic(UPDATED_PREDICATE_LOGIC);

        restPredicateMockMvc.perform(put("/api/predicates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPredicate)))
            .andExpect(status().isOk());

        // Validate the Predicate in the database
        List<Predicate> predicateList = predicateRepository.findAll();
        assertThat(predicateList).hasSize(databaseSizeBeforeUpdate);
        Predicate testPredicate = predicateList.get(predicateList.size() - 1);
        assertThat(testPredicate.getPredicateLogic()).isEqualTo(UPDATED_PREDICATE_LOGIC);
    }

    @Test
    @Transactional
    public void updateNonExistingPredicate() throws Exception {
        int databaseSizeBeforeUpdate = predicateRepository.findAll().size();

        // Create the Predicate

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPredicateMockMvc.perform(put("/api/predicates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(predicate)))
            .andExpect(status().isBadRequest());

        // Validate the Predicate in the database
        List<Predicate> predicateList = predicateRepository.findAll();
        assertThat(predicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePredicate() throws Exception {
        // Initialize the database
        predicateRepository.saveAndFlush(predicate);

        int databaseSizeBeforeDelete = predicateRepository.findAll().size();

        // Delete the predicate
        restPredicateMockMvc.perform(delete("/api/predicates/{id}", predicate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Predicate> predicateList = predicateRepository.findAll();
        assertThat(predicateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Predicate.class);
        Predicate predicate1 = new Predicate();
        predicate1.setId(1L);
        Predicate predicate2 = new Predicate();
        predicate2.setId(predicate1.getId());
        assertThat(predicate1).isEqualTo(predicate2);
        predicate2.setId(2L);
        assertThat(predicate1).isNotEqualTo(predicate2);
        predicate1.setId(null);
        assertThat(predicate1).isNotEqualTo(predicate2);
    }
}
