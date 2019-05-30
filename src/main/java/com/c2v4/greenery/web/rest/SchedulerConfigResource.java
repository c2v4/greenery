package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.repository.SchedulerConfigRepository;
import com.c2v4.greenery.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.c2v4.greenery.domain.SchedulerConfig}.
 */
@RestController
@RequestMapping("/api")
public class SchedulerConfigResource {

    private final Logger log = LoggerFactory.getLogger(SchedulerConfigResource.class);

    private static final String ENTITY_NAME = "schedulerConfig";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SchedulerConfigRepository schedulerConfigRepository;

    public SchedulerConfigResource(SchedulerConfigRepository schedulerConfigRepository) {
        this.schedulerConfigRepository = schedulerConfigRepository;
    }

    /**
     * {@code POST  /scheduler-configs} : Create a new schedulerConfig.
     *
     * @param schedulerConfig the schedulerConfig to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new schedulerConfig, or with status {@code 400 (Bad Request)} if the schedulerConfig has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/scheduler-configs")
    public ResponseEntity<SchedulerConfig> createSchedulerConfig(@Valid @RequestBody SchedulerConfig schedulerConfig) throws URISyntaxException {
        log.debug("REST request to save SchedulerConfig : {}", schedulerConfig);
        if (schedulerConfig.getId() != null) {
            throw new BadRequestAlertException("A new schedulerConfig cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchedulerConfig result = schedulerConfigRepository.save(schedulerConfig);
        return ResponseEntity.created(new URI("/api/scheduler-configs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /scheduler-configs} : Updates an existing schedulerConfig.
     *
     * @param schedulerConfig the schedulerConfig to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated schedulerConfig,
     * or with status {@code 400 (Bad Request)} if the schedulerConfig is not valid,
     * or with status {@code 500 (Internal Server Error)} if the schedulerConfig couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/scheduler-configs")
    public ResponseEntity<SchedulerConfig> updateSchedulerConfig(@Valid @RequestBody SchedulerConfig schedulerConfig) throws URISyntaxException {
        log.debug("REST request to update SchedulerConfig : {}", schedulerConfig);
        if (schedulerConfig.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SchedulerConfig result = schedulerConfigRepository.save(schedulerConfig);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, schedulerConfig.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /scheduler-configs} : get all the schedulerConfigs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of schedulerConfigs in body.
     */
    @GetMapping("/scheduler-configs")
    public List<SchedulerConfig> getAllSchedulerConfigs() {
        log.debug("REST request to get all SchedulerConfigs");
        return schedulerConfigRepository.findAll();
    }

    /**
     * {@code GET  /scheduler-configs/:id} : get the "id" schedulerConfig.
     *
     * @param id the id of the schedulerConfig to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the schedulerConfig, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/scheduler-configs/{id}")
    public ResponseEntity<SchedulerConfig> getSchedulerConfig(@PathVariable Long id) {
        log.debug("REST request to get SchedulerConfig : {}", id);
        Optional<SchedulerConfig> schedulerConfig = schedulerConfigRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(schedulerConfig);
    }

    /**
     * {@code DELETE  /scheduler-configs/:id} : delete the "id" schedulerConfig.
     *
     * @param id the id of the schedulerConfig to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/scheduler-configs/{id}")
    public ResponseEntity<Void> deleteSchedulerConfig(@PathVariable Long id) {
        log.debug("REST request to delete SchedulerConfig : {}", id);
        schedulerConfigRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
