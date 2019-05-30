package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.Rule;
import com.c2v4.greenery.repository.RuleRepository;
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
 * REST controller for managing {@link com.c2v4.greenery.domain.Rule}.
 */
@RestController
@RequestMapping("/api")
public class RuleResource {

    private final Logger log = LoggerFactory.getLogger(RuleResource.class);

    private static final String ENTITY_NAME = "rule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RuleRepository ruleRepository;

    public RuleResource(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    /**
     * {@code POST  /rules} : Create a new rule.
     *
     * @param rule the rule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rule, or with status {@code 400 (Bad Request)} if the rule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rules")
    public ResponseEntity<Rule> createRule(@RequestBody Rule rule) throws URISyntaxException {
        log.debug("REST request to save Rule : {}", rule);
        if (rule.getId() != null) {
            throw new BadRequestAlertException("A new rule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rule result = ruleRepository.save(rule);
        return ResponseEntity.created(new URI("/api/rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rules} : Updates an existing rule.
     *
     * @param rule the rule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rule,
     * or with status {@code 400 (Bad Request)} if the rule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rules")
    public ResponseEntity<Rule> updateRule(@RequestBody Rule rule) throws URISyntaxException {
        log.debug("REST request to update Rule : {}", rule);
        if (rule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Rule result = ruleRepository.save(rule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rules} : get all the rules.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rules in body.
     */
    @GetMapping("/rules")
    public List<Rule> getAllRules() {
        log.debug("REST request to get all Rules");
        return ruleRepository.findAll();
    }

    /**
     * {@code GET  /rules/:id} : get the "id" rule.
     *
     * @param id the id of the rule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rules/{id}")
    public ResponseEntity<Rule> getRule(@PathVariable Long id) {
        log.debug("REST request to get Rule : {}", id);
        Optional<Rule> rule = ruleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rule);
    }

    /**
     * {@code DELETE  /rules/:id} : delete the "id" rule.
     *
     * @param id the id of the rule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rules/{id}")
    public ResponseEntity<Void> deleteRule(@PathVariable Long id) {
        log.debug("REST request to delete Rule : {}", id);
        ruleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
