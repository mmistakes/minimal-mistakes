---
title: "Install Docker"
related: true
header:
  overlay_image: /assets/images/boba-jovanovic-65138.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/boba-jovanovic-65138.jpg
categories:
  - Linux
tags:
  - Docker
  - Unix
---
The objective of this tutorial is to install Docker engine and share some useful command line to interact with it.


- [What's Docker](#what-docker)
- [Installation](#installation)
- [Install Portainer.io](#install-portainer)
- [Install Docker Compose](#install-docker-compose)
- [Install on Raspberry](#install-on-raspberry)
- [Useful Docker command line](#useful-docker-command-line)

### What's Docker?

All you need to know about Docker is [here](https://www.docker.com/what-docker)

### Installation

All is [here](https://docs.docker.com/engine/installation/)

### Install Portainer.io 

Manage docker with GUI

```bash
docker run -d -p 9000:9000 --name portainer -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
```

See more about [portainer.io](http://portainer.io/install.html)

### Install Docker Compose

Compose is a tool for defining and running multi-container Docker applications...
See more [here](https://docs.docker.com/compose/overview/)

```bash
curl -L "https://github.com/docker/compose/releases/download/1.10.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

See more [here](https://docs.docker.com/compose/install/)

### Useful docker command line

- Get list of running containers
```bash
sudo docker ps -a 
```

- kill a container
```bash
sudo docker kill YOUT_CONTAINER_ID
```
- Remove container
```bash
docker rm CONTAINER_ID
```

- Get list of images
```bash
sudo docker images
```

- Remove image
```bash
docker rmi IMAGE_ID
```

- Interacting with the container
```bash
docker exec -i -t CONTAINER_ID /bin/bash
```

- Restart docker service

```bash
sudo systemctl restart docker
```

- Avoid using sudo 

```bash
groupadd docker
usermod -aG docker YOUR_USER
```

- Bind your docker repository in external file system

```bash
sudo service docker stop
mv /var/lib/docker /docker
sudo ln -s /docker /var/lib/docker
sudo service docker start
```

- Set DOCKER_OPTS

```bash
sudo vim /etc/default/docker >> DOCKER_OPTS="-g $(readlink -f /var/lib/docker)"
```

### Install on Raspberry

```bash
curl -sSL https://get.docker.com | sh
```

See more [here](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/)

### Link data into other disk

systemctl stop docker

mv /var/lib/docker /home/jluccisano/docker

ln -s /home/jluccisano/docker /var/lib/docker

systemctl start docker




