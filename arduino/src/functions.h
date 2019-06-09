#include <Arduino.h>
#include <DHT.h>
#include <DS18B20.h>
#include <OneWire.h>

void unknown(char *command);

void success(char mode, int pin, int state, char *buffer);

void ds18b20(int pin,byte address[]);

void dht22(int pin);

void hexCharacterStringToBytes(byte *byteArray, const char *hexString);

void scanOW(int pin);
