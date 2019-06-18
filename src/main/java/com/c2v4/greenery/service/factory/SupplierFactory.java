package com.c2v4.greenery.service.factory;

import com.c2v4.greenery.domain.PropertyBlueprint;
import com.c2v4.greenery.domain.SchedulerConfig;
import java.util.Set;
import java.util.function.Supplier;
import org.springframework.stereotype.Service;

@Service
public interface SupplierFactory {
    Supplier<Float> create(SchedulerConfig config);

    Set<PropertyBlueprint> getPropertyBlueprints();
}
