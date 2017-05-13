---
title: "Consume data from reactive client"
related: true
header:
  overlay_image: /assets/images/markus-spiske-109588.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/markus-spiske-109588.jpg
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
- [Create a simple ReactJS component](#create-a-simple-reactjs-component)
- [Create a ReactJS socket module via STOMP and sockJS](#create-a-reactjs-socket-module-via-stomp-and-sockjs)
- [Get data from Rest API](#get-data-from-rest-api)
- [Create widget with D3JS](#create-widget-with-d3js)
- [Final Result](#final-result)

###  Prerequisites

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/raspberry/dht22-raspberry)
- [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/linux/install-docker)
- [Install Git (optional)](https://git-scm.com/download/linux)
- [Push data to rabbitMQ]({{ site.url }}{{ site.baseurl }}/computer/push-data-on-rabbitmq)
- [Install InfluxDB]({{ site.url }}{{ site.baseurl }}/computer/install-influxdb)
- [Consume data from Reactive-server]({{ site.url }}{{ site.baseurl }}/computer/consume-data-from-rabbitmq)

### Overview

{% include figure image_path="/assets/images/consume-data-from-reactive-client.png" alt="Reactive Client Overview" caption="Reactive Client Overview" %}


### Clone the project:

[Get source here](https://github.com/jluccisano/reactive-client)

```bash
git clone git@github.com:jluccisano/reactive-client.git
```

### Create a simple ReactJS component

```bash
git checkout step1-create-react-component
```

##### Simple

```javascript
import React from 'react';

class ReactiveWeatherStation extends React.Component {
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

##### With JSX

```javascript
import React from 'react';

class ReactiveWeatherStation extends React.Component {
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
        <h2>{title}</h2>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
```

##### Run

```bash
gulp serve
```

##### Result

{% include figure image_path="/assets/images/step1-create-simple-react-component.png" alt="Simple React Component" caption="Simple React Component" %}


### Create a ReactJS socket module via STOMP and sockJS

```bash
git checkout step2-create-websocket-client
```

```javascript
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
        console.log(JSON.parse(data.body));
        this.setState({dht22: JSON.parse(data.body)});
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
##### Run

```bash
gulp serve
```

##### Result

{% include figure image_path="/assets/images/step2-create-websocket-client.png" alt="Create Websocket client" caption="Create Websocket client" %}


### Get data from Rest API

```bash
git checkout step3-get-data-from-rest-api
```

```javascript
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Config from 'Config';
import {Table} from 'react-bootstrap';
import Moment from 'react-moment';

class ReactiveMeteoStation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dht22: {temperature: 0, humidity: 0},
      dataProvider: [],
      lastWeekData: []
    };

    this.socket = new SockJS(Config.serverURL + Config.webSocketEndpoint);
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {
      console.log(`connected, ${frame}!`);
      this.stompClient.subscribe('/queue/DHT22', data => {
        console.log(JSON.parse(data.body));
        this.setState({dht22: JSON.parse(data.body)});
      });
    });
  }

  componentDidMount() {
    fetch(`${Config.serverURL}/api/v1/sensor/dht22/fresh/${Config.gatewayId}`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dht22: json});
    });

    fetch(`${Config.serverURL}/api/v1/sensor/dht22/continuous/${Config.gatewayId}?sample=1h&range=12h`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dataProvider: json.items});
    });

    fetch(`${Config.serverURL}/api/v1/sensor/dht22/continuous/${Config.gatewayId}?sample=1d&range=7d`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({lastWeekData: json.items});
    });
  }

  render() {
    const dht22 = this.state.dht22;
    const lastWeekData = this.state.lastWeekData;

    function LastWeekDataTable(lastWeekData) {
      if (lastWeekData.data) {
        const rows = lastWeekData.data.map((row, i) => {
          return (
            <tr key={i}>
              <td><Moment format="MMMM Do YYYY">{row.time}</Moment></td>
              <td>{row.min_temperature.toFixed(2)}°C/{row.max_temperature.toFixed(2)}°C</td>
              <td>{row.mean_temperature.toFixed(2)}°C</td>
              <td>{row.min_humidity.toFixed(2)}°C/{row.max_humidity.toFixed(2)}%</td>
              <td>{row.mean_humidity.toFixed(2)}°C</td>
            </tr>
          );
        });
        return (
          <Table responsive condensed>
            <thead>
              <tr>
                <th>day</th>
                <th>temperature min/max</th>
                <th>temperature mean</th>
                <th>humidity min/max</th>
                <th>humidity mean</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        );
      }
      return null;
    }
    return (
      <div>
        <h2>Temperature: {dht22.temperature.toFixed(2)} °C</h2>
        <h2>Humidity: {dht22.humidity.toFixed(2)} %</h2>
        <LastWeekDataTable data={lastWeekData}/>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
```


##### Run

```bash
gulp serve
```

##### Result

{% include figure image_path="/assets/images/step3-get-data-from-rest-api.png" alt="Get Data from REST API" caption="Get Data from REST API" %}



### Create widget with D3JS

```bash
git checkout step4-show-consume-data-with-d3js
```

```javascript
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Config from 'Config';
import {LineChart} from 'react-d3-basic';
import d3 from 'd3';
import Moment from 'react-moment';
import {Table} from 'react-bootstrap';

class ReactiveMeteoStation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dht22: {temperature: 0, humidity: 0},
      dataProvider: [],
      lastWeekData: []
    };

    this.socket = new SockJS(Config.serverURL + Config.webSocketEndpoint);
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {
      console.log(`connected, ${frame}!`);
      this.stompClient.subscribe('/queue/DHT22', data => {
        console.log(JSON.parse(data.body));
        this.setState({dht22: JSON.parse(data.body)});
      });
    });
  }

  componentDidMount() {
    fetch(`${Config.serverURL}/api/v1/sensor/dht22/fresh/${Config.gatewayId}`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dht22: json});
    });

    fetch(`${Config.serverURL}/api/v1/sensor/dht22/continuous/${Config.gatewayId}?sample=1h&range=12h`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dataProvider: json.items});
    });

    fetch(`${Config.serverURL}/api/v1/sensor/dht22/continuous/${Config.gatewayId}?sample=1d&range=7d`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({lastWeekData: json.items});
    });
  }

  render() {
    const dht22 = this.state.dht22;
    const dataProvider = this.state.dataProvider;
    const lastWeekData = this.state.lastWeekData;

    const chartSeries = [
      {
        field: 'mean_temperature',
        name: 'Temperature',
        color: '#ff7f0e',
        style: {
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fillOpacity: 0.2
        }
      },
      {
        field: 'mean_humidity',
        name: 'Humidity',
        color: '#65b2ff',
        style: {
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fillOpacity: 0.2
        }
      }
    ];

    function LastWeekDataTable(lastWeekData) {
      if (lastWeekData.data) {
        const rows = lastWeekData.data.map((row, i) => {
          return (
            <tr key={i}>
              <td><Moment format="MMMM Do YYYY">{row.time}</Moment></td>
              <td>{row.min_temperature.toFixed(2)}°C/{row.max_temperature.toFixed(2)}°C</td>
              <td>{row.mean_temperature.toFixed(2)}°C</td>
              <td>{row.min_humidity.toFixed(2)}°C/{row.max_humidity.toFixed(2)}%</td>
              <td>{row.mean_humidity.toFixed(2)}°C</td>
            </tr>
          );
        });
        return (
          <Table responsive condensed>
            <thead>
              <tr>
                <th>day</th>
                <th>temperature min/max</th>
                <th>temperature mean</th>
                <th>humidity min/max</th>
                <th>humidity mean</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        );
      }
      return null;
    }

    const parseISODate = d3.time.format('%Y-%m-%dT%H:%M:%SZ').parse;

    const x = function (d) {
      return parseISODate(d.time);
    };
    return (
      <div>
        <h3>Temperature: {dht22.temperature.toFixed(2)} °C</h3>
        <h3>Humidity: {dht22.humidity.toFixed(2)} %</h3>
        <LineChart width={800} height={200} data={dataProvider} chartSeries={chartSeries} x={x} xScale={"time"} yScale={"linear"}/>
        <LastWeekDataTable data={lastWeekData}/>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
```

##### Run

```bash
gulp serve
```

##### Result

{% include figure image_path="/assets/images/step3-get-data-from-rest-api.png" alt="Visualize data with D3js" caption="Visualize data with D3js" %}


### Final Result

[Get full source here](https://github.com/jluccisano/reactive-client)

[Show online version](http://hermes.ddns.net:8089)

{% include figure image_path="/assets/images/final-result.png" alt="Final result" caption="Final result" %}




