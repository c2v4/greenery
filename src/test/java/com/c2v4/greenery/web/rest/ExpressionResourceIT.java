package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.domain.Expression;
import com.c2v4.greenery.repository.ExpressionRepository;
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

import com.c2v4.greenery.domain.enumeration.ExpressionLogic;
/**
 * Integration tests for the {@Link ExpressionResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class ExpressionResourceIT {

    private static final ExpressionLogic DEFAULT_EXRESSION_LOGIC = ExpressionLogic.LESS;
    private static final ExpressionLogic UPDATED_EXRESSION_LOGIC = ExpressionLogic.LESS_OR_EQUAL;

    @Autowired
    private ExpressionRepository expressionRepository;

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

    private MockMvc restExpressionMockMvc;

    private Expression expression;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpressionResource expressionResource = new ExpressionResource(expressionRepository);
        this.restExpressionMockMvc = MockMvcBuilders.standaloneSetup(expressionResource)
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
    public static Expression createEntity(EntityManager em) {
        Expression expression = new Expression()
            .exressionLogic(DEFAULT_EXRESSION_LOGIC);
        return expression;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expression createUpdatedEntity(EntityManager em) {
        Expression expression = new Expression()
            .exressionLogic(UPDATED_EXRESSION_LOGIC);
        return expression;
    }

    @BeforeEach
    public void initTest() {
        expression = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpression() throws Exception {
        int databaseSizeBeforeCreate = expressionRepository.findAll().size();

        // Create the Expression
        restExpressionMockMvc.perform(post("/api/expressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expression)))
            .andExpect(status().isCreated());

        // Validate the Expression in the database
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeCreate + 1);
        Expression testExpression = expressionList.get(expressionList.size() - 1);
        assertThat(testExpression.getExressionLogic()).isEqualTo(DEFAULT_EXRESSION_LOGIC);
    }

    @Test
    @Transactional
    public void createExpressionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expressionRepository.findAll().size();

        // Create the Expression with an existing ID
        expression.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpressionMockMvc.perform(post("/api/expressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expression)))
            .andExpect(status().isBadRequest());

        // Validate the Expression in the database
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExpressions() throws Exception {
        // Initialize the database
        expressionRepository.saveAndFlush(expression);

        // Get all the expressionList
        restExpressionMockMvc.perform(get("/api/expressions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expression.getId().intValue())))
            .andExpect(jsonPath("$.[*].exressionLogic").value(hasItem(DEFAULT_EXRESSION_LOGIC.toString())));
    }
    
    @Test
    @Transactional
    public void getExpression() throws Exception {
        // Initialize the database
        expressionRepository.saveAndFlush(expression);

        // Get the expression
        restExpressionMockMvc.perform(get("/api/expressions/{id}", expression.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expression.getId().intValue()))
            .andExpect(jsonPath("$.exressionLogic").value(DEFAULT_EXRESSION_LOGIC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpression() throws Exception {
        // Get the expression
        restExpressionMockMvc.perform(get("/api/expressions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpression() throws Exception {
        // Initialize the database
        expressionRepository.saveAndFlush(expression);

        int databaseSizeBeforeUpdate = expressionRepository.findAll().size();

        // Update the expression
        Expression updatedExpression = expressionRepository.findById(expression.getId()).get();
        // Disconnect from session so that the updates on updatedExpression are not directly saved in db
        em.detach(updatedExpression);
        updatedExpression
            .exressionLogic(UPDATED_EXRESSION_LOGIC);

        restExpressionMockMvc.perform(put("/api/expressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpression)))
            .andExpect(status().isOk());

        // Validate the Expression in the database
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeUpdate);
        Expression testExpression = expressionList.get(expressionList.size() - 1);
        assertThat(testExpression.getExressionLogic()).isEqualTo(UPDATED_EXRESSION_LOGIC);
    }

    @Test
    @Transactional
    public void updateNonExistingExpression() throws Exception {
        int databaseSizeBeforeUpdate = expressionRepository.findAll().size();

        // Create the Expression

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpressionMockMvc.perform(put("/api/expressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expression)))
            .andExpect(status().isBadRequest());

        // Validate the Expression in the database
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpression() throws Exception {
        // Initialize the database
        expressionRepository.saveAndFlush(expression);

        int databaseSizeBeforeDelete = expressionRepository.findAll().size();

        // Delete the expression
        restExpressionMockMvc.perform(delete("/api/expressions/{id}", expression.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expression.class);
        Expression expression1 = new Expression();
        expression1.setId(1L);
        Expression expression2 = new Expression();
        expression2.setId(expression1.getId());
        assertThat(expression1).isEqualTo(expression2);
        expression2.setId(2L);
        assertThat(expression1).isNotEqualTo(expression2);
        expression1.setId(null);
        assertThat(expression1).isNotEqualTo(expression2);
    }
}
