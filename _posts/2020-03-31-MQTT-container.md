---
title: Containerizing Home Automation
layout: single
classes: wide
categories:
  - links
tags:
  - links
published: False
---

MQTT Docker:

Eclipse Mosquitto pvodies an official docker image on Docker [HUB](https://hub.docker.com/_/eclipse-mosquitto)

~~~ bash
[violet@greenbox ~]$ docker ps -f name=elated_lumiere  -s
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES               SIZE
164cf486ee32        eclipse-mosquitto   "/docker-entrypoint.…"   4 days ago          Up 4 days                               elated_lumiere      0B (virtual 5.6MB)
[violet@greenbox ~]$ 
~~~

~~~ bash
docker run -d \
  --net=host \
  --name=mosquitto \
  -v source="/opt/mosquitto/config",destination=/mosquitto/config/ \
  -v source="/opt/mosquitto/data",destination=/mosquitto/data/ \
  -v source="/var/log/mosquitto/",destination=/mosquitto/log/ \
  eclipse-mosquitto:latest
~~~

