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

```bash
git co 
```

Simple

```ecmascript 6
import React from 'react';

class ReactiveMeteoStation extends React.Component {
  render() {
    return (
      <div>
        <h2>Hello World !</h2>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
```

With JSX

```ecmascript 6
import React from 'react';

class ReactiveMeteoStation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: "Hello World!"
    };
  }

  render() {
    const title = this.state.title;
    return (
      <div>
        <h2> {title}</h2>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
```

### Step 2: Create a ReactJS socket module via STOMP and sockJS

```bash
git co 
```

```ecmascript 6
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Config from 'Config';

class ReactiveMeteoStation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dht22: {temperature: 0, humidity: 0}
    };

    this.socket = new SockJS(Config.serverURL + Config.webSocketEndpoint);
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {
      console.log(`connected, ${frame}!`);
      this.stompClient.subscribe('/queue/DHT22', data => {
        console.log(JSON.parse(data.body).data);
        this.setState({dht22: JSON.parse(data.body).data});
      });
    });
  }

  render() {
    const dht22 = this.state.dht22;

    return (
      <div>
        <h2>Temperature: {dht22.temperature.toFixed(2)} °C</h2>
        <h2>Humidity: {dht22.humidity.toFixed(2)} %</h2>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
```
### Step 3: Get data from Rest API


### Step 4: Create widget with D3JS

### Final Result

```bash
git clone ...
```

```bash
docker run --name reactive-client -p 8084:8084 -d jluccisano/reactive-server:latest
```