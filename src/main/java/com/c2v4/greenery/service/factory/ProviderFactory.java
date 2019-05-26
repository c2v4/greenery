package com.c2v4.greenery.service.factory;

import com.c2v4.greenery.config.SchedulerConfig;
import org.springframework.stereotype.Component;

import java.util.function.DoubleSupplier;
import java.util.function.Supplier;

@Component
public interface ProviderFactory {
    Supplier<Float> create(SchedulerConfig config);
}
