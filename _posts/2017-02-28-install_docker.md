---
title: "install docker"
excerpt_separator: "<!--more-->"
categories:
  - Home automation
tags:
  - Raspberry PI
---
### What'is Docker?



### Install Portainer.io Manage docker with gui


```bash
docker run -d -p 9000:9000 --name portainer -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
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

show docker-compose

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

docker exec -i -t CONTAINER_ID /bin/bash

```

### Use Docker-compose to up all images together

```yaml
version: '2'
services:
  reactive-client:
    image: "reactive-client"
    ports:
     - "8089:80"
    links:
     - "reactive-server:reactive-server"
  reactive-server:
    image: "jluccisano/reactive-app:latest"
    links:
      - "rabbitmq:rabbitmq"
  rabbitmq:
    image:  "rabbitmq:3-management"
    hostname: "rabbitmq"
    ports:
     - "5672:5672"
     - "8080:15672"
  influxdb:
    image: "influxdb"
    ports:
     - "8083:8083"
     - "8086:8086"
    environment:
     - INFLUXDB_ADMIN_ENABLED=true  
    volume: "/usr/lib/influxdb:/var/lib/influxdb"
   
```
[See code here](https://raw.githubusercontent.com/jluccisano/portfolio/master/docker-compose.yml)
Tips

sudo service docker stop
mv /var/lib/docker /home/desktop/docker
#sudo mount -o bind /var/lib/docker docker
sudo ln -s /home/desktop/docker /var/lib/docker
sudo vim /etc/default/docker >> DOCKER_OPTS="-g $(readlink -f /var/lib/docker)"
sudo service docker start



sudo docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 8080:15672 rabbitmq:3-management
sudo docker run --name mongo-nextrun -v /home/desktop/data/db:/data/db -d mongo:tag -p 27017:27017

