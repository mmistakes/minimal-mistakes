---
excerpt: A SDL Knowledge Center Content Manager automation repository. What led to its development and how you can benefit.
tags:
- SDL
- Knowledge Center
- Content Manager
- ISHDeploy
- ISHBootstrap
date: 2016-07-25 13:21:48
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
- SDL
- Knowledge-Center
- Content-Manager
title: Announcing ISHBootStrap Content Manager Automation

---



I'm very happy to finally promote my own personal automation code for bootstrapping the deployments of [SDL Knowledge Center](https://sdl.com/xml) Content Manager to GitHub to share with everyone and increase scope. 
The repository is [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap). 

## The story behind this automation

Let me share the story of what made first create this bootstrapper. 

Historically Content Manager has a manual deployment process and that forces a couple of problems in our current process. 
We've always considered a test server a big hassle to prepare but it shouldn't. 
You should be able to spin off a new server, run a full blown test and then release the VM. 
For example I should be able to trigger the entire process during  weekend and build weekly performance reports. 
This is a very standard process on many cloud oriented teams. 
Also, when a new colleague joins there should be a quick and easy way to get him working with the product. 
I consider a client operating system almost the same as with a server operating system. 
Since the unification to the NT core for all Windows releases, I treat them the same at least on a high level. 
If I had to chose a Windows release that made this a reality then I would chose the Windows 7 one.

To help validate and plan [ISHDeploy](https://github.com/sdl/ISHDeploy/) I needed a multi VM lab for multiple versions of the product. 
The lab would start with two servers, one for each major version of Content Manager e.g. (released 12 and upcoming 13), but it would potentially grow with more servers representing a cluster. 
I didn't want to face the above problems for this process. 
In a scrum perspective that would had been an immediate impediment and it would had been solved with automation and process improvements.

Since nobody had something that automated the complete loop I started building one. 
This was me solving my future problems that by experience I would face and they would slow me down. 
My goal is to never login on a server and never depend on the specifics of the operating system. Instead code as configuration automation scripts should do the trick.

## Discuss challenges I had to face

I was faced with a couple of challenges that helped me better understand PowerShell:

- When working with servers joined in Active Directory then you inevitably face the double hop issue of remoting. 
I've discussed about this in a previous post [PowerShell Remoting Caveats]({% link _posts/powershell/2016-07-05-remoting-caveats.md %}).
- How do you consistently execute a relatively big peace of code remotely? How do you abstract that code away in terms of code as configuration?

The double hop issue is solved using **CredSSP** authentication and is explained in the notes of the repository [About CredSSP authentication for PSSession](https://github.com/Sarafian/ISHBootstrap/blob/master/Notes/About%20CredSSP%20authentication%20for%20PSSession.md). 

I solved the remote execution issue with modules. 
PowerShell modules are a great container for functionality. 
One of the biggest benefits when packaging functionality in a module is portability. 
You can install anywhere and consume the cmdlets either with script blocks executing remotely or with PowerShell implicit remoting as discussed in [Import and use module from a remote server]({% link _posts/powershell/2016-07-01-Import-Module-Remote.md %}). 
In my opinion, modules are great. 
Besides solving your own problems they get you also in sharing mode. Other people can use it. 
Even if you don't plan to publish a module to the PowerShell gallery, setting up a private nuget server is so easy, that all the benefits are still valid. 
It also forces you to think in terms of modules and not a arbitrary collection of scripts. 
And this is what I did for **xISHServer** and **xISHInstall**. 
I wrapped complicated functionality in those modules and that allowed me to maintain simpler and cleaner scripts. 
**x** is for experimental and for this reason they are not published to the gallery.

But if you already think in module terms, then you are very close in productizing your effort. 
I wouldn't be surprised if one day we officially publish an **ISHServer** module to the gallery. 
The functionality in **xISHInstall** will be properly implemented in the upcoming versions of **ISHDeploy**.

## Pending items for the future

At the moment this post was written, I didn't have any scripts for [ISHDeploy](https://github.com/sdl/ISHDeploy/). 
This one of my next immediate goals. 
Also the code is not commented at all. 
Script header comments are missing as well as good inline comments to help everyone. 
I apologize but as I mentioned, this started as an internal personal effort.

Further long term goals are to create some examples for a cluster deployment and to automate this on Visual Studio Team Services using Azure infrastructure for VMs. 
When I pick this piece then I'll develop the alternatives for domain certificates. 
I will actually replace the dependency to a domain certificate authority with [Let's encrypt](https://letsencrypt.org/).

## Please share your feedback

Although the documentation is not perfect, I hope it’s a good place to start for others. 
I will really appreciate feedback, ideas and even contribution to help push this further into the future. 
My background is focused on .NET developer and I'm sure I'm missing a couple of items that WinOPS specialists know better. 
You can comment on this post, create issues on GitHub or even [![Gitter](https://badges.gitter.im/Sarafian/ISHBootstrap.svg)](https://gitter.im/Sarafian/ISHBootstrap).

