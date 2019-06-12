package com.c2v4.greenery.service;

import com.c2v4.greenery.config.ApplicationProperties;
import com.c2v4.greenery.config.ApplicationProperties.Serial;
import com.fazecast.jSerialComm.SerialPort;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class SerialCommunicationService {

    private final SerialPort serialPort;

    public SerialCommunicationService(ApplicationProperties applicationProperties) {
        Serial serialConfig = applicationProperties.getSerial();
        String port = serialConfig.getPort();
        serialPort = SerialPort.getCommPort(port);
        serialPort.setBaudRate(serialConfig.getBaudRate());
        boolean opened = serialPort.openPort();
        if(!opened) throw new IllegalStateException("Cannot open port: "+ port);
        serialPort.setComPortTimeouts(SerialPort.TIMEOUT_READ_BLOCKING, serialConfig.getTimeOut(), 0);
    }

    synchronized Optional<String> fetchData(String str) {
        byte[] bytes = str.getBytes();
        serialPort.writeBytes(bytes, bytes.length);
        byte[] readBuffer = new byte[1024];
        int numRead = serialPort.readBytes(readBuffer, readBuffer.length);
        return numRead > 0 ? Optional.of(new String(readBuffer).trim()) : Optional.empty();
    }

}
