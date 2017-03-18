---
title: Out of memory exception with windowsservercore container on Windows 10
excerpt: While investigating an out of memory exception when building a microsoft/windowsservercore based container for SDL's Knowledge Center Content Manager, I came to realize a couple of small but important differences between hosting containers on Windows 10 and Windows Server 2016.
tags:
- SDL
- Knowledge Center
- Content Manager
- Container
- ISHBootstrap
categories:
- SDL
- Knowledge-Center
header:
  overlay_image: https://tutumcloud.files.wordpress.com/2014/11/how2usedocker_windows.jpg
---

Recently, while I was trying to build a fairly complex container for **SDL Knowledge Center Content Manager** based on the `microsoft/windowsservercore` I was getting some inconsistent **out of memory exceptions**. My intention is to share with everyone my experience and findings while trying to solve the issue.

First let's rule out that my development rig has enough memory to offer to the container. I'm working on Microsoft Windows 10 with 16GB of memory. Often I spin up a Windows Server 2016 instance on Hyper-V and even with that instance running my free memory is always somewhere around 8GB. 

Docker mentions that there are no memory limitations enforced to the containers, so running out memory during install with 9GB of memory free is strange. I am building two different variants of a container for **SDL Knowledge Center Content Manager**. 

- One is based on `microsoft/windowsservercore`. This container variant will depend on an external database during building and running.
- The other one is based on `asarafian/asarafian/mssql-server-windows-express:2014SP2`. The [asarafian/asarafian/mssql-server-windows-express:2014SP2](https://hub.docker.com/r/asarafian/mssql-server-windows-express/) container is a port of the [microsoft/mssql-server-windows-express](https://hub.docker.com/r/microsoft/mssql-server-windows-express/) but instead of installing **Microsoft SQL Server Express 2016** it installs **Microsoft SQL Server 2014 with SP2**. The reason for choosing the 2014 edition is that **Content Manager** doesn't support **SQL Server 2016** yet. This variant will embed its own database, making the container self contained for potential demo purposes. I understand that this is not best practice but the installation and therefore building the image of **Content Manager** requires a database instance, so why not use the resource for demo purposes. It also makes it easy for anyone to build the container.

The only difference during the build of these containers is the SQL Server Windows Service running. Since the database attached is very small, it's memory footprint is also very small and I expected it to be negligible. But the container without SQL installed had much better chances of succeeding without running out of memory, that led me to the conclusion that my containers were running close to an *unknown memory limitation* and SQL Server's process was pushing it's container just a bit overboard but enough to run out of memory. Another reason I came to this conclusion was the `docker stats` command combined with the Windows Task Manager, showed for both containers a constant allocation of almost 950MB for each container, while the containers were building side by side and task manager reported almost 7GB of free ram during the **out of memory exception**. I've also asked my colleague **Pascal Beutels** to run the same containers on his host just in case my rig had a problem. Pascal built the containers successfully on his Azure hosted Windows Server 2016 with 7GB assigned memory which led us to suspect problems with Windows 10. Then I decided to run the same containers on a Windows Server 2016 Hyper-V instance hosted on my development laptop with 4GB of memory configured. The containers built successfully and at this point I decided to issue a [bug]](https://github.com/docker/docker/issues/31604) on docker's github repository for Windows 10 and to learn a bit more. As always when engaging the community, you always learn something new and in my case I understood that I was misinformed about Windows containers. You can read the discussion but the summary is that containers on Windows 10 execute as Hyper-V instances and the *non-restrictions* to the available memory doesn't apply.

Let's dig in a bit further to better understand. The docker team makes a big distinction between the two supported operating systems:

- Windows 10 is referred to as a **Client** OS.
- Windows Server 2016 is referred to as a **Server** OS.

Apparently there are some major differences between the two flavours when running containers. It starts with the installation process but as I understood the biggest one is the default isolation value.

| OS | Default isolation |
| -- | ----------------- |
| Windows 10 (Client) | hyperv |
| Windows Server 2016 (Server) | process |

You can verify this default setting by executing `docker info -f "{% raw %}{{ .Isolation }}{% endraw %}"` on each operating system. 

If you have watched the initial videos on [channel9](https://channel9.msdn.com) about containers you probably remember people talking about an option to run a windows container as it was launched like a hyper-v instance. I remember this being discussed as an optional feature to ensure full memory isolation if the default `process` isolation wasn't enough or the process in the container demanded this. I was always under the impression that containers ran always in `process` isolation unless explicitly specified with the `--isolation` parameter.

From the clarifications on the github [issue](https://github.com/docker/docker/issues/31604) it became clear to me that when running containers on Windows 10, they are actually run as the linux based images do on top of Hyper-V technology. Contrary to the linux containers, **the machine doesn't show up in Hyper-V's management console**. I understand the linux containers case as there is a very clear boundary between the operating system architectures and `process` isolation would had been very difficult to implement but I didn't expect the same for the Windows 10 operating system which since Windows XP shares the same core as with their server flavours. As the containers do not show up on Hyper-V's management console it's very difficult to make the connection unless you understand this not very well discussed detail. Also, `process` isolation is not available for containers running on Windows 10.

With this knowledge, it seems that the default 1GB allocated to a Hyper-V container instance was not enough and the build ran out of memory. Docker offers the '-m'/'--memory' flags to **limit** a container's available memory but when working with `hyperv` isolation it actually works the other way by kind of **extending** the available memory. You can always limit the memory to less than 1GB but who would do that for a windowsservercore image? This was another reason that it didn't click for me, as I was reading in the documentation sentences referring to *memory limitation*.

It turns out that to build the **Content Manager** images on Windows 10, 2GB of memory is enough which is possible by executing `docker build -m 2GB .`. 
I've decided to wrap this option in the `Invoke-DockerBuild.ps1` that already existed by detecting the operating system's version. If a client OS is detected then the script adds automatically the `-m 2GB` parameter and the container builds seamlessly on both Windows 10 and Windows Server 2016 flavours. The source code for the script and for creating containers for **SDL Knowledge Center Content Manager** is available on [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap/)'s currently in the `packer-ami`'s branch and backed by issue [Add support for docker container images](https://github.com/Sarafian/ISHBootstrap/issues/53). The intention is to make the feature available with the next release of **ISHBootstrap** so look them then in the `master` branch. I need to clarify here that **containers for SDL's Knowledge Center are experimental and not officially supported by SDL**. Think of them as proving grounds to validate our future architecture plans.

As final words I would like to correct something I mentioned about performance on my previous post [Experimenting with a Full .NET application with Docker and Windows containers]({% link _posts/2017-02-14-docker-windows-full-asp.net-application.md %}). Back then I worked also with containers on Windows 10 and I had mentioned that they felt slow. Back then I didn't know this detail about the default isolation being `hyperv` so my impression and experience was influenced by the overhead required to spin up a new windows instance as part of the container's build or execution. When I worked with the same commands on my Windows Server 2016 instance on Hyper-V the performance was significantly faster. Even the time required to reach the suspected trigger for the out of memory exception was significantly less because each layer started much faster with the default `process` isolation and because the available memory for the container's process was not limited by the default 1GB.
