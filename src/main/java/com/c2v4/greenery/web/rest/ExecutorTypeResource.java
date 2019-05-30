package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.ExecutorType;
import com.c2v4.greenery.repository.ExecutorTypeRepository;
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
 * REST controller for managing {@link com.c2v4.greenery.domain.ExecutorType}.
 */
@RestController
@RequestMapping("/api")
public class ExecutorTypeResource {

    private final Logger log = LoggerFactory.getLogger(ExecutorTypeResource.class);

    private static final String ENTITY_NAME = "executorType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExecutorTypeRepository executorTypeRepository;

    public ExecutorTypeResource(ExecutorTypeRepository executorTypeRepository) {
        this.executorTypeRepository = executorTypeRepository;
    }

    /**
     * {@code POST  /executor-types} : Create a new executorType.
     *
     * @param executorType the executorType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new executorType, or with status {@code 400 (Bad Request)} if the executorType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/executor-types")
    public ResponseEntity<ExecutorType> createExecutorType(@RequestBody ExecutorType executorType) throws URISyntaxException {
        log.debug("REST request to save ExecutorType : {}", executorType);
        if (executorType.getId() != null) {
            throw new BadRequestAlertException("A new executorType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExecutorType result = executorTypeRepository.save(executorType);
        return ResponseEntity.created(new URI("/api/executor-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /executor-types} : Updates an existing executorType.
     *
     * @param executorType the executorType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated executorType,
     * or with status {@code 400 (Bad Request)} if the executorType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the executorType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/executor-types")
    public ResponseEntity<ExecutorType> updateExecutorType(@RequestBody ExecutorType executorType) throws URISyntaxException {
        log.debug("REST request to update ExecutorType : {}", executorType);
        if (executorType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExecutorType result = executorTypeRepository.save(executorType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, executorType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /executor-types} : get all the executorTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of executorTypes in body.
     */
    @GetMapping("/executor-types")
    public List<ExecutorType> getAllExecutorTypes() {
        log.debug("REST request to get all ExecutorTypes");
        return executorTypeRepository.findAll();
    }

    /**
     * {@code GET  /executor-types/:id} : get the "id" executorType.
     *
     * @param id the id of the executorType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the executorType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/executor-types/{id}")
    public ResponseEntity<ExecutorType> getExecutorType(@PathVariable Long id) {
        log.debug("REST request to get ExecutorType : {}", id);
        Optional<ExecutorType> executorType = executorTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(executorType);
    }

    /**
     * {@code DELETE  /executor-types/:id} : delete the "id" executorType.
     *
     * @param id the id of the executorType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/executor-types/{id}")
    public ResponseEntity<Void> deleteExecutorType(@PathVariable Long id) {
        log.debug("REST request to delete ExecutorType : {}", id);
        executorTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
