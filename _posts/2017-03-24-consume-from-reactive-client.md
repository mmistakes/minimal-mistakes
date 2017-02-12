---
title: "Consume from reactive client"
excerpt_separator: "Consume from reactive client"
related: true
categories:
  - automation
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

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/tuto/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/tuto/dht22-raspberry)
- [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/tuto/install-docker)
- [Install Git (optional)](https://git-scm.com/download/linux)
- [Push data to rabbitMQ]({{ site.url }}{{ site.baseurl }}/tuto/push-data-on-rabbitmq)
- [Install InfluxDB]({{ site.url }}{{ site.baseurl }}/tuto/install-influxdb)
- [Consume data from Reactive-server]({{ site.url }}{{ site.baseurl }}/tuto/consume-data-from-rabbitmq)

#### Step X: FuntainJs

1) Install FuntainJs

```text
https://github.com/FountainJS/generator-fountain-webapp
```

```bash
yo fountain-webapp
```

#### Step X: Create a ReactJS component

#### Step X: Create a ReactJS socket module via STOMP and sockJS

#### Step X: Create widget with D3JS

#### Final Result

```bash
git clone ...
```

```bash
docker run --name reactive-client -p 8084:8084 -d jluccisano/reactive-server:latest
```