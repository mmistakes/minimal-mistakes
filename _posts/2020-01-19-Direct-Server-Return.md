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

A load balancer VIP typically translates (maps) the destination IP address of the packet destined to the VIP, from the VIP address to one of the member/server address in the load balancing pool. If the VIP has SNAT applied, the source address too is translated to an IP address in the SNAT pool or the egress interface of the load balancer.

[![LB VIP with SNAT.png](/assets/images/LB-VIP-with-DSR.png)](/assets/images/LB-VIP-with-DSR.png)
<img src ="/assets/images/LB-VIP-with-DSR.png" title="LB VIP with SNAT" width="150" height="100">

So, the first step to preserve the original client IP address is not to have SNAT on the VIP. Without SNAT, the client request egresses the load balancer and reaches the chosen member/server. In the response, the server uses the original client IP address as destination and the source as its interface IP address on which it reveived the request. However, the client rejects the response with the source IP address as the server IP address is not the destination the client sent the request.

To make the server respond with the VIP address as source IP address, the VIP address needs be configured on one of the server's loopback interfaces. On the load balancer, destination address translation should be disabled, so that client request egressing the load balancer has the VIP address as the destination address and not translated to a member/server address in the pool.

However, the client request egressing the load balancer with destination address as the VIP cannot be routed  to the server using normal routing, as VIP belongs to the load balancer. So, an encapsulation mechanism like GRE or IPIP is used to encapsulate the client request with original source and destination IPs and data preserved inside, and outer packet set with source IP as the load balancer egress interface IP and the destination IP address as the server. This essentially forms a GRE or IPIP tunnel between the load balancer and the server, through which the original request flows. 

![LB VIP with DSR.png](/assets/images/LB-VIP-with-DSR.png)

For the server to decapsulate the GRE or IPIP traffic, a tunnel interface is needed with the same IP address as that of its physical interface receiving the traffic. After decapsulation, the original client request with the VIP address as destination address reaches the loopback interface for processing. The server responds with the source address as the loopback interface IP (VIP address), instead of the physical interface address.


## F5 Configuration

    ltm profile fastl4 fasl4_tacacs-test {
        app-service none
        loose-close enabled
        loose-initialization enabled
        pva-acceleration none
    }

    ltm pool p_tacacs-test_49 {
        members {
            10.1.1.51:49 {
                address 10.1.1.51
            }
            10.1.1.52:49 {
                address 10.1.1.52
            }
            10.1.1.53:49 {
                address 10.1.1.53
            }
        }
        profiles {
            ipip                       <-- Using IPIP tunneling
        }
    }

    ltm virtual vs_tacacs-test_49 {
        destination 172.16.4.99:49
        ip-protocol tcp
        mask 255.255.255.255
        pool p_tacacs-test_49
        profiles {
            fasl4_tacacs-test { }
        }
        source 0.0.0.0/0
        translate-address disabled     <-- Disable destination address translation in egress request
        translate-port enabled
        vs-index 17
    }

## Linux Server Config


## References

https://wiki.archlinux.org/index.php/Kernel_module#Loading