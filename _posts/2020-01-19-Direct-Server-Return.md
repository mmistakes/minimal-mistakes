---
title: Direct Server Return
layout: single
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

<div style="display: flex; justify-content: center;">
    <a href="/assets/images/LB-VIP-with-SNAT.png" class="image-popup"><img src="/assets/images/LB-VIP-with-SNAT.png" alt="LB VIP with SNAT.png" title="LB VIP with SNAT" width="300" height="300"></a>
</div>

So, the first step to preserve the original client IP address is not to have SNAT on the VIP. Without SNAT, the client request egresses the load balancer and reaches the chosen member/server. In the response, the server uses the original client IP address as destination and the source as its interface IP address on which it reveived the request. However, the client rejects the response with the source IP address as the server IP address is not the destination the client sent the request.

To make the server respond with the VIP address as source IP address, the VIP address needs be configured on one of the server's loopback interfaces. On the load balancer, destination address translation should be disabled, so that client request egressing the load balancer has the VIP address as the destination address and not translated to a member/server address in the pool.

However, the client request egressing the load balancer with destination address as the VIP cannot be routed  to the server using normal routing, as VIP belongs to the load balancer. So, an encapsulation mechanism like GRE or IPIP is used to encapsulate the client request with original source and destination IPs and data preserved inside, and outer packet set with source IP as the load balancer egress interface IP and the destination IP address as the server. This essentially forms a GRE or IPIP tunnel between the load balancer and the server, through which the original request flows. 

<div style="display: flex; justify-content: center;">
    <a href="/assets/images/LB-VIP-with-DSR.png" class="image-popup"><img src="/assets/images/LB-VIP-with-DSR.png" alt="LB VIP with DSR.png" title="LB VIP with DSR" width="300" height="300"></a>
</div>

For the server to decapsulate the GRE or IPIP traffic, a tunnel interface is needed with the same IP address as that of its physical interface receiving the traffic. After decapsulation, the original client request with the VIP address as destination address reaches the loopback interface for processing. The server responds with the source address as the loopback interface IP (VIP address), instead of the physical interface address.


## F5 Configuration
~~~ go
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
        ipip                       #<-- Using IPIP tunneling
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
    translate-address disabled     #<-- Disable destination address translation in egress request
    translate-port enabled
    vs-index 17
}
~~~

## Linux Server Config

IPIP:

~~~ go
modprobe ipip       #Load the IPIP module in kernel, if not loaded at boot time
ip link set tunl0 up

ip addr add 10.1.1.52 dev tunl0 scope host
ip addr add 172.16.4.99 dev lo scope host label lo:0 

sysctl -w net.ipv4.conf.all.arp_ignore=3
sysctl -w net.ipv4.conf.all.arp_announce=2
sysctl -w net.ipv4.conf.all.rp_filter=2
sysctl -w net.ipv4.conf.tunl0.rp_filter=0
~~~

GRE:

~~~
modprobe ip_gre
~~~


## Captures

Client:
~~~ go
[violet@srv-services-01 ~]$ tcpdump -s0 -nn  -r tacacs-capture.pcap 
reading from file tacacs-capture.pcap, link-type EN10MB (Ethernet)
23:14:09.162109 IP 192.168.11.201.61067 > 172.16.4.99.49: Flags [S], seq 277734018, win 64240, options [mss 1460,nop,wscale 8,nop,nop,sackOK], length 0
23:14:09.167608 IP 172.16.4.99.49 > 192.168.11.201.61067: Flags [S.], seq 2220389578, ack 277734019, win 29200, options [mss 1460,nop,nop,sackOK,nop,wscale 7], length 0
23:14:09.167728 IP 192.168.11.201.61067 > 172.16.4.99.49: Flags [.], ack 1, win 513, length 0
23:14:09.204850 IP 192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], seq 1:27, ack 1, win 513, length 26
23:14:09.208491 IP 172.16.4.99.49 > 192.168.11.201.61067: Flags [.], ack 27, win 229, length 0
23:14:09.208491 IP 172.16.4.99.49 > 192.168.11.201.61067: Flags [P.], seq 1:29, ack 27, win 229, length 28
23:14:09.243522 IP 192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], seq 27:50, ack 29, win 513, length 23
23:14:09.247387 IP 172.16.4.99.49 > 192.168.11.201.61067: Flags [P.], seq 29:47, ack 50, win 229, length 18
23:14:09.247388 IP 172.16.4.99.49 > 192.168.11.201.61067: Flags [F.], seq 47, ack 50, win 229, length 0
23:14:09.247700 IP 192.168.11.201.61067 > 172.16.4.99.49: Flags [.], ack 48, win 513, length 0
23:14:10.140179 IP 192.168.11.201.61067 > 172.16.4.99.49: Flags [R.], seq 50, ack 48, win 0, length 0

