#include "functions.h"

void unknown(char *command) {
  Serial.print("Unknown command: ");
  Serial.println(command);
}

void success(char mode, int pin, int state, char *buffer) {
  Serial.print("Buffer: ");
  Serial.println(buffer);
}

void ds18b20(int pin, byte address[]) {

  OneWire onewire(pin);
  DS18B20 sensors(&onewire);
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

byte nibble(char c) {
  if (c >= '0' && c <= '9')
    return c - '0';

  if (c >= 'a' && c <= 'f')
    return c - 'a' + 10;

  if (c >= 'A' && c <= 'F')
    return c - 'A' + 10;

  return 0; // Not a valid hexadecimal character
}

void hexCharacterStringToBytes(byte *byteArray, const char *hexString) {
  bool oddLength = strlen(hexString) & 1;

  byte currentByte = 0;
  byte byteIndex = 0;

  for (byte charIndex = 0; charIndex < strlen(hexString); charIndex++) {
    bool oddCharIndex = charIndex & 1;

    if (oddLength) {
      // If the length is odd
      if (oddCharIndex) {
        // odd characters go in high nibble
        currentByte = nibble(hexString[charIndex]) << 4;
      } else {
        // Even characters go into low nibble
        currentByte |= nibble(hexString[charIndex]);
        byteArray[byteIndex++] = currentByte;
        currentByte = 0;
      }
    } else {
      // If the length is even
      if (!oddCharIndex) {
        // Odd characters go into the high nibble
        currentByte = nibble(hexString[charIndex]) << 4;
      } else {
        // Odd characters go into low nibble
        currentByte |= nibble(hexString[charIndex]);
        byteArray[byteIndex++] = currentByte;
        currentByte = 0;
      }
    }
  }
}

void scanOW(int pin) {

  OneWire onewire(pin);
  byte address[8];

  onewire.reset_search();
  while (onewire.search(address)) {
    if (address[0] != 0x28)
      continue;

    if (OneWire::crc8(address, 7) != address[7]) {
      Serial.println(F("Błędny adres, sprawdz polaczenia"));
      break;
    }

    for (byte i = 0; i < 8; i++) {
      char tmp[2];
      sprintf(tmp, "%.2X", address[i]);
      Serial.print(tmp);
    }
    Serial.println();
  }
}
