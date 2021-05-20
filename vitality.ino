#include <ESP8266WiFi.h>
#include <DHT.h>
#include<DallasTemperature.h>
#include<OneWire.h>
#include<Wire.h>
#include"MAX30100_PulseOximeter.h"


#define DHTPIN D6
#define DHTTYPE DHT11 
#define DS18B20 D5 

const char* ssid     = "gopal";
const char* password = "12345678";
const char* host = "vitality100.000webhostapp.com";
DHT dht(DHTPIN, DHTTYPE);
PulseOximeter pox;
OneWire oneWire(DS18B20);
DallasTemperature sensors(&oneWire);


void setup() {
  Serial.begin(115200);
  delay(100);
  dht.begin();
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password); 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Netmask: ");
  Serial.println(WiFi.subnetMask());
  Serial.print("Gateway: ");
  Serial.println(WiFi.gatewayIP());
}
void loop() {
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  float b = sensors.getTempCByIndex(0);
  float hr = pox.getHeartRate();
  float o = pox.getSpO2();
  if (isnan(h) || isnan(t)||isnan(b) ||isnan(hr)||isnan(o)) 
  {
    Serial.println("Failed to read from sensor's!");
    return;
  }

  Serial.print("connecting to ");
  Serial.println(host);

  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  String url = "/api/insert.php?temp=" + String(t) + "&hum="+ String(h) + "&heart_rate="+ String(hr) + "&body="+ String(b) + "&oxygen="+ String(o);
  Serial.print("Requesting URL: ");
  Serial.println(url);
  
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
  delay(500);
  
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
  
  Serial.println();
  Serial.println("closing connection");
  delay(3000);
}
