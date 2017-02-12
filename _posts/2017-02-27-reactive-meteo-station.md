---
title: "Reactive Meteo Station"
related: true
header:
  overlay_color: "#000"
  overlay_filter: "0"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/caspar-rubin-224229.jpg
categories:
  - Automation
tags:
  - Raspberry PI
  - RabbitMQ
  - D3js
  - Docker
  - Gulp
  - Java
  - Maven
  - InfluxDB
  - Spring
  - ReactJs
  - ES6
  - Swagger
  - Python
  - WebSocket
  - Git
  - μService
  - REST
  - Internet of Things
---
The objective of this tutorial is to design a full reactive architecture in order to interact with a Raspberry PI 3 as
μService producing temperature and humidity data.

- [Prerequisites](#prerequisites)
- [Overview](#overview)

###  Prerequisites

-  [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
-  [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/raspberry/dht22-raspberry)
-  [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/linux/install-docker)
-  [Install Git](https://git-scm.com/download/linux)
-  [Push data to rabbitMQ]({{ site.url }}{{ site.baseurl }}/computer/push-data-on-rabbitmq)
-  [Consume data from rabbitMQ]({{ site.url }}{{ site.baseurl }}/computer/consume-data-from-rabbitmq)

### Overview

{% capture fig_img %}
![architecture_overview]({{ basepath }}/assets/images/reactive-architecture.png)
{% endcapture %}


| Component        |    Role       | Description  |
| ------------- |:-------------:| -----:|
| Raspberry PI 3   | μService | The Raspberry PI get data sensor and push them over RabbitMQ |
| RabbitMQ  | MOM(message-oriented middleware) | RabbitMQ is message broker that implements the Advanced Message Queuing Protocol (AMQP)  see more [here](https://www.rabbitmq.com/features.html)|
| Reactive-server  | Proxy | The server has 2 functions: consumes data from the RabbitMQ and push data directly on the socket |
| InfluxDB  | Metric database | InfluxDB is a time series database.|
| Reactive-client  | GUI | The GUI consumes data via WebSocket with Reactive-Server |


#### Start the full stack with docker-compose

a. Stop all running your docker containers

b. Adpat the docker-compose file according your environment

```yaml
version: '2'
services:
  reactive-client:
    image: "reactive-client"
    ports:
     - "8089:80"
    links:
     - "reactive-server:reactive-server"
  reactive-server:
    image: "jluccisano/reactive-app:latest"
    links:
      - "rabbitmq:rabbitmq"
  rabbitmq:
    image:  "rabbitmq:3-management"
    hostname: "rabbitmq"
    ports:
     - "5672:5672"
     - "8080:15672"
  influxdb:
    image: "influxdb"
    ports:
     - "8083:8083"
     - "8086:8086"
    environment:
     - INFLUXDB_ADMIN_ENABLED=true  
    volume: "/usr/lib/influxdb:/var/lib/influxdb"
   
```
[See code here](https://raw.githubusercontent.com/jluccisano/portfolio/master/docker-compose.yml)

c. Run
```bash
docker-compose up -d
```
d. Go to http://YOUR_HOST:8089

#### Final Result

ScreenShots