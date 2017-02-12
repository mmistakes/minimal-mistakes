---
title: "InfluxDB"
excerpt_separator: "InfluxDB"
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
### Store consume data into InfluxDB

- [Prerequisites](#prerequisites)
- [Run influxDB on Docker](#run-influxdb-on-docker)
- [Create Database](#create-database)
- [Connect to influxDB](#connect-to-influxdb)
- [Create retention policy](#create-retention-policy)
- [Create continuous query](#create-continuous-query)
- [Useful commands](#useful-commands)

####  Prerequisites

- Set up a Raspberry PI 3 [here](2017-01-14-setup_raspberry.md)
- Interacting with DHT22 Sensor [here](2017-02-28-dht22_raspberry.md)
- A server or your own computer with Docker [here](2017-02-28-install_docker.md)
- Install Git (optional) [here](https://git-scm.com/download/linux)
- Push data to rabbitMQ [here](2017-03-24-push-data-on-rabbitmq.md)

#### Run influxDB on Docker

```bash
docker run -d -p 8083:8083 -p 8086:8086 \
      --name=influxdb \
      -v /usr/lib/influxdb:/var/lib/influxdb \
      influxdb
```
see more [here](https://hub.docker.com/_/influxdb/)

####  Create Database

TODO

####  Connect to influxDB

```bash
influx
use sensor
```

####  Create retention policy

```sql
CREATE RETENTION POLICY one_years_only ON sensor DURATION 52w REPLICATION 1 DEFAULT
```
####  Create continuous query

```sql
CREATE CONTINUOUS QUERY cq_dht22_1h ON sensor BEGIN SELECT MEAN(temperature) AS  mean_temperature, MEAN(humidity) AS mean_humidity INTO sensor."one_years_only"."cq_dht22_1h" FROM dht22 GROUP BY time(1h), gatewayId END
```

```sql
CREATE CONTINUOUS QUERY cq_dht22_1d ON sensor BEGIN SELECT MEAN(temperature) AS  mean_temperature, MEAN(humidity) AS mean_humidity, MIN(temperature) as min_temperature , MAX(temperature) as max_temperature, MIN(humidity) as min_humidity, MAX(humidity) as max_humidity INTO sensor."one_years_only"."cq_dht22_1d" FROM dht22 GROUP BY time(1d), gatewayId END
```

####  Useful commands

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

