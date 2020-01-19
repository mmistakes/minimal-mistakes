---
title: Direct Server Return
classes: wide
categories:
  - 'F5, A10'
tags:
  - 'f5, a10'
  - DSR
  - npath routing
published: true
---

## Introduction

Applications like Radius, Tacacs need visibility to the IP address of the client machine that sends the authentication request. When these applications are behind a load balancer with a SNAT, the application sees load balancer's SNAT addresses as client addresses. One of the solutions is to use **Direct Server Return**.

## Direct Server Return

A load balancer VIP typically translates (maps) the destination IP address of the packet destined to the VIP, from the VIP address to one of the member address in the load balancing pool. When SNAT is applied on the VIP, the source address is translated to an IP address from the SNAT pool or the outgoing interface of the load balancer.

So, the first step to preserve the original client IP address is not to have SNAT on the VIP. 