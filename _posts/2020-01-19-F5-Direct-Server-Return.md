---
title: "F5 Direct Server Return"
classes: wide
categories:
  - F5
tags:
  - f5
  - DSR
  - npath routing
---

# Introduction

Applications like Radius, Tacacs need visibility to the IP address of the client machine that sends the authentication request. When these applications are behind a load balancer with a SNAT, the application sees load balancer's SNAT addresses as client addresses. One of the solutions is to use **Direct Server Return**.