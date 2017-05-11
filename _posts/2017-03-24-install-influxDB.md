---
title: "Store data into InfluxDB"
related: true
header:
  overlay_image: /assets/images/influxdb_templated_query.gif
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/influxdb_templated_query.gif
categories:
  - Computer
tags:
  - InfluxDB
  - Docker
---
The objective of this tutorial is to install an InfluxDB container with Docker and interacting with it.


- [Prerequisites](#prerequisites)
- [Run influxDB on Docker](#run-influxdb-on-docker)
- [Create Database](#create-database)
- [Connect to influxDB](#connect-to-influxdb)
- [Create retention policy](#create-retention-policy)
- [Create continuous query](#create-continuous-query)
- [Useful commands](#useful-commands)

###  Prerequisites

- [Set up a Raspberry PI 3 ]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/raspberry/dht22-raspberry)
- [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/linux/install-docker)
- [Install Git (optional)](https://git-scm.com/download/linux)
- [Push data to rabbitMQ]({{ site.url }}{{ site.baseurl }}/computer/push-data-on-rabbitmq)

### Run influxDB on Docker

```bash
docker run -d -p 8083:8083 -p 8086:8086 \
      --name=influxdb \
      -v /usr/lib/influxdb:/var/lib/influxdb \
      influxdb
```
see more [here](https://hub.docker.com/_/influxdb/)

###  Create Database

```bash
CREATE DATABASE IF NOT EXISTS sensor
```

###  Connect to influxDB

```bash
influx
use sensor
```

###  Create retention policy

```sql
CREATE RETENTION POLICY one_years_only ON sensor DURATION 52w REPLICATION 1 DEFAULT
```
###  Create continuous query

```sql
CREATE CONTINUOUS QUERY cq_dht22_1h ON sensor BEGIN SELECT MEAN(temperature) AS  mean_temperature, MEAN(humidity) AS mean_humidity INTO sensor."one_years_only"."cq_dht22_1h" FROM dht22 GROUP BY time(1h), gatewayId END
```

```sql
CREATE CONTINUOUS QUERY cq_dht22_1d ON sensor BEGIN SELECT MEAN(temperature) AS  mean_temperature, MEAN(humidity) AS mean_humidity, MIN(temperature) as min_temperature , MAX(temperature) as max_temperature, MIN(humidity) as min_humidity, MAX(humidity) as max_humidity INTO sensor."one_years_only"."cq_dht22_1d" FROM dht22 GROUP BY time(1d), gatewayId END
```

###  Useful commands

```sql
SHOW RETENTION POLICIES ON sensor
```

```sql
DROP RETENTION POLICY one_years_only ON sensor
```


```sql
SHOW CONTINUOUS QUERIES
```

```sql
SELECT * FROM sensor."autogen".downsampled_dht22
```

```sql
DROP CONTINUOUS QUERY cq_1h ON sensor
```

```sql
DROP DATABASE IF EXISTS sensor
```

