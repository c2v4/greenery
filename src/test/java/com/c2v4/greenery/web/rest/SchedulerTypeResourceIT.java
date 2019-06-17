package com.c2v4.greenery.web.rest;

import static com.c2v4.greenery.web.rest.TestUtil.createFormattingConversionService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.c2v4.greenery.GreeneryApp;
import com.c2v4.greenery.service.factory.SupplierFactory;
import com.c2v4.greenery.web.rest.errors.ExceptionTranslator;
import java.util.Map;
import javax.persistence.EntityManager;
import org.hamcrest.Matchers;
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

/**
 * Integration tests for the {@Link SchedulerTypeResource} REST controller.
 */
@SpringBootTest(classes = GreeneryApp.class)
public class SchedulerTypeResourceIT {

    @Autowired
    private Map<String, SupplierFactory> schedulerTypes;

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

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SchedulerTypeResource schedulerTypeResource = new SchedulerTypeResource(
            schedulerTypes);
        this.restSchedulerTypeMockMvc = MockMvcBuilders.standaloneSetup(schedulerTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    @Test
    @Transactional
    public void getAllSchedulerTypes() throws Exception {

        // Get all the schedulerTypeList
        restSchedulerTypeMockMvc.perform(get("/api/scheduler-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect((jsonPath("$", Matchers.hasSize(schedulerTypes.size()))));
    }

}
