package com.c2v4.greenery.web.rest;


import com.c2v4.greenery.service.factory.SupplierFactory;
import java.util.Map;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SchedulerTypeResource {

    private final Logger log = LoggerFactory.getLogger(SchedulerTypeResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Set<String> providerNames;

    public SchedulerTypeResource(Map<String, SupplierFactory> providers) {
        providerNames = providers.keySet();
    }


    /**
     * {@code GET  /scheduler-types} : get all the schedulerTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of schedulerTypes in body.
     */
    @GetMapping("/scheduler-types")
    public Set<String> getAllSchedulerTypes() {
        log.debug("REST request to get all SchedulerTypes");
        return providerNames;
    }

}
