package com.c2v4.greenery.scheduler;

import com.c2v4.greenery.domain.Label;

import java.util.function.Supplier;

public class Scheduler {

    private final Label label;
    private final Supplier<Float> supplier;

    public Scheduler(Label label, Supplier<Float> supplier) {
        this.label = label;
        this.supplier = supplier;
    }

    public Float getValue() {
        return supplier.get();
    }

    public Label getLabel() {
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
