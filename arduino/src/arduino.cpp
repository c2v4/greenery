#include "functions.h"
#include <Arduino.h>
// the setup function runs once when you press reset or power the board

void setup() { Serial.begin(9600); }

void loop() {
  int pin, state;
  char mode;
  char received[50];
  char rest[30];
  if (Serial.available() > 0) {
    Serial.readStringUntil('\n').toCharArray(received, 50);
    sscanf(received, "%c %d %d %s", &mode, &pin, &state, &rest);
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
    case '8': {
      if (state == 0) {
        byte address[8];
        hexCharacterStringToBytes(address, rest);
        ds18b20(pin, address);
      } else {
        scanOW(pin);
      }
      success(mode, pin, state, received);
      break;
    }
    default: {
      unknown(received);
      break;
    }
    }
  }
}
