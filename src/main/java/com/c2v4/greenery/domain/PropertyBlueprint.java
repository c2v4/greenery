package com.c2v4.greenery.domain;

import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonProperty;

public class PropertyBlueprint {

    public static final String STRING = "\\.+";
    public static final String FLOAT = "[+-]?\\d+(\\.\\d+)?";
    public static final String PIN = "([1-9]|1[0-9])";

    private final String key;
    private final Validation validation;
    private final boolean required;

    @JsonCreator
    public PropertyBlueprint(@JsonProperty("key") String key,
        @JsonProperty("validation") Validation validation, boolean required) {
        this.key = key;
        this.validation = validation;
        this.required = required;
    }

    public String getKey() {
        return key;
    }

    public Validation getValidation() {
        return validation;
    }

    public boolean isRequired() {
        return required;
    }

}
