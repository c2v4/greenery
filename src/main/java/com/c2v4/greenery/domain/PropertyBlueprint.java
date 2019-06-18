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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PropertyBlueprint that = (PropertyBlueprint) o;
        return required == that.required &&
            Objects.equals(key, that.key) &&
            Objects.equals(validationRegex, that.validationRegex);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key, validationRegex, required);
    }

    @Override
    public String toString() {
        return "PropertyBlueprint{" +
            "key='" + key + '\'' +
            ", validationRegex='" + validationRegex + '\'' +
            ", required=" + required +
            '}';
    }
}
