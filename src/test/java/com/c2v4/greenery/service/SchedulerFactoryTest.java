package com.c2v4.greenery.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.scheduler.Scheduler;
import com.c2v4.greenery.service.factory.SupplierFactory;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
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
        providers.put("providerName", (config) -> () -> 3f);
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
