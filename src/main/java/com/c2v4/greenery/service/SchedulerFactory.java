package com.c2v4.greenery.service;

import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.scheduler.Scheduler;
import com.c2v4.greenery.service.factory.SupplierFactory;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class SchedulerFactory {

    private final Map<String, SupplierFactory> providers;

    public SchedulerFactory(Map<String, SupplierFactory> providers) {
        this.providers = providers;
    }

    public Scheduler createScheduler(SchedulerConfig config) {
        SupplierFactory supplierFactory = providers.get(config.getType());
        if (supplierFactory == null)
            throw new IllegalArgumentException("Cannot find provider for type:" + config.getType());
        return new Scheduler(config.getLabel(), supplierFactory.create(config));
    }
}
