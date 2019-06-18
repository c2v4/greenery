package com.c2v4.greenery.service.factory;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.c2v4.greenery.domain.SchedulerConfig;
import java.util.OptionalDouble;
import java.util.function.Supplier;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RandomSupplierFactoryTest {

    private RandomSupplierFactory randomSupplierFactory;

    @BeforeEach
    void setUp() {
        randomSupplierFactory = new RandomSupplierFactory();
    }

    @Test
    void create() {
        Supplier<OptionalDouble> randomSupplier = randomSupplierFactory
            .create(new SchedulerConfig());
        assertThat(randomSupplier.get()).isNotEmpty();
    }
}
