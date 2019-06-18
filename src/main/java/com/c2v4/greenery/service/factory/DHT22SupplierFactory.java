package com.c2v4.greenery.service.factory;

import com.c2v4.greenery.domain.PropertyBlueprint;
import com.c2v4.greenery.domain.SchedulerConfig;
import com.c2v4.greenery.domain.Validation;
import com.c2v4.greenery.service.communication.CommunicationService;
import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableSet;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.Set;
import java.util.function.Supplier;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("dht22")
public class DHT22SupplierFactory implements SupplierFactory {

    private static final String PIN = "pin";
    private static final String MODE = "mode";

    private static final Pattern PATTERN = Pattern.compile(PropertyBlueprint.FLOAT);

    private final CommunicationService communicationService;

    @Autowired
    public DHT22SupplierFactory(
        CommunicationService communicationService) {
        this.communicationService = communicationService;
    }

    @Override
    public Supplier<OptionalDouble> create(SchedulerConfig config) {
        String pin = config.getProps().get(PIN);
        String mode = config.getProps().get(MODE);
        Preconditions.checkNotNull(pin);
        Preconditions.checkNotNull(mode);
        int matchingGroup = getMatchingGroup(mode);
        return () ->
        {
            Optional<Matcher> stream = communicationService.fetchData("2 " + pin)
                .map(PATTERN::matcher)
                .filter(Matcher::find);
            if(matchingGroup==0) stream = stream.filter(Matcher::find);
            return stream
                .map(Matcher::group)
                .map(Double::parseDouble)
                .map(OptionalDouble::of)
                .orElse(OptionalDouble.empty());
        };


    }

    private int getMatchingGroup(String mode) {
        switch (mode) {
            case "temperature":
                return 0;
            case "humidity":
                return 1;
            default:
                throw new IllegalStateException("Unknown operating mode of DHT22: " + mode);
        }
    }

    @Override
    public Set<PropertyBlueprint> getPropertyBlueprints() {
        return ImmutableSet
            .of(new PropertyBlueprint(PIN, Validation.of(PIN), true),
                new PropertyBlueprint(MODE,
                    Validation.of(ImmutableList.of("temperature", "humidity")), true));
    }
}
