---
title: "Reactive Meteo Station"
excerpt_separator: "<!--more-->"
categories:
  - Home automation
tags:
  - Raspberry PI
---

### Overview


![architecture_overview](../assets/images/reactive-architecture.png)

#### Set Up a Raspberry PI 3

see this post [here](2017-01-14-setup_raspberry.md)

#### Electronic part

![schema_dht22](../assets/images/schema_dht22.png)

#### Interact with DHT22

see this post [here](2017-02-28-dht22_raspberry.md)


#### Install Docker (optional)

see this post [here](2017-02-28-install_docker.md)


#### Push temperature and humidity to RabbitMQ

Consume temperature and humidity from Queue

##### Simple Test

see this post [here](https://github.com/jluccisano/raspberry-scripts/blob/master/scripts/consume.py)


#### Reactive-Server

Create java AMQP client

#### Reactive client

Create reactive client to consume data from Browser
  - Install ReactJS
  - Create RxJs consume socket
  - Create Temperature Widget with D3Js
  - Push data to browser client vi Websockets (STOMP)

#### InfluxDB

- install 

https://hub.docker.com/_/influxdb/

docker run -d -p 8083:8083 -p 8086:8086 \
      --name=influxdb \
      -v /usr/lib/influxdb:/var/lib/influxdb \
      influxdb


- Consume/Aggregate data into database
- Create a complete reactive dashboard

#### Final Result
  