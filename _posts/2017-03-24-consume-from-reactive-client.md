---
title: "Consume from reactive client"
excerpt_separator: "<!--more-->"
header:
  image: /assets/images/anthony-rossbach-59486.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
categories:
  - Home automation
tags:
  - Docker
  - Gulp
  - ReactJs
  - ES6
  - WebSocket
  - Git
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
- Consume data from Reactive-server [here](2017-03-24-consume-data-from-rabbitmq.md)


#### Step 3: Reactive-Client

Create reactive client to consume data from Browser
  - Install ReactJS
  - Create RxJs consume socket
  - Create Temperature Widget with D3Js
  - Push data to browser client vi Websockets (STOMP)

