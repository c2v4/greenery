#include "Arduino.h"
// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  Serial.begin(9600);
  Serial.setTimeout(10000);
}

void unknown(char *command) {
  Serial.print("Unknown command: ");
  Serial.println(command);
}

void success(char mode, int pin, int state, char *buffer) {
  Serial.print("Buffer: ");
  Serial.println(buffer);
}
// the loop function runs over and over again forever
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
        Serial.println(digitalRead(pin));
        success(mode, pin, state, received);
        break;
      }
      case 'l': {
        Serial.println(analogRead(pin));
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
      case 'p': {
        pinMode(pin, state);
        success(mode, pin, state, received);
        break;
      }
      case 'd': {
        digitalWrite(pin, state);
        success(mode, pin, state, received);
        break;
      }
      case 'a': {
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
