---
title: "Push temperature and humidity to RabbitMQ"
excerpt_separator: "Push temperature and humidity to RabbitMQ"
related: true
categories:
  - tuto
tags:
  - Raspberry PI
  - RabbitMQ
  - Docker
  - Python
  - Git
  - μService
  - Internet of Things
---

### Push temperature and humidity to RabbitMQ

- [Prerequisites](#prerequisites)
- [Run RabbitMQ container](#prerequisites)
- [Create a publisher on your Raspberry](#create-publisher-on-your-raspberry)
- [Create a consumer on your Raspberry](#create-consumer-on-your-raspberry)
- [Start publisher as Service](#start-publisher-as-service)

####  Prerequisites

- [Set up a Raspberry PI 3 ]({{ site.url }}{{ site.baseurl }}/tuto/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/tuto/dht22-raspberry)
- [A server or your own computer with Docker]({{ site.url }}{{ site.baseurl }}/tuto/install-docker)
- [Install Git](https://git-scm.com/download/linux)


#### Run RabbitMQ container

```bash
docker run -d --hostname my-rabbit --name my-rabbit -p 5672:5672 -p 8080:15672 rabbitmq:3-management
```
see more [here](https://hub.docker.com/_/rabbitmq/)

You can see RabbitMQ management interface on port 8080.

#### Create a publisher on your Raspberry

1) Clone raspberry-scripts project

```bash
git clone git@github.com:jluccisano/raspberry-scripts.git
```

2) Go to 
```bash
cd raspberry-scripts/scripts
```
3) Edit the _config.yml

Replace by your config

```bash
vim _config.yml
```
```text
rabbitmq:
    url: amqp://guest:guest@RABBIT_DOCKER_HOST:5672
    gatewayId: raspberry_1
    sendFrom: RASPBERRY_IP_ADDRESS
    exchange: events
    publish_interval: 60
    queue: event     
    logPath: /var/log/dht22
```
4) Start virtualenv (optional)

```bash
virtualenv -p /usr/bin/python2.7 ~/env2.7/
source ~/env2.7/bin/activate
```
see more [here]({{ site.url }}{{ site.baseurl }}/tuto/install-python#create-virtualenv)

Install dependencies:
```
pip install pika
pip install adafruit_python_dht
pip install pyyaml
```
see more [here](https://pika.readthedocs.io/en/0.10.0/)

5) Start publisher

```bash
python publisher.py &
```
Show log:
```bash
tail -f /var/log/dht22/publisher.log
```

Note: code based on https://pika.readthedocs.io/en/0.10.0/examples/asynchronous_publisher_example.html

#### Create a consumer on your Raspberry

1) Start publisher

```bash
python consumer.py &
```

Show log:
```bash
tail -f /var/log/dht22/consumer.log
```

code based on "https://pika.readthedocs.io/en/0.10.0/examples/asynchronous_consumer_example.html"

#### Start publisher as Service

Follow this [tutorial]({{ site.url }}{{ site.baseurl }}/tuto/create-service)

Edit publisher.py and change config.yml to /opt/dht22/_config.yml

1) Start 

```bash
sudo systemctl start dht22_publisher.service
```

2) Check

```bash
sudo systemctl status dht22_publisher.service
```

```
(env2.7) pi@raspberrypi:/opt/dht22 $ sudo systemctl status dht22.service
● dht22.service - DHT22
   Loaded: loaded (/lib/systemd/system/dht22.service; enabled)
   Active: active (running) since Fri 2017-03-24 13:21:46 UTC; 1s ago
 Main PID: 14457 (python)
   CGroup: /system.slice/dht22.service
           └─14457 /usr/bin/python /opt/dht22/publisher.py
```

Show log:
```bash
tail -f /var/log/dht22/publisher.log
```

Great publisher works fine !!

```bash
2017-03-24 13:21:48,032 Start publishing
2017-03-24 13:21:48,033 Scheduling next message for 60.0 seconds
2017-03-24 13:22:47,668 Received 0 heartbeat frames, sent 0
2017-03-24 13:22:47,669 Sending heartbeat frame
2017-03-24 13:22:47,784 Received heartbeat frame
2017-03-24 13:22:48,701 [>] Published data {'expire': 38231000, 'data': {'humidity': 34.20000076293945, '@type': 'DHT22', 'temperature': 24.399999618530273}, 'created': 1490361768} # 1
2017-03-24 13:22:48,701 Scheduling next message for 60.0 seconds
```

3) Add service to start on Boot