package com.c2v4.greenery.service.communication;

import java.util.Map;
import java.util.function.Supplier;

import java.util.Optional;
import org.springframework.stereotype.Service;

public class StubSerialCommunicationService implements CommunicationService {

    private final Map<String,Supplier<String>> stubConfig;

    public StubSerialCommunicationService(
        Map<String, Supplier<String>> stubConfig) {
        this.stubConfig = stubConfig;
    }

    @Override
    public Optional<String> fetchData(String request) {
        return Optional.ofNullable(stubConfig.get(request)).map(Supplier::get);
    }
}
