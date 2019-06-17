package com.c2v4.greenery.service.communication;

import java.util.Optional;

public interface CommunicationService {
    Optional<String> fetchData(String request);
}
