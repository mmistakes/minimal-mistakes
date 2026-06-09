---
redirect_to: "https://netfoundry.io/docs/platform/api-guides/"
permalink: /guides/demo/
redirect_from:
  - /v2/guides/demo/
title: "Quickstart Demo"
sidebar:
    nav: v2guides
toc: true
classes: wide
---

The CLI demo is built in to `nfctl` CLI and is run with `nfctl demo`. You may watch the demo running at the end of the video tour embedded in [the CLI guide](/guides/cli). The demo will create a few functioning services bound to NetFoundry-hosted routers. Here's an outline of the resources the demo will create.

* AppWAN: "Welcome"
    * Services #welcomeWagon
        * Fireworks service
        * Echo service
    * Endpoints #workFromAnywhere
        * Mobile
        * Desktop
* edge routers #defaultRouters
    * Americas

## How it Works

You'll access the demo servers by adding the identity of one of the provided endpoints to a tunneler app e.g. Ziti Mobile Edge for iOS, Desktop Edge for Windows. As soon as the endpoints are created by the demo you may go ahead and add the identity to your tunneler.

Look in the web console for these endpoints and click on them to explore installation and enrollment instructions for your device's operating system.

Once the endpoint identity has been added to your device's tunneler the demo servers will be reachable e.g. [http://fireworks.netfoundry/](http://fireworks.netfoundry) is a good demonstration of your normal web browser connecting to a Ziti service. Try [http://echo.netfoundry](http://echo.netfoundry) from your terminal.

## Before You Begin

1. Create a working directory like "netfoundry-demo".
1. [Create an API account](/guides/authentication/#get-an-api-account) and save it in the working directory as "credentials.json". You only need the JSON file for this exercise.

### Run the Demo with `nfctl demo`

To run the demo with Python you will need to [install Python3](https://www.python.org/downloads/).

```bash
cd ./netfoundry-demo

# install
pip install --upgrade --user netfoundry
```

```bash
 # run the demo script to deploy global fabric and some functioning services
 $ nfctl demo
Run demo in network nfctl-demo-super-salmonberry (NFZITI) now? [y/n] 

 # delete the demo network
 $ nfctl delete network name=nfctl-demo-super-salmonberry
```

## Access the Demo Services

[Install a tunneler on your device](https://netfoundry.io/resources/support/downloads/). For example, you could install the Ziti Desktop Edge for MacOS and add the identity for the endpoint named "Desktop" in the Desktop Edge app. The easiest way to obtain the endpoint software and the endpoint identity is to visit [the web console](https://nfconsole.io/login) and click on one of your endpoints. There you may scan the identity's QR code with Ziti Mobile Edge installed from the app store or download the identity as a JWT file to add to the Desktop Edge app.

### Fireworks Service

Touch or click to shoot off some fireworks. This demo shows that you are able to access a web site with an invented domain name that you control through your NetFoundry network.

[http://fireworks.netfoundry/](http://fireworks.netfoundry)

### IP Address Echo Service

Visit [http://eth0.me](http://eth0.me) and [http://echo.netfoundry/](http://echo.netfoundry/) in two separate web browser tabs. The IP addresses are different and this demonstrates that your HTTP request was sent to the same demo server by two different paths. This is important because your NetFoundry network allows you to control where your traffic exits to the internet. If you visit eth0.me directly then you will see the ISP address where your device connects to the internet without NetFoundry. If you use the NetFoundry service address then your connection occurs via the hosting edge router (an exit point for your network).

## More Options

You may wish to use the `nfctl demo` command to create edge routers in a particular cloud provider or provider region. 

```bash
❯ nfctl demo --help
```
