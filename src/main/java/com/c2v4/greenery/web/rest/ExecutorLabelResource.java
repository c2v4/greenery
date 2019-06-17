package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.ExecutorLabel;
import com.c2v4.greenery.repository.ExecutorLabelRepository;
import com.c2v4.greenery.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing {@link com.c2v4.greenery.domain.ExecutorLabel}.
 */
@RestController
@RequestMapping("/api")
public class ExecutorLabelResource {

    private final Logger log = LoggerFactory.getLogger(ExecutorLabelResource.class);

    private static final String ENTITY_NAME = "executorLabel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExecutorLabelRepository executorLabelRepository;

    public ExecutorLabelResource(ExecutorLabelRepository executorLabelRepository) {
        this.executorLabelRepository = executorLabelRepository;
    }

    /**
     * {@code POST  /executor-labels} : Create a new executorLabel.
     *
     * @param executorLabel the executorLabel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new executorLabel, or with status {@code 400 (Bad Request)} if the executorLabel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/executor-labels")
    public ResponseEntity<ExecutorLabel> createExecutorLabel(@RequestBody ExecutorLabel executorLabel) throws URISyntaxException {
        log.debug("REST request to save ExecutorLabel : {}", executorLabel);
        if (executorLabel.getId() != null) {
            throw new BadRequestAlertException("A new executorLabel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExecutorLabel result = executorLabelRepository.save(executorLabel);
        return ResponseEntity.created(new URI("/api/executor-labels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /executor-labels} : Updates an existing executorLabel.
     *
     * @param executorLabel the executorLabel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated executorLabel,
     * or with status {@code 400 (Bad Request)} if the executorLabel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the executorLabel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/executor-labels")
    public ResponseEntity<ExecutorLabel> updateExecutorLabel(@RequestBody ExecutorLabel executorLabel) throws URISyntaxException {
        log.debug("REST request to update ExecutorLabel : {}", executorLabel);
        if (executorLabel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExecutorLabel result = executorLabelRepository.save(executorLabel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, executorLabel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /executor-labels} : get all the executorLabels.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of executorLabels in body.
     */
    @GetMapping("/executor-labels")
    public List<ExecutorLabel> getAllExecutorLabels(@RequestParam(required = false) String filter) {
        if ("executorconfig-is-null".equals(filter)) {
            log.debug("REST request to get all ExecutorLabels where executorConfig is null");
            return StreamSupport
                .stream(executorLabelRepository.findAll().spliterator(), false)
                .filter(executorLabel -> executorLabel.getExecutorConfig() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ExecutorLabels");
        return executorLabelRepository.findAll();
    }

    /**
     * {@code GET  /executor-labels/:id} : get the "id" executorLabel.
     *
     * @param id the id of the executorLabel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the executorLabel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/executor-labels/{id}")
    public ResponseEntity<ExecutorLabel> getExecutorLabel(@PathVariable Long id) {
        log.debug("REST request to get ExecutorLabel : {}", id);
        Optional<ExecutorLabel> executorLabel = executorLabelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(executorLabel);
    }

    /**
     * {@code DELETE  /executor-labels/:id} : delete the "id" executorLabel.
     *
     * @param id the id of the executorLabel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/executor-labels/{id}")
    public ResponseEntity<Void> deleteExecutorLabel(@PathVariable Long id) {
        log.debug("REST request to delete ExecutorLabel : {}", id);
        executorLabelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
