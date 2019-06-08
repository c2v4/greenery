#include "Arduino.h"
#include <DHT.h>
#include <DS18B20.h>
#include <OneWire.h>
// the setup function runs once when you press reset or power the board

void unknown(char *command) {
  Serial.print("Unknown command: ");
  Serial.println(command);
}

void success(char mode, int pin, int state, char *buffer) {
  Serial.print("Buffer: ");
  Serial.println(buffer);
}

void ds18b20(int pin) {
  OneWire onewire(pin);
  DS18B20 sensors(&onewire);
  byte address[8] = {0x28, 0xC6, 0x71, 0xA9, 0x3, 0x0, 0x0, 0x4D};
  sensors.begin();
  sensors.request(address);
  while (!sensors.available())
    ;
  float temperature = sensors.readTemperature(address);
  Serial.print(temperature);
  Serial.println(F(" 'C"));
}

void dht22(int pin) {
  DHT dht(pin, DHT22);
  dht.begin();
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // check if returns are valid, if they are NaN (not a number) then something
  // went wrong!
  if (isnan(t) || isnan(h)) {
    Serial.println("Failed to read from DHT");
  } else {
    Serial.print("Humidity: ");
    Serial.print(h);
    Serial.print(" %\t");
    Serial.print("Temperature: ");
    Serial.print(t);
    Serial.println(" *C");
  }
}

void setup() { Serial.begin(9600); }

void loop() {
  int pin, state;
  char mode;
  char received[50];
  if (Serial.available() > 0) {
    Serial.readStringUntil('\n').toCharArray(received, 50);
    int found = sscanf(received, "%c %d %d", &mode, &pin, &state);
    switch (found) {
    case 2: {
      switch (mode) {
      case 'r': {
        pinMode(pin, INPUT_PULLUP);
        Serial.println(digitalRead(pin));
        success(mode, pin, state, received);
        break;
      }
      case 'l': {
        pinMode(pin, INPUT_PULLUP);
        Serial.println(analogRead(pin));
        success(mode, pin, state, received);
        break;
      }
      case '2': {
        dht22(pin);
        success(mode, pin, state, received);
        break;
      }
      case '8': {
        ds18b20(pin);
        success(mode, pin, state, received);
        break;
      }
      default: {
        unknown(received);
        break;
      }
      }
      break;
    }
    case 3: {
      switch (mode) {
      case 'd': {
        pinMode(pin, OUTPUT);
        digitalWrite(pin, state);
        success(mode, pin, state, received);
        break;
      }
      case 'a': {
        pinMode(pin, OUTPUT);
        analogWrite(pin, state);
        success(mode, pin, state, received);
        break;
      }
      default: {
        unknown(received);
        break;
      }
      }
      break;
    }
    default: {
      unknown(received);
      break;
    }
    }
  }
}
