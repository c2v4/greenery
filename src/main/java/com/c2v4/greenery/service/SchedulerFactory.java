package com.c2v4.greenery.service;

import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.scheduler.Scheduler;
import com.c2v4.greenery.service.factory.ProviderFactory;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SchedulerFactory {

    private final Map<String, ProviderFactory> providers;

    public SchedulerFactory(Map<String, ProviderFactory> providers) {
        this.providers = providers;
    }

    public Scheduler createScheduler(SchedulerConfig config) {
        ProviderFactory providerFactory = providers.get(config.getType());
        if(providerFactory == null) throw new IllegalArgumentException("Cannot find provider for type:"+config.getType());
        return new Scheduler(config.getName(), providerFactory.create(config));
    }
}
