---
excerpt: Enhancements for ISHBoostrap and release of version 0.1
tags:
- SDL
- Knowledge Center
- Content Manager
- PowerShell
- ISHBootstrap
date: 2016-10-13 09:24:59
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
title: ISHBoostrap enhancements and pre-release v0.1

---



Last two weeks I worked very hard on my project [ISHBoostrap](https://github.com/Sarafian/ISHBootstrap/) to improve its flow. 

## What is ISHBootstrap


ISHBoostrap in short is a PowerShell automation repository, that helps bootstrap a server for SDL's Knowledge Center Content Manager.
When I started ISHBoostrap, I had the following user stories in mind:

- As a developer I want to quickly spin up a Virtual Machine with a Content Manager deployment
  - I already use this for VM joined in our company active directory and not. I use our ESX Server and/or my Hyper-V on Windows 10 to power my Virtual Machines. I also use PowerShell remoting to power the remote execution.
  - A colleague of mine [Pascal Beutels](https://github.com/beutepa) uses ISHBoostrap to spin his developer VM using [Vagrant](https://www.vagrantup.com/). He doesn't use PowerShell remoting but instead he invokes everything locally.
- As a QA automation engineer, I want to spin up a Virtual Machine with a Content Manager deployment. Then I can run very heavy smoke tests e.g. during every weekend.
- As a cloud DevOps engineer, I want to create a virtual machine for a new customer or for a new release. Execute the code with any tool such as Chef or puppet or e.g. Azure scripts. 
- As customer, I want a streamlined method to bootstrap a Content Manager deployment.
- As SDL, I want to have the ability to dynamically scale up and down the number of nodes in Content Manager deployment in the cloud.
- As anyone, I want to automate and not perform error-prone repetitive tasks.

Please read my previous post [Announcing ISHBootStrap Content Manager Automation](<<{ relref "ish\20160725.introduce-ishbootstrap.md" }>>) for more details about ISHBootstrap.

## Improvements on the general purpose assets (Source)

The [Source](https://github.com/Sarafian/ISHBootstrap/tree/master/Source) folder in ISHBoostrap is a general purpose repository of scripts, modules and cmdlets. 

The assets are split in how I perceive the granularity of the entire flow. 
The main concern is that you can use all or most of the steps of the flow. Each step is triggered by a specific PowerShell script and therefore the complete flow is a PowerShell script.
This is the main reason that this process is in code, because it allows you to replace certain steps with you own to match your very own conditions. 
For example, there is not one way to push a certificate on a server. 
Depending on your vendor or if you are using an active directory certificate authority the process can change both in terms of execution but also authorization. 
But many steps should be identical and therefore can be used directly from ISHBoostrap

With the effort of the last two weeks that led to the [pre-release of v0.1](https://github.com/Sarafian/ISHBootstrap/releases/tag/v0.1), I made improvements on many areas that are mentioned in detail in the [changelog](https://github.com/Sarafian/ISHBootstrap/blob/master/CHANGELOG.md) file.

In high level summary the improvements are:

- PowerShell remoting works against remote servers joined or not to an active directory.
- xISHServer PowerShell module that drives the pre-requisites is much smarter now. It also supports Windows Server 2016. 
- Removed dependency to PowerShell module [Carbon]( www.powershellgallery.com/packages/Carbon/). Moved the functionality to xISHServer.
- Bug fixes.

## Improvements on the example assets (Examples)

The [Examples](https://github.com/Sarafian/ISHBootstrap/tree/master/Examples) folder in ISHBoostrap is an example repository of scripts that show how you can sequence the scripts/steps provided in the [Source](https://github.com/Sarafian/ISHBootstrap/tree/master/Source) folder. 
I created this as a showcase but there are some good tricks you should consider when implementing your own. 
I use this also to power my very own automation, so it has a proven track record. 
As my efforts continue, I enrich with more functionality and try to solve different problems.  
You can of coarse use this structure but as a software engineer and a member of the open source community, the final decision is yours to make. 
I only ask that you share with me any remarks or improvements or even a different structure you have considered.  
I'm very curious to hear about alternatives and improve the repository even further.

As the general purpose functionality changes so does the example repository. 
The changes are mentioned in the [CHANGELOG.Examples.md](https://github.com/Sarafian/ISHBootstrap/blob/master/CHANGELOG.Examples.md).

As the product owner of [ISHDeploy](https://www.powershellgallery.com/items?q=ISHDeploy&x=0&y=0) PowerShell module, I've created many scripts that help me do my job but also showcase its potential.
These scripts are a showcase of the following configuration stories:

- Active Directory Federated Services aka **ADFS** integration.
- Add relying parties to internal security token service aka **ISHSTS**.
- Enable light weight windows authentication on **ISHSTS**.
- Toggle features on the web client aka **ISHCM** such as:
  - External Preview.
  - **Content editor** aka **XOPUS**.
  - **Quality assistant**.
  - Add menu and button bar items.
- Undo the deployment's configuration and roll back to its original Vanilla state. 

Please read more about ISHDeploy on the [documentation portal](https://sdl.github.io/ISHDeploy/12.0.1/) and on my various blog posts tagged with [ISHDeploy](http://localhost:1313/tags/ishdeploy/)  
I find the comparison of code vs documentation similar to the one of a picture vs words. 
With that in mind and since we are doing code as configuration, I thought it would benefit all to share those scripts. 

Therefore the most important improvement in this section for ISHBootstrap is the addition of these scripts.

Please share any feedback or ideas, it will help my product owner role but also provide to you the necessary functionality.

I also have a collection of [Pester](https://github.com/pester/Pester) based integration tests, that I use as confidence test before releasing ISHDeploy to the gallery. 
Among many things, the pester scripts showcase how to execute a future certificate rollover but unfortunately I cannot share yet those scripts. 
If you are curious and that's great, please get in touch and we see what is possible.

Enjoy!
