package com.c2v4.greenery.service.factory;

import com.c2v4.greenery.domain.PropertyBlueprint;
import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.domain.Validation;
import com.google.common.collect.ImmutableSet;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.Set;
import java.util.function.Supplier;
import org.springframework.stereotype.Service;

@Service("random")
public class RandomSupplierFactory implements SupplierFactory {

    private static final String MIN = "min";
    private static final String MAX = "max";

    @Override
    public Supplier<OptionalDouble> create(SchedulerConfig config) {
        float min = Float.parseFloat(config.getProps().getOrDefault(MIN, "0"));
        float max = Float.parseFloat(config.getProps().getOrDefault(MAX, "100"));
        return () -> OptionalDouble.of(min + Math.random() * (max - min));
    }

    @Override
    public Set<PropertyBlueprint> getPropertyBlueprints() {
        return ImmutableSet.of(
            new PropertyBlueprint(MIN, Validation.of(PropertyBlueprint.FLOAT), false),
            new PropertyBlueprint(MAX, Validation.of(PropertyBlueprint.FLOAT), false)
        );
    }
}
