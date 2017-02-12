---
title: "Reactive Meteo Station"
excerpt_separator: "<!--more-->"
categories:
  - Home automation
tags:
  - Raspberry PI
---

Le but de ce post est de mettre en place une architecture full reactive à tous les niveaux de la stack.
Le but est de pouvoir émettre les données de mon capteur de température/humidité, de les consolider puis de les consommer
à travers un browser.

1) Le Raspberry PI 3 collecte les informations du capteurs toutes les 30 secondes
2) La gateway envoie ses données sur MOM (RabbitMQ)
3) Les données sont consommées par un serveur (Reactive-server) qui fait office de proxy. En effet, lorsqu'un nouveau
message est consommée par le serveur, les données sont automatiquement forwarder sur les sockets clients qui sont actuellement
connectés avec leur browser. Le serveur stocke également la donnée dans une base de données temporelle (InfluxDB) afin
de consolider les données pour en faire des views.
4) Ré

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
  