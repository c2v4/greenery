package com.c2v4.greenery.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Greenery.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Serial serial = new Serial();

    public Serial getSerial() {
        return serial;
    }

    public static class Serial {

        private String port = "/dev/ttyACM0";
        private int timeOut = 1000;
        private int baudRate = 9600;

        public int getTimeOut() {
            return timeOut;
        }

        public void setTimeOut(int timeOut) {
            this.timeOut = timeOut;
        }

        public int getBaudRate() {
            return baudRate;
        }

        public void setBaudRate(int baudRate) {
            this.baudRate = baudRate;
        }

        public String getPort() {
            return port;
        }

        public void setPort(String port) {
            this.port = port;
        }
    }
}
