package com.c2v4.greenery.service.factory;

import com.c2v4.greenery.config.SchedulerConfig;
import org.springframework.stereotype.Component;

import java.util.function.Supplier;

@Component("random")
public class RandomProviderFactory implements ProviderFactory {

    private static final String MIN = "min";
    private static final String MAX = "max";

    @Override
    public Supplier<Float> create(SchedulerConfig config) {
        float min = Float.parseFloat(config.getProps().getOrDefault(MIN, "0"));
        float max = Float.parseFloat(config.getProps().getOrDefault(MAX, "100"));
        return () -> (float) (min + Math.random() * (max - min));
    }
}
