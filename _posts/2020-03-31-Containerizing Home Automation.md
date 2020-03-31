---
title: Containerizing Home Automation
layout: single
classes: wide
categories:
  - links
tags:
  - links
published: false
---

## OpenHAB

I had to re-image my Intel NUC which runs my Home Automation system from Ubuntu 19.10 to Centos 8 recently and thought this might be good oppurtunity to containerize the applications/services. The

* OpenHAB - the main application that powers the smarthome system
* MQTT - for publishing/subscribing messages from/to WIFI clients (WIFI sockets, ESP8266s)
* Mopidy Spotify - Spotify player
* Snapcast Server - Read audio stream from the player (Mopidy Spotify)
* Snapcast Client - Receive audio stream from server and play audio

<div style="display: flex; justify-content: center;">
    <a href="/assets/images/Home-Automation.png" class="image-popup"><img src="/assets/images/Home-Automation.png" alt="Home-Automation.png" title="Home Automation" width="300" height="300"></a>
</div>