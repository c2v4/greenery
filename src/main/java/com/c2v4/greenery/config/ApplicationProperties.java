package com.c2v4.greenery.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Properties specific to Greenery.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@Configuration
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    private List<SchedulerConfig> schedulers;

    public List<SchedulerConfig> getSchedulers() {
        return schedulers;
    }

    public void setSchedulers(List<SchedulerConfig> schedulers) {
        this.schedulers = schedulers;
    }
}
