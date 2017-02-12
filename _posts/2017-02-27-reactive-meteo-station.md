---
title: "Create a reactive Meteo Station"
related: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/jordan-ladikos-62738.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/jordan-ladikos-62738.jpg
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
The objective of this tutorial is to design a full reactive architecture interacting with a Raspberry PI 3 as
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


### Start the full stack with docker-compose

a. Stop all running your docker containers

b. Adapt the docker-compose file according your environment

```yaml
version: '2'
services:
  reactive-server:
    image: "jluccisano/reactive-server:latest"
    environment:
      - PORT=8084
      - RABBITMQ_ENDPOINT=amqp://rabbit_user:rabbit_password@rabbitmq:5672/myvhost
      - RABBITMQ_EXCHANGE=your_exchange_name
      - RABBITMQ_QUEUE=your_queue_name
      - RABBITMQ_GATEWAYID=your_gateway_id
      - INFLUXDB_URL=http://influxdb:8086
      - INFLUXDB_USERNAME=influx_username
      - INFLUXDB_PASSWORD=influx_password
      - INFLUXDB_DATABASE=influx_db_name
      - INFLUXDB_RETENTION_POLICY=influx_rp_name
    ports:
      - "8084:8084"
    links:
      - "rabbitmq:rabbitmq"
      - "influxdb:influxdb"
    depends_on:
      - "rabbitmq"
      - "influxdb"
  rabbitmq:
    image:  "rabbitmq:3-management"
    environment:
      - RABBITMQ_DEFAULT_USER=rabbit_user
      - RABBITMQ_DEFAULT_PASS=rabbit_password
      - RABBITMQ_DEFAULT_VHOST=myvhost
    ports:
     - "5672:5672"
     - "8092:15672"
  influxdb:
    image: "appcelerator/influxdb"
    volumes:
      - './resources/init_script.influxql:/etc/extra-config/influxdb/init_script.influxql:ro'
    ports:
      - "8083:8083"
      - "8086:8086"
  grafana:
    image: 'grafana/grafana'
    links:
      - "influxdb:influxdb"
    depends_on:
      - "influxdb"
    ports:
      - '3600:3000'
  reactive-client:
     image: 'jluccisano/reactive-client:1.0'
     links:
       - "reactive-server:reactive-server"
     depends_on:
       - "reactive-server"
     ports:
       - "8089:80"
  stub:
    build:
      context: ./resources
      dockerfile: stub.dockerfile
    environment:
      - RABBITMQ_ENDPOINT=amqp://rabbit_user:rabbit_password@rabbitmq:5672/myvhost
      - RABBITMQ_EXCHANGE=your_exchange_name
      - RABBITMQ_GATEWAYID=your_gateway_id
      - PUBLISH_INTERVAL=60
```
[See code here](https://raw.githubusercontent.com/jluccisano/portfolio/master/docker-compose.yml)

c. Run
```bash
docker-compose up -d
```
d. Go to http://YOUR_HOST:8089

### Final Result

ScreenShots