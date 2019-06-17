package com.c2v4.greenery.web.rest;

import com.c2v4.greenery.domain.Expression;
import com.c2v4.greenery.repository.ExpressionRepository;
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
 * REST controller for managing {@link com.c2v4.greenery.domain.Expression}.
 */
@RestController
@RequestMapping("/api")
public class ExpressionResource {

    private final Logger log = LoggerFactory.getLogger(ExpressionResource.class);

    private static final String ENTITY_NAME = "expression";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExpressionRepository expressionRepository;

    public ExpressionResource(ExpressionRepository expressionRepository) {
        this.expressionRepository = expressionRepository;
    }

    /**
     * {@code POST  /expressions} : Create a new expression.
     *
     * @param expression the expression to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new expression, or with status {@code 400 (Bad Request)} if the expression has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/expressions")
    public ResponseEntity<Expression> createExpression(@RequestBody Expression expression) throws URISyntaxException {
        log.debug("REST request to save Expression : {}", expression);
        if (expression.getId() != null) {
            throw new BadRequestAlertException("A new expression cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expression result = expressionRepository.save(expression);
        return ResponseEntity.created(new URI("/api/expressions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /expressions} : Updates an existing expression.
     *
     * @param expression the expression to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expression,
     * or with status {@code 400 (Bad Request)} if the expression is not valid,
     * or with status {@code 500 (Internal Server Error)} if the expression couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/expressions")
    public ResponseEntity<Expression> updateExpression(@RequestBody Expression expression) throws URISyntaxException {
        log.debug("REST request to update Expression : {}", expression);
        if (expression.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Expression result = expressionRepository.save(expression);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, expression.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /expressions} : get all the expressions.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of expressions in body.
     */
    @GetMapping("/expressions")
    public List<Expression> getAllExpressions(@RequestParam(required = false) String filter) {
        if ("predicate-is-null".equals(filter)) {
            log.debug("REST request to get all Expressions where predicate is null");
            return StreamSupport
                .stream(expressionRepository.findAll().spliterator(), false)
                .filter(expression -> expression.getPredicate() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Expressions");
        return expressionRepository.findAll();
    }

    /**
     * {@code GET  /expressions/:id} : get the "id" expression.
     *
     * @param id the id of the expression to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expression, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/expressions/{id}")
    public ResponseEntity<Expression> getExpression(@PathVariable Long id) {
        log.debug("REST request to get Expression : {}", id);
        Optional<Expression> expression = expressionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expression);
    }

    /**
     * {@code DELETE  /expressions/:id} : delete the "id" expression.
     *
     * @param id the id of the expression to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/expressions/{id}")
    public ResponseEntity<Void> deleteExpression(@PathVariable Long id) {
        log.debug("REST request to delete Expression : {}", id);
        expressionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
