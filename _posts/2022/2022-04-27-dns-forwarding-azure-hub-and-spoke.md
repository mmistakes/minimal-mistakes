---
title: Allowing DNS resolution of Azure resources from on-premise
date: 2022-04-27 10:00
tags: [Azure, networking, hub-and-spoke, DNS, Azure Firewall, Azure Private DNS Zone, Enterprise Scale Landing Zone]
excerpt: "How can I integrate my on-premises DNS with Azure?"

header:
  overlay_image: https://live.staticflickr.com/65535/51809757947_c13db151f0_h.jpg
  caption: "Photo credit: [**nicola since 1972**](https://www.flickr.com/photos/15216811@N06/51809757947)"
---

For many organizations, the [Azure landing zone conceptual architecture](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/) represents the destination in their cloud adoption journey. It's a mature, scaled-out target architecture intended to help organizations operate successful cloud environments that drive their business while maintaining best practices for security and governance.

In this architecture, the [hub virtual network](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/hub-spoke) acts as a central point of connectivity to many spoke virtual networks. The hub can also be used as the connectivity point to your on-premises networks. The spoke virtual networks peer with the hub and can be used to isolate workloads. The benefits of using a hub and spoke configuration include cost savings, overcoming subscription limits, and workload isolation.

Typical uses for this architecture include:

* Workloads deployed in different environments, such as development, testing, and production, that require shared services such as DNS, IDS, NTP, or AD DS. 
* Shared services are placed in the hub virtual network, while each environment is deployed to a spoke to maintain isolation. 
* Workloads that don't require connectivity to each other but require access to shared services.
* Enterprises that require central control over security aspects, such as a firewall in the hub as a DMZ, and segregated management for the workloads in each spoke.

The architecture consists of the following aspects:

* **Hub virtual network**: The hub virtual network is the central point of connectivity to your on-premises network. It's a place to host services that can be consumed by the different workloads hosted in the spoke virtual networks.
* **Spoke virtual networks**: Spoke virtual networks are used to isolate workloads in their own virtual networks, managed separately from other spokes. Each workload might include multiple tiers, with multiple subnets connected through Azure load balancers.
* **Virtual network peering**: Two virtual networks can be connected using a peering connection. Peering connections are non-transitive, low latency connections between virtual networks. Once peered, the virtual networks exchange traffic by using the Azure backbone without the need for a router.
* **Bastion Host**: Azure Bastion lets you securely connect to a virtual machine using your browser and the Azure portal. An Azure Bastion host is deployed inside an Azure Virtual Network and can access virtual machines in the VNet, or virtual machines in peered VNets.
* **Azure Firewall**: Azure Firewall is a managed firewall as a service. The Firewall instance is placed in its own subnet.
* **VPN virtual network gateway or ExpressRoute gateway**. The virtual network gateway enables the virtual network to connect to the VPN device, or ExpressRoute circuit, used for connectivity with your on-premises network.

**One of the problems to address in this type of deployment is the DNS resolultion: resources on-premises, connected via S2S VPN to Azure need to resolve names for services hosted on Azure.** 

To simplify the private DNS resolution, Azure provides [Azure Private DNS Service](https://docs.microsoft.com/en-us/azure/dns/private-dns-overview): a reliable and secure DNS service for your virtual network. Azure Private DNS manages and resolves domain names in the virtual network without the need to configure a custom DNS solution. By using private DNS zones, you can use your own custom domain name instead of the Azure-provided names during deployment. Using a custom domain name helps you tailor your virtual network architecture to best suit your organization's needs. It provides a naming resolution for virtual machines (VMs) within a virtual network and connected virtual networks.

Once created, an [Azure private DNS Zone can be linked to an Azure Virtual Network](https://docs.microsoft.com/en-us/azure/dns/private-dns-virtual-network-links): in this way all VM and services connected to it **automagically** can resolve names managed by the private zone.

**This means that this service is available only within Azure. On premise resources even if connected via VPN S2S can't benefit of this names resolution.**

# How can I integrate my on premises DNS with Azure? 

As mentioned above, Azure Firewall is a cloud-native firewall as a service (FWaaS) offering that allows you to centrally govern and log all your traffic flows using a DevOps approach. The service supports both application, NAT, and network-level filtering and is integrated with the Microsoft Threat Intelligence feed for filtering known malicious IP addresses and domains. Azure Firewall is highly available with built-in auto scaling. [Azure Firewall is also well integrated with Azure DNS resolution](https://azure.microsoft.com/it-it/blog/new-enhanced-dns-features-in-azure-firewall-now-generally-available/). With his DNS proxy enabled, Azure Firewall can process and forward DNS queries from a Virtual Network(s) to your desired DNS server. You can enable DNS proxy in Azure Firewall and Firewall Policy settings.

In an Hub and Spoke architecture, with an on premises datacenter connected, Azure Firewall can act as DNS forwarder, as described in the schema below:

![dns architecture](https://github.com/nicolgit/hub-and-spoke-playground/blob/main/images/dns.png?raw=true)

* Lin-onprem-2 is a server/PC "outside" Azure, in your own datacenter.
* Lin-onprem-2 uses Lin-onprem as default DNS server (1)
* Your datacenter is connected to Azure via a S2S VPN
* On Azure, you have **cloudasset.internal**: a private DNS zone you are using to resolve names of your VMs on Azure
* You have linked to this private DNS zone all your Azure Virtual Networks with **auto registration** enabled: so all VM have an FQDN on that domain
* on Lin-onprem you are running [Bind9](https://www.isc.org/bind/) as DNS. Because you have the Azure Firewall DNS Proxy service enabled in the hub, you can configure Azure Firewall private IP as DNS Forwarder (2)
* on Azure Firewall, you configure Azure Managed DNS as default DNS service, so the firewall can forward all request coming to it to Azure (3).

**In this way on premises systems can benefit of Azure DNS resolution and Azure Private DNS Service.**

As PLUS, if you set as DNS server on all Azure Virtual Networks, Azure Firewall's internal IP, you can avoid DNS resolution mismatches, and enable FQDN filtering in the network rules. This functionality is required to have reliable FQDN filtering in network rules. If you don't enable DNS proxy, then DNS requests from the clients might travel to a DNS server at a different time or return a different response compared to that of the firewall. DNS proxy puts Azure Firewall in the path of the client requests to avoid inconsistency.

The [**hub and spoke playground**](https://github.com/nicolgit/hub-and-spoke-playground) is a repo I use as common baseline to implement configurations and test connectivity scenarios. On [**this page of the repo**](https://github.com/nicolgit/hub-and-spoke-playground/blob/main/scenarios/dns-on-prem.md), you can find a step-by-step implementation of the scenario covered by this blog post.