~~~

Load Balancer:
~~~ go
[jana@adc:Active:Standalone] ~ # tcpdump  -vvv -s0 -nni 0.0 host 192.168.11.201
tcpdump: listening on 0.0, link-type EN10MB (Ethernet), capture size 65535 bytes
23:14:14.945778 IP (tos 0x0, ttl 127, id 7056, offset 0, flags [DF], proto TCP (6), length 52)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [S], cksum 0x156e (correct), seq 277734018, win 64240, options [mss 1460,nop,wscale 8,nop,nop,sackOK], length 0 in slot1/tmm0 lis=
23:14:14.945841 IP (tos 0x0, ttl 126, id 7056, offset 0, flags [DF], proto TCP (6), length 52)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [S], cksum 0x7d0b (incorrect -> 0x156e), seq 277734018, win 64240, options [mss 1460,nop,wscale 8,nop,nop,sackOK], length 0 out slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:14.945846 IP (tos 0x0, ttl 255, id 53539, offset 0, flags [DF], proto IPIP (4), length 72)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7056, offset 0, flags [DF], proto TCP (6), length 52)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [S], cksum 0x156e (correct), seq 277734018, win 64240, options [mss 1460,nop,wscale 8,nop,nop,sackOK], length 0 out slot1/tmm0 lis=
23:14:14.949800 IP (tos 0x0, ttl 127, id 7057, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [.], cksum 0x55fd (correct), seq 277734019, ack 2220389579, win 513, length 0 in slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:14.949812 IP (tos 0x0, ttl 126, id 7057, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [.], cksum 0x7cff (incorrect -> 0x55fd), seq 0, ack 1, win 513, length 0 out slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:14.949815 IP (tos 0x0, ttl 255, id 53543, offset 0, flags [DF], proto IPIP (4), length 60)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7057, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [.], cksum 0x55fd (correct), seq 0, ack 1, win 513, length 0 out slot1/tmm0 lis=
23:14:14.987086 IP (tos 0x0, ttl 127, id 7058, offset 0, flags [DF], proto TCP (6), length 66)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], cksum 0x6a0c (correct), seq 0:26, ack 1, win 513, length 26 in slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:14.987097 IP (tos 0x0, ttl 126, id 7058, offset 0, flags [DF], proto TCP (6), length 66)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], cksum 0x7d19 (incorrect -> 0x6a0c), seq 0:26, ack 1, win 513, length 26 out slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:14.987100 IP (tos 0x0, ttl 255, id 53547, offset 0, flags [DF], proto IPIP (4), length 86)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7058, offset 0, flags [DF], proto TCP (6), length 66)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], cksum 0x6a0c (correct), seq 0:26, ack 1, win 513, length 26 out slot1/tmm0 lis=
23:14:15.025734 IP (tos 0x0, ttl 127, id 7059, offset 0, flags [DF], proto TCP (6), length 63)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], cksum 0x70da (correct), seq 26:49, ack 29, win 513, length 23 in slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:15.025744 IP (tos 0x0, ttl 126, id 7059, offset 0, flags [DF], proto TCP (6), length 63)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], cksum 0x7d16 (incorrect -> 0x70da), seq 26:49, ack 29, win 513, length 23 out slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:15.025748 IP (tos 0x0, ttl 255, id 53551, offset 0, flags [DF], proto IPIP (4), length 83)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7059, offset 0, flags [DF], proto TCP (6), length 63)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], cksum 0x70da (correct), seq 26:49, ack 29, win 513, length 23 out slot1/tmm0 lis=
23:14:15.030995 IP (tos 0x0, ttl 127, id 7060, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [.], cksum 0x559d (correct), seq 49, ack 48, win 513, length 0 in slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:15.031005 IP (tos 0x0, ttl 126, id 7060, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [.], cksum 0x7cff (incorrect -> 0x559d), seq 49, ack 48, win 513, length 0 out slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:15.031008 IP (tos 0x0, ttl 255, id 53555, offset 0, flags [DF], proto IPIP (4), length 60)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7060, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [.], cksum 0x559d (correct), seq 49, ack 48, win 513, length 0 out slot1/tmm0 lis=
23:14:15.923587 IP (tos 0x0, ttl 127, id 7061, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [R.], cksum 0x579a (correct), seq 49, ack 48, win 0, length 0 in slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:15.923599 IP (tos 0x0, ttl 126, id 7061, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [R.], cksum 0x7cff (incorrect -> 0x579a), seq 49, ack 48, win 0, length 0 out slot1/tmm0 lis=/Common/vs_tacacs-test_49
23:14:15.923604 IP (tos 0x0, ttl 255, id 53566, offset 0, flags [DF], proto IPIP (4), length 60)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7061, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [R.], cksum 0x579a (correct), seq 49, ack 48, win 0, length 0 out slot1/tmm0 lis=

~~~

Server:
~~~ go
[violet@srv-services-02 ~]$ sudo tcpdump -s0 -vvv -nni ens192 host 192.168.11.201
tcpdump: listening on ens192, link-type EN10MB (Ethernet), capture size 262144 bytes
23:14:08.565129 IP (tos 0x0, ttl 254, id 53539, offset 0, flags [DF], proto IPIP (4), length 72)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7056, offset 0, flags [DF], proto TCP (6), length 52)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [S], cksum 0x156e (correct), seq 277734018, win 64240, options [mss 1460,nop,wscale 8,nop,nop,sackOK], length 0
23:14:08.565261 IP (tos 0x0, ttl 64, id 0, offset 0, flags [DF], proto TCP (6), length 52)
    172.16.4.99.49 > 192.168.11.201.61067: Flags [S.], cksum 0x7d0b (incorrect -> 0xa51b), seq 2220389578, ack 277734019, win 29200, options [mss 1460,nop,nop,sackOK,nop,wscale 7], length 0
23:14:08.568988 IP (tos 0x0, ttl 254, id 53543, offset 0, flags [DF], proto IPIP (4), length 60)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7057, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [.], cksum 0x55fd (correct), seq 1, ack 1, win 513, length 0
23:14:08.606287 IP (tos 0x0, ttl 254, id 53547, offset 0, flags [DF], proto IPIP (4), length 86)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7058, offset 0, flags [DF], proto TCP (6), length 66)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], cksum 0x6a0c (correct), seq 1:27, ack 1, win 513, length 26
23:14:08.606351 IP (tos 0x0, ttl 64, id 40566, offset 0, flags [DF], proto TCP (6), length 40)
    172.16.4.99.49 > 192.168.11.201.61067: Flags [.], cksum 0x7cff (incorrect -> 0x56ff), seq 1, ack 27, win 229, length 0
23:14:08.606843 IP (tos 0x0, ttl 64, id 40567, offset 0, flags [DF], proto TCP (6), length 68)
    172.16.4.99.49 > 192.168.11.201.61067: Flags [P.], cksum 0x7d1b (incorrect -> 0xd085), seq 1:29, ack 27, win 229, length 28
23:14:08.644951 IP (tos 0x0, ttl 254, id 53551, offset 0, flags [DF], proto IPIP (4), length 83)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7059, offset 0, flags [DF], proto TCP (6), length 63)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [P.], cksum 0x70da (correct), seq 27:50, ack 29, win 513, length 23
23:14:08.645399 IP (tos 0x0, ttl 64, id 40568, offset 0, flags [DF], proto TCP (6), length 58)
    172.16.4.99.49 > 192.168.11.201.61067: Flags [P.], cksum 0x7d11 (incorrect -> 0xba3a), seq 29:47, ack 50, win 229, length 18
23:14:08.645453 IP (tos 0x0, ttl 64, id 40569, offset 0, flags [DF], proto TCP (6), length 40)
    172.16.4.99.49 > 192.168.11.201.61067: Flags [F.], cksum 0x7cff (incorrect -> 0x56b9), seq 47, ack 50, win 229, length 0
23:14:08.650166 IP (tos 0x0, ttl 254, id 53555, offset 0, flags [DF], proto IPIP (4), length 60)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7060, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [.], cksum 0x559d (correct), seq 50, ack 48, win 513, length 0
23:14:09.542828 IP (tos 0x0, ttl 254, id 53566, offset 0, flags [DF], proto IPIP (4), length 60)
    192.168.11.201 > 10.1.1.52: IP (tos 0x0, ttl 126, id 7061, offset 0, flags [DF], proto TCP (6), length 40)
    192.168.11.201.61067 > 172.16.4.99.49: Flags [R.], cksum 0x579a (correct), seq 50, ack 48, win 0, length 0

~~~


## References

[https://wiki.archlinux.org/index.php/Kernel_module#Loading](https://wiki.archlinux.org/index.php/Kernel_module#Loading)

[https://access.redhat.com/solutions/53031](https://access.redhat.com/solutions/53031)