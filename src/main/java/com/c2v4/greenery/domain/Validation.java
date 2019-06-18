package com.c2v4.greenery.domain;

import java.util.List;

public class Validation {

    private final String regex;
    private final List<String> possibleValues;

    private Validation(String regex, List<String> possibleValues) {
        this.regex = regex;
        this.possibleValues = possibleValues;
    }

    public static Validation of(String regex) {
        return new Validation(regex, null);
    }

    public static Validation of(List<String> possibleValues) {
        return new Validation(null, possibleValues);
    }

    public String getRegex() {
        return regex;
    }

    public List<String> getPossibleValues() {
        return possibleValues;
    }
}
