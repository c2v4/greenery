package com.c2v4.greenery.service.factory;

import com.c2v4.greenery.domain.SchedulerConfig;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
public interface SupplierFactory {
    Supplier<Float> create(SchedulerConfig config);
}
