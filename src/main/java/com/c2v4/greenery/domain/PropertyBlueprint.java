package com.c2v4.greenery.domain;

import java.util.Objects;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonProperty;

public class PropertyBlueprint {

    public static final String STRING = "\\.+";
    public static final String FLOAT = "\\-?\\d+\\.\\d+";

    private final String key;
    private final String validationRegex;
    private final boolean required;

    @JsonCreator
    public PropertyBlueprint(@JsonProperty("key") String key,
        @JsonProperty("validationRegex") String validationRegex, boolean required) {
        this.key = key;
        this.validationRegex = validationRegex;
        this.required = required;
    }

    public String getKey() {
        return key;
    }

    public String getValidationRegex() {
        return validationRegex;
    }

    public boolean isRequired() {
        return required;
    }

}
