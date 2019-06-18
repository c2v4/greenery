package com.c2v4.greenery.web.rest;


import com.c2v4.greenery.domain.PropertyBlueprint;
import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.service.factory.SupplierFactory;
import io.github.jhipster.web.util.ResponseUtil;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SchedulerTypeResource {

    private final Logger log = LoggerFactory.getLogger(SchedulerTypeResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Map<String, SupplierFactory> providerMap;

    public SchedulerTypeResource(Map<String, SupplierFactory> providers) {
        providerMap = providers;
    }


    /**
     * {@code GET  /scheduler-types} : get all the schedulerTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of schedulerTypes
     * in body.
     */
    @GetMapping("/scheduler-types")
    public Set<String> getAllSchedulerTypes() {
        log.debug("REST request to get all SchedulerTypes");
        return providerMap.keySet();
    }

    /**
     * {@code GET  /scheduler-properties} : get all the schedulerBlueprints.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the map of scheduler type
     * to set of its blueprints in body.
     */
    @GetMapping("/scheduler-properties")
    public Map<String, Set<PropertyBlueprint>> getAllSchedulerPropertyBlueprints() {
        log.debug("REST request to get all SchedulerPropertyBlueprints");
        return providerMap.entrySet().stream().collect(
            Collectors.toMap(Entry::getKey, entry -> entry.getValue().getPropertyBlueprints())
        );
    }

    /**
     * {@code GET  /scheduler-configs/:schedulerName} : get the "schedulerName" schedulerPropertyBlueprints.
     *
     * @param schedulerName the schedulerName of the schedulerPropertyBlueprints to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the
     * schedulerConfig, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/scheduler-configs/{schedulerName}")
    public ResponseEntity<Set<PropertyBlueprint>> getSchedulerPropertyBlueprint(
        @PathVariable String schedulerName) {
        log.debug("REST request to get SchedulerPropertyBlueprint : {}", schedulerName);
        Optional<Set<PropertyBlueprint>> schedulerConfig = Optional
            .ofNullable(providerMap.get(schedulerName)).map(SupplierFactory::getPropertyBlueprints);
        return ResponseUtil.wrapOrNotFound(schedulerConfig);
    }

}
