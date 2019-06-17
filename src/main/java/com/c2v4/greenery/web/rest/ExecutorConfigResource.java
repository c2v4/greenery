package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.ExecutorConfig;
import com.c2v4.greenery.repository.ExecutorConfigRepository;
import com.c2v4.greenery.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing {@link com.c2v4.greenery.domain.ExecutorConfig}.
 */
@RestController
@RequestMapping("/api")
public class ExecutorConfigResource {

    private final Logger log = LoggerFactory.getLogger(ExecutorConfigResource.class);

    private static final String ENTITY_NAME = "executorConfig";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExecutorConfigRepository executorConfigRepository;

    public ExecutorConfigResource(ExecutorConfigRepository executorConfigRepository) {
        this.executorConfigRepository = executorConfigRepository;
    }

    /**
     * {@code POST  /executor-configs} : Create a new executorConfig.
     *
     * @param executorConfig the executorConfig to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new executorConfig, or with status {@code 400 (Bad Request)} if the executorConfig has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/executor-configs")
    public ResponseEntity<ExecutorConfig> createExecutorConfig(@RequestBody ExecutorConfig executorConfig) throws URISyntaxException {
        log.debug("REST request to save ExecutorConfig : {}", executorConfig);
        if (executorConfig.getId() != null) {
            throw new BadRequestAlertException("A new executorConfig cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExecutorConfig result = executorConfigRepository.save(executorConfig);
        return ResponseEntity.created(new URI("/api/executor-configs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /executor-configs} : Updates an existing executorConfig.
     *
     * @param executorConfig the executorConfig to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated executorConfig,
     * or with status {@code 400 (Bad Request)} if the executorConfig is not valid,
     * or with status {@code 500 (Internal Server Error)} if the executorConfig couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/executor-configs")
    public ResponseEntity<ExecutorConfig> updateExecutorConfig(@RequestBody ExecutorConfig executorConfig) throws URISyntaxException {
        log.debug("REST request to update ExecutorConfig : {}", executorConfig);
        if (executorConfig.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExecutorConfig result = executorConfigRepository.save(executorConfig);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, executorConfig.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /executor-configs} : get all the executorConfigs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of executorConfigs in body.
     */
    @GetMapping("/executor-configs")
    public List<ExecutorConfig> getAllExecutorConfigs() {
        log.debug("REST request to get all ExecutorConfigs");
        return executorConfigRepository.findAll();
    }

    /**
     * {@code GET  /executor-configs/:id} : get the "id" executorConfig.
     *
     * @param id the id of the executorConfig to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the executorConfig, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/executor-configs/{id}")
    public ResponseEntity<ExecutorConfig> getExecutorConfig(@PathVariable Long id) {
        log.debug("REST request to get ExecutorConfig : {}", id);
        Optional<ExecutorConfig> executorConfig = executorConfigRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(executorConfig);
    }

    /**
     * {@code DELETE  /executor-configs/:id} : delete the "id" executorConfig.
     *
     * @param id the id of the executorConfig to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/executor-configs/{id}")
    public ResponseEntity<Void> deleteExecutorConfig(@PathVariable Long id) {
        log.debug("REST request to delete ExecutorConfig : {}", id);
        executorConfigRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
