package com.c2v4.greenery.service.communication;

import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

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
