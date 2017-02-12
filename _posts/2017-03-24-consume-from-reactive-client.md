---
title: "Consume from reactive client"
related: true
header:
  overlay_color: "#000"
  overlay_filter: "0"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/caspar-rubin-224229.jpg
categories:
  - Computer
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
TODO description


- [Prerequisites](#prerequisites)

###  Prerequisites

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/raspberry/dht22-raspberry)
- [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/computer/install-docker)
- [Install Git (optional)](https://git-scm.com/download/linux)
- [Push data to rabbitMQ]({{ site.url }}{{ site.baseurl }}/computer/push-data-on-rabbitmq)
- [Install InfluxDB]({{ site.url }}{{ site.baseurl }}/computer/install-influxdb)
- [Consume data from Reactive-server]({{ site.url }}{{ site.baseurl }}/computer/consume-data-from-rabbitmq)

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