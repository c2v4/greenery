package com.c2v4.greenery.service;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Profile("!prod")
public class StubSerialCommunicationService implements CommunicationService {

    @Override
    public Optional<String> fetchData(String str) {
        switch (str.charAt(0)) {
            //Place for communication stubs
            case '2': return Optional.of("2");
            case '8': return Optional.of("8");
            default:
                return Optional.empty();
        }
    }
}
