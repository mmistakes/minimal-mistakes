---
title: Help
permalink: /help/
toc: true
---

<!-- ## Web Forum
Talk to other developers and maintainers with an email to *api-help@netfoundry.io* or through [Google Groups on the web](https://groups.google.com/a/netfoundry.io/d/forum/api-help). Log in to the forum to search others' posts with any Google ID.
 -->
<!-- <iframe id="forum_embed"
  src="javascript:void(0)"
  scrolling="no"
  frameborder="0"
  width="900"
  height="700">
</iframe>
<script type="text/javascript">
  document.getElementById('forum_embed').src =
     'https://groups.google.com/a/netfoundry.io/forum/embed/?place=forum/api-help'
     + '&showsearch=true&showpopout=true&showtabs=false'
     + '&parenturl=' + encodeURIComponent(window.location.href);
</script>
 -->

## Customer Support
Send a help request to *support@netfoundry.io* and read more about contacting support in [Support Hub](https://support.netfoundry.io/hc/en-us/articles/360019471912-Contact-NetFoundry-Support).

## Improve this Site
Contributions are welcome! This API portal is open-source. You may [create a branch or a fork on GitHub](https://github.com/netfoundry/mop-api-docs) and send a pull request. Learn [how to edit this site](/contribute/).

Minor changes may be made directly in GitHub's online editor wherever &nbsp;<i class="fas fa-edit" aria-hidden="true"></i>&nbsp;**Edit**&nbsp; appears at bottom-right.

## Foundational Concepts

### Organization
An organization is a consolidated billing and ownership domain of NetFoundry network groups.

### Network Group
A network group is a collection of networks in an organization.

### NetFoundry Network
A NetFoundry network is a management domain and collection of resources e.g. endpoints, services, identities, policies.

### AppWAN
An AppWAN is a simple policy that controls access to services. It works like a permission group with a directional dimension, i.e. left side is allowed to connect to right side. An AppWAN is populated by endpoints that communicate via the NetFoundry overlay fabric. Endpoints in an AppWAN can be visualized in the console by whether they terminate a service: left side if not, right side if so.

![AppWAN](/assets/images/appwan.png)

Endpoints that do terminate a service appear by association with that service, i.e. they're known in the AppWAN by the name of the service. Endpoints that consume services appear in AppWANs as clients or gateways. All of the clients and gateways in an AppWAN have permission to connect to all of the services.

### Endpoint
An endpoint is node on the edge of your network. Protected network traffic flows to, from, and through endpoints. Clients and gateways are "initiating" endpoints from which traffic flows toward services. Services are terminated by an endpoint to which traffic flows from clients and gateways. An endpoint in an AppWAN may represent an app, a device, or some IP addresses. For example,
* An app that is built with a Ziti Endpoint SDK is an embedded endpoint, and
* a device where Tunneler is running is a client endpoint, and
* a router where Tunneler is running is a gateway endpoint forwarding for some IP addresses.

#### Gateway Endpoint
NetFoundry offers a variety of free virtual machine system images that can be imported in a hypervisor or launched by your preferred cloud provider. The launched VMs can then be enrolled with your network as a gateway endpoint. Gateway endpoints are IP routers. You could position a gateway endpoint on an isolated IP network segment to provide secure ingess or egress or both for numerous devices.

The best way to obtain the latest compatible VM image for your NetFoundry network is to create a gateway endpoint and then visit its detail page in the console. There you'll follow a download link and select the desired image format, e.g. OVA; or launch it directly in your own cloud account. You could create a gateway endpoint of type `AWSCPEGW` (AWS Private GW) and in the console punch the LAUNCH button to run our CloudFormation template in your AWS account. This will automatically enroll your gateway on first boot.

You can create the gateway endpoint through the API or through the console ([link to more gateway basics](https://support.netfoundry.io/hc/en-us/articles/360017558212-Introduction-to-Gateway-Endpoints)). You can learn how NetFoundry produces trusted VM images in the post [Virtual Machines as Code](https://netfoundry.io/virtual-machines-as-code/) on our blog.

#### Ziti-Hosted Services
Your server app which is built with the Ziti SDK is a Ziti-hosted service; i.e. it doesn't require any proxy, gateway, tunneler, NAT, load balancer, or any other infrastructure in order to be reached by endpoints. Only generic outgoing internet is needed by the computer where your app is running.

Traffic to a service that is "non-hosted" will exit the AppWAN at the terminating endpoint and proceed to its final destination, the resource described by the service definition, e.g. 11.22.33.44 on 55/tcp. Terminating endpoints for non-hosted services are typically positioned for optimal performance and security of that final hop from the service's terminating endpoint to the resource server. Embedded endpoints are ideal because the traffic is logically inter-process within the AppWAN.

#### Ziti Tunneler
Tunneler is an open-source app maintained by NetFoundry that is built with Ziti SDKs that enables initiation for processes on the device where it is running, termination for services that device can reach, or both. When Tunneler is running on a device that is a router, such as NetFoundry's gateway endpoints a.k.a. "Cloud Gateways", it may also provide initiation and termination via attached routes.

<!-- ## Examples
* NetFoundry will provision redundant, zero-trust fabric routers near the service's terminating endpoint.
* Servers described by an AppWAN service can be effectively "dark" to the internet. The service's terminating endpoint need only have access to the server and outgoing internet access to NetFoundry's fabric routers.
* A mobile client app built with Ziti endpoint SDKs may initiate traffic to the fabric without trusting any intermediary process. The traffic is encrypted before it leaves the client process.
* A mobile client app running on a device with Ziti Tunneler installed may initiate to the AppWAN without trusting any intermediary device. The traffic is encrypted before it leaves the mobile device.
* A mobile device associated with a wireless access point on a network for which the gateway router is running Ziti Tunneler may communicate with the AppWAN's services without trusting any intermediate network. The traffic is encrypted before it leaves the network.

 -->