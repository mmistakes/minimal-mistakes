---
title: "Consume data from reactive client"
related: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
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
  - D3js
  - HTML5
  - JavaScript
  - Stomp
  - Internet of Things
---
The objective of this tutorial is to develop a reactive client which consuming temperature and 
 humidity via websocket and showing a dashboard of continuous data via a REST API.


- [Prerequisites](#prerequisites)

###  Prerequisites

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/raspberry/dht22-raspberry)
- [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/computer/install-docker)
- [Install Git (optional)](https://git-scm.com/download/linux)
- [Push data to rabbitMQ]({{ site.url }}{{ site.baseurl }}/computer/push-data-on-rabbitmq)
- [Install InfluxDB]({{ site.url }}{{ site.baseurl }}/computer/install-influxdb)
- [Consume data from Reactive-server]({{ site.url }}{{ site.baseurl }}/computer/consume-data-from-rabbitmq)

### Step X: FuntainJs

1) Install FuntainJs

```text
https://github.com/FountainJS/generator-fountain-webapp
```

```bash
yo fountain-webapp
```

### Step 1: Create a ReactJS component

### Step 2: Create a ReactJS socket module via STOMP and sockJS

### Step 3: Create widget with D3JS

### Final Result

```bash
git clone ...
```

```bash
docker run --name reactive-client -p 8084:8084 -d jluccisano/reactive-server:latest
```