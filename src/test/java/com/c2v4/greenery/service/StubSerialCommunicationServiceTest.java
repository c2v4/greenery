package com.c2v4.greenery.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.c2v4.greenery.service.communication.StubSerialCommunicationService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StubSerialCommunicationServiceTest {

    private StubSerialCommunicationService stubSerialCommunicationService;
    private Map<String, Supplier<String>> stubConfig;
    @BeforeEach
    void setUp() {
        stubConfig = new HashMap<>();
        stubSerialCommunicationService = new StubSerialCommunicationService(stubConfig);
    }

    @Test
    void fetchEmptyData() {
        Optional<String> data = stubSerialCommunicationService.fetchData("");
        assertThat(data).isEmpty();
    }

    @Test
    void fetchConfiguredData() {
        stubConfig.put("a",()->"b");
        Optional<String> data = stubSerialCommunicationService.fetchData("a");
        assertThat(data).contains("b");
    }
}
