---
title: Azure - Hub and Spoke - Playground
date: 2022-01-12 10:00
author: nicold
comments: false
tags: [Azure, Networking, GitHub, Playground, Sample, ARM-template]
---

In my currente work of Cloud Solution Architect, often I have to do tests and/or double-checks on network configurations.

For a 5 minutes test, however, often an entire hub-and-spoke fully configured is required. Maintaining such type of architecture always-on, on my test subscription is **expensive**, so I often found myself loosing 2 hours to prepare everything, and after a 3-clicks test, delete everything.

To solve this problem I have created a pre-configured _playground_  with the schema below, deployable with just a click (ok maybe 3 if you want to deploy all pieces). It has saved me a lot of valuable time, and even some colleagues have found it particularly useful and practical to create and destroy.

![hub and spoke playground](https://raw.githubusercontent.com/nicolgit/hub-and-spoke-playground/main/images/architecture.png)

So I thought of making the repo public on github, hoping it would be useful to anyone. You can **find** the link at the bottom of the message.

On the same repo, there are also _some_ "scenarios" that I have documented very synthetically, useful in this format to me as fast KB to preserve. Nothing that is not already available in various sauces on the net, the plus here is that the **solution** is implemented on the playgroung above, so names, IPs, networks, everything is consistent and maybe easy to understand.

Each Scenario have:
* **prerequisites**: component to deploy in order to implement the solutions (only the hub, also one on-prem playground or both)
* **solution**: a step by step sequence to implement the solution
* **test solution**: a procedure to follow in order to verify if the scenario is working

at this time I have already implemented the following scenarios:
1. how to allow machines in any spoke to communicate with any machine in any other spoke
2. how to filter HTTP(S) outbound traffic 
3. how to expose machines IP via the Azure Firewall
4. how to configure Site to Site VPN via VNet connection and IPSec
5. how to enable cross on-premise communication and routing

more will be implemented in the future.

As any worthwhile alive repo on github, you can **star** it, **fork** it and use it as you like. If you want more scenarios implemented, or if you find an error, open an issue, if you want to collaborate adding **YOU** more scenarios, fork the repo and do a **pull request**, I'll be happy to review it and add your contribution to the repo.

* HERE the link: https://github.com/nicolgit/hub-and-spoke-playground 

Thank you!
