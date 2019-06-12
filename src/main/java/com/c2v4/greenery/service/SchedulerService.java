package com.c2v4.greenery.service;

import com.c2v4.greenery.domain.Entry;
import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.repository.EntryRepository;
import com.c2v4.greenery.repository.SchedulerConfigRepository;
import com.c2v4.greenery.scheduler.Scheduler;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchedulerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchedulerService.class);
    private static final int SCHEDULER_RATE = 10000;

    private final List<Scheduler> schedulers;
    private final EntryRepository entryRepository;
    private final SerialCommunicationService serialCommunicationService;

    public SchedulerService(SchedulerFactory schedulerFactory,
        SchedulerConfigRepository schedulerConfigRepository, EntryRepository entryRepository,
        SerialCommunicationService serialCommunicationService) {
        this.entryRepository = entryRepository;
        this.serialCommunicationService = serialCommunicationService;
        List<SchedulerConfig> schedulerConfigs = schedulerConfigRepository.findAll();
        this.schedulers =
            schedulerConfigs.stream()
                .map(schedulerFactory::createScheduler)
                .collect(Collectors.toList());
    }

    @Scheduled(fixedRate = SCHEDULER_RATE)
    public void tick(){
        schedulers.stream().parallel().forEach(scheduler -> {
            Float value = scheduler.getValue();
            if (value == null) {
                LOGGER.warn("Scheduler: {} produced no value", scheduler);
            }
            entryRepository.save(new Entry(value, scheduler.getLabel(), Instant.now()));
        });
    }
}
