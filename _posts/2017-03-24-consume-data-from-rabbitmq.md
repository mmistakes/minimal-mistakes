---
title: "Consume temperature and humidity from RabbitMQ"
excerpt_separator: "Consume temperature and humidity from RabbitMQ"
related: true
header:
  image: /assets/images/anthony-rossbach-59486.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
categories:
  - automation
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

- Set up a Raspberry PI 3 [here](2017-01-14-setup_raspberry.md)
- Interacting with DHT22 Sensor [here](2017-02-28-dht22_raspberry.md)
- A server or your own computer with Docker [here](2017-02-28-install_docker.md)
- Git installed [here](https://git-scm.com/download/linux)
- Push data to rabbitMQ [here](2017-03-24-push-data-on-rabbitmq.md)
- Install InfluxDB [here](2017-03-24-install-influxdb.md)

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

#### Step X: Consume data from Rabbitmq

```bash
git co step1-consumeDataFromRabbitMQ
```

```bash
mvn clean install
```

#### Step X: Store data into InfluxDB

```bash
git co step2-store-data-into-influxDB
```

```bash
mvn clean install
```

#### Step X: Create Rest API with Swagger

```bash
git co step3-Create-REST-API-Swagger
```

```bash
mvn clean install
```

http://YOUR_HOST:YOUR_PORT/swagger-ui.html

#### Step X: Forward data to client via Websocket

```bash
git co step4-publish-to-websocket
```


#### Final Result

```bash
docker pull jluccisano/reactive-server
```

```bash
docker run --name reactive-server -p 8084:8084 -d jluccisano/reactive-server:latest
```