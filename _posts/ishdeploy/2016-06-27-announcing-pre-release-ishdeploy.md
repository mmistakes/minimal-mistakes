---
excerpt: ISHDeploy.12.0.0 is a PowerShell module that enables the code as configuration concept for SDL's Knowledge Center 2016 Content Manager 12.0.0.
header:
  overlay_image: http://www.sdl.com/Images/SCT-modular-content_tcm73-91708.jpg
tags:
- PowerShell
- ISHDeploy
- SDL
- Knowledge Center
- Content Manager
date: 2016-06-27 13:55:05
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
title: Announcing ISHDeploy.12.0.0 pre release version 0.1

---



The team is exited to introduce tooling to allow easier installation and configuration of a SDL Knowledge Center 2016 Content Manager 12.0.0 deployment. 
ISHDeploy is a PowerShell module that enables the [code as configuration]({% link _posts/2016-05-17-code-configuration.md %}) concept for SDL's Knowledge Center Content Manager (= LiveContent Architect = Trisoft InfoShare) service. 

The module is available for public use in [PowerShell gallery](http://www.powershellgallery.com/packages/ISHDeploy.12.0.0/0.1/). To quickly install the module and query the available deployments

![PowerShell screenshot](/assets/images/posts/ishdeploy/2016-06-27-Get-ISHDeployment.png "PowerShell screenshot")

1. On a server with Content Manager deployments, open a PowerShell session with administrator rights.
1. Execute **Install-Module ISHDeploy.12.0.0 -Repository PSGallery -Force**
1. Execute **Get-ISHDeployment**

Please note that all ISHDeploy cmdlets that change files need administrator rights to function.

In the screenshot below you can notice I have two deployments named **InfoShareORA** and **InfoShareSQL**. 
These reflect my lab setup.

Short description and links are available in [SDL Open Source initiatives](https://sdl.github.io/) named **DITA**.
The code is open sourced and available on [github](https://github.com/sdl/ISHDeploy/) 

## What is does this pre-release offer?

- Enable/Configure UI features
  - Enable Content Editor (XOPUS), quality assistant
  - Configure the Event Monitor tab
  - Enable the external preview
  - Security Token Service integration
    - Integrate a Vanilla deployment with a Security Token Service.
    - Issuer certificate rollover

All above functionality is fully backed by how-to articles available in the [documentation portal](https://sdl.github.io/ISHDeploy/12.0.0/Index.html). For more detailed information about the release noted on [github](https://github.com/sdl/ISHDeploy/releases/tag/v0.1).

## What does pre-release mean

- The set of the cmdlets is not yet complete.
- All functionality is tested thoroughly. We are looking for feedback from experimental scripts.
- Known issues
  - If you browse directly to [https://sdl.github.io/ISHDeploy/12.0.0/](https://sdl.github.io/ISHDeploy/12.0.0/) then it is not resolving. We know the cause for this issue and we’ll address it with the next release.
  - In the change log the release name is incorrect.

## Where to reach out for feedback and questions?

- Bellow in the comment feeds
- On the github [repository](https://github.com/sdl/ISHDeploy/)


