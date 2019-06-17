package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.Predicate;
import com.c2v4.greenery.repository.PredicateRepository;
import com.c2v4.greenery.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.validation.Valid;
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
 * REST controller for managing {@link com.c2v4.greenery.domain.Predicate}.
 */
@RestController
@RequestMapping("/api")
public class PredicateResource {

    private final Logger log = LoggerFactory.getLogger(PredicateResource.class);

    private static final String ENTITY_NAME = "predicate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PredicateRepository predicateRepository;

    public PredicateResource(PredicateRepository predicateRepository) {
        this.predicateRepository = predicateRepository;
    }

    /**
     * {@code POST  /predicates} : Create a new predicate.
     *
     * @param predicate the predicate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new predicate, or with status {@code 400 (Bad Request)} if the predicate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/predicates")
    public ResponseEntity<Predicate> createPredicate(@Valid @RequestBody Predicate predicate) throws URISyntaxException {
        log.debug("REST request to save Predicate : {}", predicate);
        if (predicate.getId() != null) {
            throw new BadRequestAlertException("A new predicate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Predicate result = predicateRepository.save(predicate);
        return ResponseEntity.created(new URI("/api/predicates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /predicates} : Updates an existing predicate.
     *
     * @param predicate the predicate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated predicate,
     * or with status {@code 400 (Bad Request)} if the predicate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the predicate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/predicates")
    public ResponseEntity<Predicate> updatePredicate(@Valid @RequestBody Predicate predicate) throws URISyntaxException {
        log.debug("REST request to update Predicate : {}", predicate);
        if (predicate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Predicate result = predicateRepository.save(predicate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, predicate.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /predicates} : get all the predicates.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of predicates in body.
     */
    @GetMapping("/predicates")
    public List<Predicate> getAllPredicates(@RequestParam(required = false) String filter) {
        if ("rule-is-null".equals(filter)) {
            log.debug("REST request to get all Predicates where rule is null");
            return StreamSupport
                .stream(predicateRepository.findAll().spliterator(), false)
                .filter(predicate -> predicate.getRule() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Predicates");
        return predicateRepository.findAll();
    }

    /**
     * {@code GET  /predicates/:id} : get the "id" predicate.
     *
     * @param id the id of the predicate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the predicate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/predicates/{id}")
    public ResponseEntity<Predicate> getPredicate(@PathVariable Long id) {
        log.debug("REST request to get Predicate : {}", id);
        Optional<Predicate> predicate = predicateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(predicate);
    }

    /**
     * {@code DELETE  /predicates/:id} : delete the "id" predicate.
     *
     * @param id the id of the predicate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/predicates/{id}")
    public ResponseEntity<Void> deletePredicate(@PathVariable Long id) {
        log.debug("REST request to delete Predicate : {}", id);
        predicateRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
