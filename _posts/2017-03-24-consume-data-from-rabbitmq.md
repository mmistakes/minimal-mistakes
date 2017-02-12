---
title: "Consume temperature and humidity from RabbitMQ"
excerpt_separator: "<!--more-->"
header:
  image: /assets/images/anthony-rossbach-59486.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
categories:
  - Home automation
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
- Install Git (optional) [here](https://git-scm.com/download/linux)
- Push data to rabbitMQ [here](2017-03-24-push-data-on-rabbitmq.md)
- Install InfluxDB [here](2017-03-24-install-influxdb.md)


#### Step X: Consume data from Rabbitmq

#### Step X: Store data into InfluxDB

#### Step X: Forward data to client via Websocket

#### Step X: Create Rest API with Swagger

#### Final Result

```bash
docker pull jluccisano/reactive-server
```

```bash
docker run --name reactive-server -p 8084:8084 -d jluccisano/reactive-server:latest
```