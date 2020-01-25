---
title: Direct Server Return
classes: wide
categories:
  - F5
  - A10
tags:
  - F5
  - A10
  - DSR
  - L3 DSR
  - npath routing
published: true
---

Applications like Radius, Tacacs need visibility to the IP address of the client machine that sends the authentication request. When these applications are behind a load balancer with a SNAT, the application sees load balancer's SNAT addresses as client addresses. One of the solutions is to use **Direct Server Return**.

## Direct Server Return

A load balancer VIP typically translates (maps) the destination IP address of the packet destined to the VIP, from the VIP address to one of the member address in the load balancing pool. When SNAT is applied on the VIP, the source address is translated to an IP address from the SNAT pool or the outgoing interface of the load balancer.

So, the first step to preserve the original client IP address is not to have SNAT on the VIP. With this, the packet from the load balancer reaches the listening interface of the server matching the destination IP address of the packet. The response from server has the destination as the original client IP address and the source as the listening interface IP address on which the server reveived the packet. The client drops the response as it never sent a request to that destination.

To make the server respond with the VIP address as source IP, the VIP address needs be configured on one of the server's interfaces. A loopback interface (lo) confiured with the VIP address. 

We now have a listener on the server same as the VIP address to accept traffic. On the load balancer VIP, destination address translation should be disabled, so that the load balancer preserves the destination address and not translate it to the member address in the pool. 

The request with destination address as the VIP cannot be routed from the load balancer towards to the server using normal routing, as IP belongs to the load balancer. So, an encapsulation mechanism like GRE or IPIP is used encapsulate the original packet with source and destination IPs and data preserved inside and outer packet with source IP as the load balancer and the destination IP address as the Server. This is essentially a GRE or IPIP tunnel between the load balancer and the server, through which the original packets flow. 

For the server to decapsulate the GRE or IPIP traffic, a tunnel interface is needed with the same IP address as that of its physical interface receiving the traffic. The tunnel interface decapsulates the traffic and the original request with the VIP address as destination reaches the loopback interface for processing. The server now responds with the source address as the loopback interface IP (VIP address), instead of the physical interface address.


https://wiki.archlinux.org/index.php/Kernel_module#Loading

## F5 Configuration

