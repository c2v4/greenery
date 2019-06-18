package com.c2v4.greenery.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.c2v4.greenery.domain.PropertyBlueprint;
import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.scheduler.Scheduler;
import com.c2v4.greenery.service.factory.SupplierFactory;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.OptionalDouble;
import java.util.Set;
import java.util.function.Supplier;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
class SchedulerFactoryTest {

    private SchedulerFactory schedulerFactory;
    private Map<String, SupplierFactory> providers;

    @BeforeEach
    void setUp() {
        providers = new HashMap<>();
        schedulerFactory = new SchedulerFactory(providers);
    }

    @Test
    void createScheduler() {
        providers.put("providerName", new SupplierFactory() {
            @Override
            public Supplier<OptionalDouble> create(SchedulerConfig config) {
                return () -> OptionalDouble.of(3);
            }

            @Override
            public Set<PropertyBlueprint> getPropertyBlueprints() {
                return Collections.emptySet();
            }
        });
        Scheduler scheduler = schedulerFactory
            .createScheduler(new SchedulerConfig().type("providerName"));
        assertThat(scheduler).isNotNull();
    }

    @Test
    void createSchedulerException() {
        Assertions.assertThrows(IllegalArgumentException.class,
            () -> schedulerFactory.createScheduler(new SchedulerConfig()));
    }

}
