package com.c2v4.greenery.service.factory;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.c2v4.greenery.domain.Property;
import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.service.communication.StubSerialCommunicationService;
import java.util.HashMap;
import java.util.OptionalDouble;
import java.util.function.Supplier;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DHT22SupplierFactoryTest {

    private DHT22SupplierFactory factory;
    private HashMap<String, Supplier<String>> stubConfig;
    private SchedulerConfig config;

    @BeforeEach
    void setUp() {
        config = new SchedulerConfig();
        stubConfig = new HashMap<>();
        StubSerialCommunicationService communicationService = new StubSerialCommunicationService(
            stubConfig);
        factory = new DHT22SupplierFactory(communicationService);
    }

    @Test
    void temperatureTest() {
        stubConfig.put("2 2", () -> "Humidity: 50.70 %       Temperature: 26.20 *C\n");
        config.addProperty(new Property("pin", "2"));
        config.addProperty(new Property("mode", "temperature"));

        Supplier<OptionalDouble> supplier = factory.create(config);

        assertThat(supplier.get()).isPresent();
        assertThat(supplier.get()).hasValue(26.20);
    }

    @Test
    void humidityTest() {
        stubConfig.put("2 2", () -> "Humidity: 50.70 %       Temperature: 26.20 *C\n");
        config.addProperty(new Property("pin", "2"));
        config.addProperty(new Property("mode", "humidity"));

        Supplier<OptionalDouble> supplier = factory.create(config);

        assertThat(supplier.get()).isPresent();
        assertThat(supplier.get()).hasValue(50.70);
    }


    @Test
    void errorTest() {
        config.addProperty(new Property("pin", "2"));
        config.addProperty(new Property("mode", "temperature"));

        Supplier<OptionalDouble> supplier = factory.create(config);

        assertThat(supplier.get()).isNotPresent();
    }
}
