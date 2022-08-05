---
title: Site-to-Site VPM, High availability options
date: 2022-06-01 10:00
tags: [Azure, networking, hub-and-spoke, IPSec, S2S, site-to-site]
excerpt: "????"

header:
  overlay_image: https://live.staticflickr.com/65535/52074971693_d3848464c6_h.jpg
  caption: "Photo credit: [**nicola since 1972**](https://www.flickr.com/photos/15216811@N06/52074971693)"
---

For many organizations, the [Azure landing zone conceptual architecture](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/) represents the destination in their cloud adoption journey. It's a mature, scaled-out target architecture intended to help organizations operate successful cloud environments that drive their business while maintaining best practices for security and governance.

In this architecture, the [hub virtual network](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/hub-spoke) acts as a central point of connectivity to many spoke virtual networks. The hub can also be used as the connectivity point to your on-premises networks. The spoke virtual networks peer with the hub and can be used to isolate workloads. The benefits of using a hub and spoke configuration include cost savings, overcoming subscription limits, and workload isolation.

Hub-and-spoke network topology helps you build customized secure large-scale networks in Azure with routing and security managed by the customer. This topology may be most appropriate if any of the following points meet your requirements:

* Your organization intends to deploy resources across one or several Azure regions and while some traffic across Azure regions is expected (for example, traffic between two virtual networks across two different Azure regions), a full mesh network across all Azure regions is not required.
* You have a low number of remote or branch locations per region. That is, you need fewer than 30 IPsec Site-to-Site tunnels.
* You require full control and granularity for manually configuring your Azure network routing policy.

Connect your on-premises network with Azure requires an ExpressRoute connection or a Site-to-Site shared connectivity over the public internet. For this second option, an [Azure VPN (S2S) gateway](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways) is required.

VPN S2S **connection must be reliable**. Azure VPN Gateway have different options to obtain different levels of reliability. 

First thing firsts, every Azure VPN gateway consists of **two instances** in an active-standby configuration. For any planned maintenance or unplanned disruption that happens to the active instance, the standby instance **would take over (failover) automatically**, and resume the S2S VPN or VNet-to-VNet connections. The switch over will cause a **brief interruption**. For planned maintenance, the connectivity should be restored **within 10 to 15 seconds**. For unplanned issues, the connection recovery will be longer, about **1 to 3 minutes in the worst case**. 

You can have better availability with** multiple on-premise VPN devises**. In this configuration you have **multiple active tunnels** from the same Azure VPN gateway to your on-premises devices in the same location.

* You need to create multiple S2S VPN connections from your VPN devices to Azure. 
The local network gateways corresponding to your VPN devices must have unique public IP addresses in the "GatewayIpAddress" property.
BGP is required for this configuration. Each local network gateway representing a VPN device must have a unique BGP peer IP address specified in the "BgpPeerIpAddress" property.
You should use BGP to advertise the same prefixes of the same on-premises network prefixes to your Azure VPN gateway, and the traffic will be forwarded through these tunnels simultaneously.
You must use Equal-cost multi-path routing (ECMP).
Each connection is counted against the maximum number of tunnels for your Azure VPN gateway, 10 for Basic and Standard SKUs, and 30 for HighPerformance SKU



----------------------------------------



The [**hub and spoke playground**](https://github.com/nicolgit/hub-and-spoke-playground) is a repo I use as common baseline to implement configurations and test connectivity scenarios. On [**this page of the repo**](https://github.com/nicolgit/hub-and-spoke-playground/blob/main/scenarios/dns-on-prem.md), you can find a step-by-step implementation of the scenario covered by this blog post.
