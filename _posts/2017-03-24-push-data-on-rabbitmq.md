---
title: "Push temperature and humidity to RabbitMQ"
excerpt_separator: "<!--more-->"
header:
  image: /assets/images/anthony-rossbach-59486.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
categories:
  - Home automation
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


###  Prerequisites

- Set up a Raspberry PI 3 [here](2017-01-14-setup_raspberry.md)
- Interacting with DHT22 Sensor [here](2017-02-28-dht22_raspberry.md)
- A server or your own computer with Docker [here](2017-02-28-install_docker.md)
- Install Git (optional) [here](https://git-scm.com/download/linux)


On your server:

a) Run rabbitmq image
```bash
docker run -d --hostname my-rabbit --name my-rabbit -p 5672:5672 -p 8080:15672 rabbitmq:3-management
```
see more [here](https://hub.docker.com/_/rabbitmq/)

You can see RabbitMQ management interface on port 8080.

On your Raspberry

a) Publisher

- Clone raspberry-scripts project
```bash
git clone git@github.com:jluccisano/raspberry-scripts.git
```

- Go to 
```bash
cd raspberry-scripts/scripts
```
- Edit the _config.yml
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
- Start virtualenv

```bash
virtualenv -p /usr/bin/python2.7 ~/env2.7/
source ~/env2.7/bin/activate
```
see more [here](2017-03-23-install_python.md)

Install dependencies:
```
pip install pika
pip install adafruit_python_dht
pip install pyyaml
```
see more [here](https://pika.readthedocs.io/en/0.10.0/)

- Start publisher

```bash
python publisher.py &
```
Show log:
```bash
tail -f /var/log/dht22/publisher.log
```

based on https://pika.readthedocs.io/en/0.10.0/examples/asynchronous_publisher_example.html

c) Consumer

- Start publisher

```bash
python consumer.py &
```

Show log:
```bash
tail -f /var/log/dht22/consumer.log
```

based on "https://pika.readthedocs.io/en/0.10.0/examples/asynchronous_consumer_example.html"


- Start publisher as Service

Follow this [tutorial](2017-03-23-create_service.md)

```bash
sudo systemctl start dht22_publisher.service
```