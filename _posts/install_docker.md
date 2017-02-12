---
title: "install docker"
excerpt_separator: "<!--more-->"
categories:
  - Home automation
tags:
  - Raspberry PI
---

### Install Portainer.io

```bash
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
```

see more: http://portainer.io/install.html

### Install RabbitMQ

Get latest image
```bash
sudo docker pull rabbitmq
```

```bash
sudo docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 8080:15672 rabbitmq:3-management
```

### Install Reactive-server


### Install Reactive-client


### Useful docker command line


Get list of running containers
```bash
sudo docker ps -a 
```

kill container
```bash
sudo docker kill YOUT_CONTAINER_ID
```

Get list of images
```bash
sudo docker images
```