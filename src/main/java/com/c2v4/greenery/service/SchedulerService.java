package com.c2v4.greenery.service;

import com.c2v4.greenery.domain.Entry;
import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.repository.EntryRepository;
import com.c2v4.greenery.repository.SchedulerConfigRepository;
import com.c2v4.greenery.scheduler.Scheduler;
import java.time.Instant;
import java.util.List;
import java.util.OptionalDouble;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class SchedulerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchedulerService.class);
    private static final int SCHEDULER_RATE = 10000;

    private final List<Scheduler> schedulers;
    private final EntryRepository entryRepository;

    public SchedulerService(SchedulerFactory schedulerFactory,
        SchedulerConfigRepository schedulerConfigRepository, EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
        List<SchedulerConfig> schedulerConfigs = schedulerConfigRepository.findAll();
        this.schedulers =
            schedulerConfigs.stream()
                .map(schedulerFactory::createScheduler)
                .collect(Collectors.toList());
    }

    @Scheduled(fixedRate = SCHEDULER_RATE)
    public void tick(){
        schedulers.stream().parallel().forEach(scheduler -> {
            OptionalDouble result = scheduler.getValue();
            if (!result.isPresent()) {
                LOGGER.warn("Scheduler: {} produced no value", scheduler);
            }
            result.ifPresent(value -> entryRepository.save(new Entry(value, scheduler.getLabel(), Instant.now())));

        });
    }
}
