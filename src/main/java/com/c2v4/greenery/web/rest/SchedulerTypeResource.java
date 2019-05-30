package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.SchedulerType;
import com.c2v4.greenery.repository.SchedulerTypeRepository;
import com.c2v4.greenery.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.c2v4.greenery.domain.SchedulerType}.
 */
@RestController
@RequestMapping("/api")
public class SchedulerTypeResource {

    private final Logger log = LoggerFactory.getLogger(SchedulerTypeResource.class);

    private static final String ENTITY_NAME = "schedulerType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SchedulerTypeRepository schedulerTypeRepository;

    public SchedulerTypeResource(SchedulerTypeRepository schedulerTypeRepository) {
        this.schedulerTypeRepository = schedulerTypeRepository;
    }

    /**
     * {@code POST  /scheduler-types} : Create a new schedulerType.
     *
     * @param schedulerType the schedulerType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new schedulerType, or with status {@code 400 (Bad Request)} if the schedulerType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/scheduler-types")
    public ResponseEntity<SchedulerType> createSchedulerType(@RequestBody SchedulerType schedulerType) throws URISyntaxException {
        log.debug("REST request to save SchedulerType : {}", schedulerType);
        if (schedulerType.getId() != null) {
            throw new BadRequestAlertException("A new schedulerType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchedulerType result = schedulerTypeRepository.save(schedulerType);
        return ResponseEntity.created(new URI("/api/scheduler-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /scheduler-types} : Updates an existing schedulerType.
     *
     * @param schedulerType the schedulerType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated schedulerType,
     * or with status {@code 400 (Bad Request)} if the schedulerType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the schedulerType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/scheduler-types")
    public ResponseEntity<SchedulerType> updateSchedulerType(@RequestBody SchedulerType schedulerType) throws URISyntaxException {
        log.debug("REST request to update SchedulerType : {}", schedulerType);
        if (schedulerType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SchedulerType result = schedulerTypeRepository.save(schedulerType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, schedulerType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /scheduler-types} : get all the schedulerTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of schedulerTypes in body.
     */
    @GetMapping("/scheduler-types")
    public List<SchedulerType> getAllSchedulerTypes() {
        log.debug("REST request to get all SchedulerTypes");
        return schedulerTypeRepository.findAll();
    }

    /**
     * {@code GET  /scheduler-types/:id} : get the "id" schedulerType.
     *
     * @param id the id of the schedulerType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the schedulerType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/scheduler-types/{id}")
    public ResponseEntity<SchedulerType> getSchedulerType(@PathVariable Long id) {
        log.debug("REST request to get SchedulerType : {}", id);
        Optional<SchedulerType> schedulerType = schedulerTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(schedulerType);
    }

    /**
     * {@code DELETE  /scheduler-types/:id} : delete the "id" schedulerType.
     *
     * @param id the id of the schedulerType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/scheduler-types/{id}")
    public ResponseEntity<Void> deleteSchedulerType(@PathVariable Long id) {
        log.debug("REST request to delete SchedulerType : {}", id);
        schedulerTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
