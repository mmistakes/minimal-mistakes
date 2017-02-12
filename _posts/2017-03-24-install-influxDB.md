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
  - InfluxDB
  - Docker
---
### Consume temperature and humidity from RabbitMQ

- [Prerequisites](#prerequisites)

###  Prerequisites

- Set up a Raspberry PI 3 [here](2017-01-14-setup_raspberry.md)
- Interacting with DHT22 Sensor [here](2017-02-28-dht22_raspberry.md)
- A server or your own computer with Docker [here](2017-02-28-install_docker.md)
- Install Git (optional) [here](https://git-scm.com/download/linux)
- Push data to rabbitMQ [here](2017-03-24-push-data-on-rabbitmq.md)


- InfluxDB

```bash
docker run -d -p 8083:8083 -p 8086:8086 \
      --name=influxdb \
      -v /usr/lib/influxdb:/var/lib/influxdb \
      influxdb
```
see more [here](https://hub.docker.com/_/influxdb/)

- Consume/Aggregate data into database