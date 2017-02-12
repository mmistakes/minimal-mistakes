---
title: "Consume data from RabbitMQ"
related: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/caspar-rubin-224229.jpg
categories:
  - Computer
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
The objective of this tutorial is to develop a reactive server which consuming data from a rabbitmq message broker and
publishing data to client via websocket.

- [Prerequisites](#prerequisites)

###  Prerequisites

- [Set up a Raspberry PI 3 ]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/raspberry/dht22-raspberry)
- [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/computer/install-docker)
- [Git installed](https://git-scm.com/download/linux)
- [Push data to rabbitMQ]({{ site.url }}{{ site.baseurl }}/computer/push-data-on-rabbitmq)
- [Install InfluxDB]({{ site.url }}{{ site.baseurl }}/computer/install-influxdb)

### Clone the project

```bash
git clone git@github.com:jluccisano/reactive-server.git
```

```bash
mvn clean install
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```

### Step 1: Consume data from Rabbitmq

```bash
git co step1-consumeDataFromRabbitMQ
```

```bash
mvn clean install
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```

### Step 2: Store data into InfluxDB

```bash
git co step2-store-data-into-influxDB
```

```bash
mvn clean install
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```

### Step 3: Create Rest API with Swagger

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

### Step 4: Forward data to client via Websocket

```bash
git co step4-publish-to-websocket
```

```bash
java -jar target/reactive-server-0.0.1-SNAPSHOT.jar
```

### Final Result

```bash
docker pull jluccisano/reactive-server
```

```bash
docker run --name reactive-server -p 8084:8084 -d jluccisano/reactive-server:latest
```