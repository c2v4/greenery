package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.Numeric;
import com.c2v4.greenery.repository.NumericRepository;
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
 * REST controller for managing {@link com.c2v4.greenery.domain.Numeric}.
 */
@RestController
@RequestMapping("/api")
public class NumericResource {

    private final Logger log = LoggerFactory.getLogger(NumericResource.class);

    private static final String ENTITY_NAME = "numeric";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NumericRepository numericRepository;

    public NumericResource(NumericRepository numericRepository) {
        this.numericRepository = numericRepository;
    }

    /**
     * {@code POST  /numerics} : Create a new numeric.
     *
     * @param numeric the numeric to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new numeric, or with status {@code 400 (Bad Request)} if the numeric has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/numerics")
    public ResponseEntity<Numeric> createNumeric(@RequestBody Numeric numeric) throws URISyntaxException {
        log.debug("REST request to save Numeric : {}", numeric);
        if (numeric.getId() != null) {
            throw new BadRequestAlertException("A new numeric cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Numeric result = numericRepository.save(numeric);
        return ResponseEntity.created(new URI("/api/numerics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /numerics} : Updates an existing numeric.
     *
     * @param numeric the numeric to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated numeric,
     * or with status {@code 400 (Bad Request)} if the numeric is not valid,
     * or with status {@code 500 (Internal Server Error)} if the numeric couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/numerics")
    public ResponseEntity<Numeric> updateNumeric(@RequestBody Numeric numeric) throws URISyntaxException {
        log.debug("REST request to update Numeric : {}", numeric);
        if (numeric.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Numeric result = numericRepository.save(numeric);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, numeric.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /numerics} : get all the numerics.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of numerics in body.
     */
    @GetMapping("/numerics")
    public List<Numeric> getAllNumerics() {
        log.debug("REST request to get all Numerics");
        return numericRepository.findAll();
    }

    /**
     * {@code GET  /numerics/:id} : get the "id" numeric.
     *
     * @param id the id of the numeric to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the numeric, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/numerics/{id}")
    public ResponseEntity<Numeric> getNumeric(@PathVariable Long id) {
        log.debug("REST request to get Numeric : {}", id);
        Optional<Numeric> numeric = numericRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(numeric);
    }

    /**
     * {@code DELETE  /numerics/:id} : delete the "id" numeric.
     *
     * @param id the id of the numeric to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/numerics/{id}")
    public ResponseEntity<Void> deleteNumeric(@PathVariable Long id) {
        log.debug("REST request to delete Numeric : {}", id);
        numericRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
