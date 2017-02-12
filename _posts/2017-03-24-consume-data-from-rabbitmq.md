---
title: "Consume temperature and humidity from RabbitMQ"
excerpt_separator: "Consume temperature and humidity from RabbitMQ"
related: true
categories:
  - tuto
tags:
  - Raspberry PI
  - RabbitMQ
  - Docker
  - Java
  - Maven
  - Spring
  - Swagger
  - Python
  - Git
  - μService
  - REST
  - Internet of Things
---
### Consume temperature and humidity from RabbitMQ

- [Prerequisites](#prerequisites)

###  Prerequisites

- [Set up a Raspberry PI 3 ]({{ site.url }}{{ site.baseurl }}/tuto/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/tuto/dht22-raspberry)
- [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/tuto/install-docker)
- [Git installed](https://git-scm.com/download/linux)
- [Push data to rabbitMQ]({{ site.url }}{{ site.baseurl }}/tuto/push-data-on-rabbitmq)
- [Install InfluxDB]({{ site.url }}{{ site.baseurl }}/tuto/install-influxdb)

#### Clone the project

```bash
git clone git@github.com:jluccisano/reactive-server.git
```

```bash
mvn clean install
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```

#### Step 1: Consume data from Rabbitmq

```bash
git co step1-consumeDataFromRabbitMQ
```

```bash
mvn clean install
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```

#### Step 2: Store data into InfluxDB

```bash
git co step2-store-data-into-influxDB
```

```bash
mvn clean install
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```

#### Step 3: Create Rest API with Swagger

```bash
git co step3-Create-REST-API-Swagger
```

```bash
mvn clean install
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```
http://YOUR_HOST:YOUR_PORT/swagger-ui.html

#### Step 4: Forward data to client via Websocket

```bash
git co step4-publish-to-websocket
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```

#### Final Result

```bash
docker pull jluccisano/reactive-server
```

```bash
docker run --name reactive-server -p 8084:8084 -d jluccisano/reactive-server:latest
```