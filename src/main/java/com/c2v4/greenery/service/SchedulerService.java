package com.c2v4.greenery.service;

import com.c2v4.greenery.config.ApplicationProperties;
import com.c2v4.greenery.config.SchedulerConfig;
import com.c2v4.greenery.domain.Entry;
import com.c2v4.greenery.repository.EntryRepository;
import com.c2v4.greenery.scheduler.Scheduler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchedulerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchedulerService.class);
    private static final int SCHEDULER_RATE = 10000;

    private final List<Scheduler> schedulers;
    private final EntryRepository entryRepository;

    public SchedulerService(
        ApplicationProperties applicationProperties, SchedulerFactory schedulerFactory, EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
        List<SchedulerConfig> schedulerConfigs = applicationProperties.getSchedulers();
        if (schedulerConfigs == null) {
            this.schedulers = Collections.emptyList();
        } else {
            this.schedulers =
                schedulerConfigs.stream()
                    .map(schedulerFactory::createScheduler)
                    .collect(Collectors.toList());

        }
    }

    @Scheduled(fixedRate = SCHEDULER_RATE)
    public void tick() {
        schedulers.stream().parallel().forEach(scheduler -> {
            Float value = scheduler.getValue();
            if (value == null) {
                LOGGER.warn("Scheduler: {} produced no value", scheduler);
            }
            entryRepository.save(new Entry(value, scheduler.getLabel(), Instant.now()));
        });
    }
}
