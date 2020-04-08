---
title: Containerizing Home Automation
layout: single
classes: wide
categories:
  - links
tags:
  - links
published: True
---
Draft
## OpenHAB

I had to re-image my Intel NUC which runs my Home Automation system from Ubuntu 19.10 to Centos 8 recently and thought this might be good oppurtunity to containerize the applications/services. 

<div style="display: flex; justify-content: center;">
    <a href="/assets/images/Home-Automation.png" class="image-popup"><img src="/assets/images/Home-Automation.png" alt="Home-Automation.png" title="Home Automation" width="500" height="500"></a>
</div>

Following services currently run on the system

* OpenHAB - the main application that powers smarthome automation
* MQTT - for publishing/subscribing messages to/from WIFI clients (WIFI sockets, ESP8266s)
* Librespot - Spotify player
* Snapcast Server - Read audio stream from the player (Librespot)
* Snapcast Client - Receive audio stream from server and play audio

