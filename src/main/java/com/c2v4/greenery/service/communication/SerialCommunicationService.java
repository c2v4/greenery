package com.c2v4.greenery.service.communication;

import com.c2v4.greenery.config.ApplicationProperties;
import com.c2v4.greenery.config.ApplicationProperties.Serial;
import com.c2v4.greenery.service.SchedulerService;
import com.fazecast.jSerialComm.SerialPort;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SerialCommunicationService implements CommunicationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchedulerService.class);

    private final SerialPort serialPort;
    private final boolean isAvailable;

    public SerialCommunicationService(ApplicationProperties applicationProperties) {
        Serial serialConfig = applicationProperties.getSerial();
        String port = serialConfig.getPort();
        isAvailable = port != null;
        if (isAvailable) {
            serialPort = SerialPort.getCommPort(port);
            serialPort.setBaudRate(serialConfig.getBaudRate());
            boolean opened = serialPort.openPort();
            if (!opened) {
                throw new IllegalStateException("Cannot open port: " + port);
            }
            serialPort
                .setComPortTimeouts(SerialPort.TIMEOUT_READ_BLOCKING, serialConfig.getTimeOut(), 0);
        } else {
            serialPort = null;
        }
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    @Override
    public Optional<String> fetchData(String request) {
        LOGGER.debug("Fetching data for request: {}", request);
        if (isAvailable && serialPort != null && serialPort.isOpen()) {
            byte[] bytes = request.getBytes();
            synchronized (this) {
                serialPort.writeBytes(bytes, bytes.length);
                byte[] readBuffer = new byte[1024];
                int numRead = serialPort.readBytes(readBuffer, readBuffer.length);
                LOGGER.debug("Read {} bytes", numRead);
                if (numRead > 0) {
                    String received = new String(readBuffer).trim();
                    LOGGER.debug("Received: {}",received);
                    return Optional.of(received);
                } else {
                    return Optional.empty();
                }
            }
        } else {
            LOGGER.warn("Serial port {} is not available", serialPort);
            return Optional.empty();
        }
    }

}
