package com.c2v4.greenery.scheduler;

import java.util.function.Supplier;

public class Scheduler {

    private final String label;
    private final Supplier<Float> supplier;

    public Scheduler(String label, Supplier<Float> supplier) {
        this.label = label;
        this.supplier = supplier;
    }

    public Float getValue() {
        return supplier.get();
    }

    public String getLabel() {
        return label;
    }

    @Override
    public String toString() {
        return "Scheduler{" +
            "label='" + label + '\'' +
            ", supplier=" + supplier +
            '}';
    }
}
