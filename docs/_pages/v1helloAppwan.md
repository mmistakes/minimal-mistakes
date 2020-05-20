---
title: "Hello, AppWAN!"
permalink: /v1/guides/hello-appwan/
sidebar:
    nav: v1guides
---

## How to Build an AppWAN
1. Create an endpoint. This endpoint will provide a service.
2. Create a service on the endpoint. The service is now "terminated" by the endpoint.
3. Create another endpoint to "initiate" connections to the service.
4. Create an empty AppWAN, and add the initiating endpoint and terminated service.

## What is an AppWAN?
An AppWAN is a policy that controls access to services. An AppWAN is populated by endpoints that communicate via an encrypted network fabric. Endpoints in an AppWAN are organized by whether they provide a service. Endpoints that do provide a service to the AppWAN appear by association with that service, i.e. they're known in the AppWAN as that service. Endpoints that consume services appear as clients or gateways. All of the clients and gateways in an AppWAN have permission to connect to all of the services. 

## What is an endpoint?
Clients and gateways are "initiating" endpoints. Services are always provided to an AppWAN by a "terminating" endpoint. An endpoint in an AppWAN may represent an app, a device, or some IPs. For example,
* An app that is built with a Ziti Endpoint SDK is an embedded endpoint, and
* a device where Ziti Tunneler is installed is a client endpoint, and
* a router where Ziti Tunneler is installed is a gateway endpoint.

An embedded endpoint that provides a service is self-terminating i.e. "hosted". Traffic to a service that is "non-hosted" will exit the AppWAN at the terminating endpoint and proceed to its final destination, the resource described by the service definition, e.g. 11.22.33.44 on 55/tcp. Terminating endpoints for non-hosted services are accordingly homed for performance and security of that final hop.

Embedded endpoints are ideal because the traffic is logically inter-process within the AppWAN. Ziti Tunneler is an app we built with the Ziti endpoint SDK that enables initiation for processes on the device where it is running, termination for services that device can reach, or both. When Ziti Tunneler is running on a device that is a router it may also provide initiation and termination via attached routes.

<!-- ## Examples
* NetFoundry will provision redundant, zero-trust fabric routers near the service's terminating endpoint.
* Servers described by an AppWAN service can be effectively "dark" to the internet. The service's terminating endpoint need only have access to the server and outgoing internet access to NetFoundry's fabric routers.
* A mobile client app built with Ziti endpoint SDKs may initiate traffic to the fabric without trusting any intermediary process. The traffic is encrypted before it leaves the client process.
* A mobile client app running on a device with Ziti Tunneler installed may initiate to the AppWAN without trusting any intermediary device. The traffic is encrypted before it leaves the mobile device.
* A mobile device associated with a wireless access point on a network for which the gateway router is running Ziti Tunneler may communicate with the AppWAN's services without trusting any intermediate network. The traffic is encrypted before it leaves the network.

 -->