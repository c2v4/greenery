package com.c2v4.greenery.config;

import com.c2v4.greenery.service.communication.CommunicationService;
import com.c2v4.greenery.service.communication.SerialCommunicationService;
import com.c2v4.greenery.service.communication.StubSerialCommunicationService;
import com.google.common.collect.ImmutableMap;
import java.util.Map;
import java.util.function.Supplier;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class CommunicationConfig {

    @Bean
    @Qualifier("stubConfig")
    public Map<String, Supplier<String>> stubConfig() {
        return ImmutableMap.of(
            "2 2", () -> "Humidity: " + RandomUtils.nextDouble(0, 100) + " %       Temperature: "
                + RandomUtils.nextDouble(15, 30) + " *C\n"
        );
    }


    @Bean
    @Profile("!serial")
    public CommunicationService stubCommunicationService(
        @Qualifier("stubConfig") Map<String, Supplier<String>> stubConfig) {
        return new StubSerialCommunicationService(stubConfig);
    }


    @Bean
    @Profile("serial")
    public CommunicationService serialCommunicationService(
        ApplicationProperties applicationProperties) {
        return new SerialCommunicationService(applicationProperties);
    }
}
