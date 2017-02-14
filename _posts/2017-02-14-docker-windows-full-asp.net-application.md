---
title: Experimenting with a Full .NET application with Docker and Windows containers
excerpt: I love the concept of containers and I'm very excited with the support for windows containers. As there are so many cheers with very little useful information so I thought to experiment and get down to the bottom of what Docker On Windows really means.
tags: Container
categories: 
header:
  overlay_image: https://msdnshared.blob.core.windows.net/media/MSDNBlogsFS/prod.evol.blogs.msdn.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/01/35/09/metablogapi/7127.Why-Windows-Server-Containers-02_3CABEA6C.png
---

## Introduction

![challenges](http://www.startupist.com/wp-content/uploads/2015/01/32-730x511.jpg){: .align-center}
There is a lot of online material for containers and .NET, but most of the time they refer to the .NET core. When windows container technology became available with Windows Server 2016, it was suddenly to deliver a container for a full stack ASP.NET application. Initially there were announcements for Microsoft IIS container images, then some images for ASP.NET web sites but most of the time the example stopped early with something almost equivalent to a hello world application. Don't get me wrong, it's a major breakthrough but if you want to catch the attention of all those legacy applications developed with the full .NET framework there has to be something more. 
For this reason I decided to run my own investigation and this post is to share with you my experience and what I learned step by step.

## Which application to containerize?

First I needed a full asp.net application to containerize. For this I had to consider a couple of things:

- A console application isn't good enough because they are delivered with their very own executable. Containers thrive on the concept of one executable so it should be something more complicated. An ASP.NET web application on the other hand depends on IIS to function and IIS is a traditional complicated component on IIS. 
- I didn't want to write one single line of code to avoid losing focus. I just needed a quick ASP.NET application and focus on container technology.
- My ASP.NET application must require configuration changes to provide a meaningful running instance. This is a requirement because this is one aspect of the `docker run` command that was missing from all the hurra examples.
- I want all my assets to be as close as possible to their debug equivalents. All scripts referenced by the docker file should work outside docker also.
- The application must allow a simple persistence concept.
- The application must support load balancing.

I chose to create a simple NuGet server. It's very easy. You create a web application in visual studio, add the nuget package [NuGet.Server](https://www.nuget.org/packages/NuGet.Server), compile and run. NuGet server offers a couple of options in the configuration file which is great, but in my experiments I focused on the `apiKey` and `packagesPath`. The `packagesPath` is also my *persistance* layer and combined with the `apiKey` I can test both persistance and scaling up. 

## Tracking and explaining the progress

![show me](https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAUtAAAAJDJjYjg0NzEyLTYyOGItNDhiMC1hZWY4LTNiYmI1ZmEyZjk0MQ.jpg){: .align-center}
Recently, I had read an article that tried to explain something similar and the author used a git repository and branches per step. He used this concept to allow others to see what is different in code per branch while providing a small focuses summary. For many people, code is as *a picture over 1000 words* and as I really like his approach, I decided to do the same using a GitHub repository.

- The GitHub repository is [Sarafian/MiniNugetServer/](https://github.com/Sarafian/MiniNugetServer/).
- All steps are available as [issues](https://github.com/Sarafian/MiniNugetServer/issues).
- The [wiki](https://github.com/Sarafian/MiniNugetServer/wiki/Research-progress) page provides a small summary for each step, links and code changes.
- The docker image [asarafian/mininugetserver](https://hub.docker.com/r/asarafian/mininugetserver/) is available on docker hub.

## The beginning

My first step was to automate the publish process of the web site. 

1. Restore nuget packages.
1. Build the web application.
1. Publish the web application.
1. Build the container.
1. Run the container. There is no configuration support yet.

[BuildAutomationReady](https://github.com/Sarafian/MiniNugetServer/tree/BuildAutomationReady) is the branch that represents this state. The docker file is derived from the **microsoft/aspnet** and is very simple.

```text
# The `FROM` instruction specifies the base image. You are
# extending the `microsoft/aspnet` image.
FROM microsoft/aspnet

# Next, this Dockerfile creates a directory for your application
RUN mkdir C:\MiniNugetServer

# configure the new site in IIS.
RUN powershell -NoProfile -Command \
    Import-module IISAdministration; \
    New-IISSite -Name "MiniNugetServer" -PhysicalPath C:\MiniNugetServer -BindingInformation "*:8080:"

# This instruction tells the container to listen on port 80. 
EXPOSE 8080

# The final instruction copies the site you published earlier into the container.
ADD MiniNugetServer/ /MiniNugetServer
```

## Run the container image with dynamic configuration

The **microsoft/aspnet** image is derived from the **microsoft/iis** which defines as `ENTRYPOINT` a special executable `ServiceMonitor.exe` that is built to monitor the state of a windows service. In our case that service is `w3svc`. This is the docker file of **microsoft/iis**:

```text
FROM microsoft/windowsservercore

RUN powershell -Command Add-WindowsFeature Web-Server

ADD ServiceMonitor.exe /ServiceMonitor.exe

EXPOSE 80

ENTRYPOINT ["C:\\ServiceMonitor.exe", "w3svc"]
```

To my knowledge there is no way to control what happens when running a derived container image. I couldn't ever figure out how to trigger a script that would change the values in the configuration file and then let IIS restart the application pool. If someone know then please let me know below in comment. 

The configured `ENTRYPOINT` will execute unless you start using some special docker command line parameters that override the entry point. But the goal is not write wierd `docker run` commands. The goal is to run the instance as seamlessly and as close to the out of the box experience as possible.

For this reason I had to take control. I adapted my docker file to derive from the **microsoft/windowsservercore**, do the same as with **microsoft/iis** and **microsoft/aspnet** in terms of prerequisites and take control of how the IIS and the web site is initialized.

```text
FROM microsoft/windowsservercore

MAINTAINER Alex Sarafian

ADD MiniNugetServer/ /Container/MiniNugetServer
ADD https://github.com/Microsoft/iis-docker/blob/master/windowsservercore/ServiceMonitor.exe?raw=true /Container/ServiceMonitor.exe
COPY *.ps1 /Container/

RUN powershell -NoProfile -Command Add-WindowsFeature Web-Server; \
    powershell -NoProfile -Command Add-WindowsFeature NET-Framework-45-ASPNET; \
    powershell -NoProfile -Command Add-WindowsFeature Web-Asp-Net45; \
    powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*; \
    powershell -NoProfile -File "C:\Container\New-Site.Docker.Run.ps1" -Port 80 -RemoveDefaultWebSite

# This instruction tells the container to listen on port 80. 
EXPOSE 80

# set environment variables
ENV apikey "mininugetserver"
ENV packagesPath "~/Packages"

CMD powershell -NoProfile -File "C:\Container\Start-ConfigurationServiceMonitor.Docker.Cmd.ps1" -ApiKey %apikey% -PackagesPath %packagesPath%
```

With this exercise step I've also decided to always implement the logic in an external script that is referenced in the docker file. It is in your best interest to combine commands in one layer and this makes things very difficult to troubleshoot. Also the multi-line syntax and special character restrictions are very error prone. 

Suffice it to say, I don't like the docker file syntax.
{: .notice}

- `New-Site.Docker.Run.ps1` is part of the docker build process (`RUN` command). It removes the default site and then creates one for my NuGet application.
- `Start-ConfigurationServiceMonitor.Docker.Cmd.ps1` is part of the docker run process (`CMD` command) application. It stops the site, modifies the `web.config` file and then starts the site. Before returning it blocks by executing the `ServiceMonitor.exe` as the **microsoft/iis** image does.

With docker, the parameters when running an image are fed into the instance through environment variables. These are two examples

```text
REM run with default apikey and packagesPath
docker run -d -p 8080:80 --name mininugetserver asarafian/mininugetserver

REM run with custom apikey and packagesPath
docker run -d -p 8080:80 -e apikey=mininugetserver -e packagesPath=~/Packages --name mininugetserver asarafian/mininugetserver
```

Overall, this exercise step was the hardest one and this where I learned the most with docker.

## Persist data outside the docker instance

Let's assume this NuGet server is a bit more serious and we would like not to lose it's NuGet packages every time we run the image. 
To solve this issue we need to mount a path in the container to an external directory.

This exercise step is represented with the [mountvolume](https://github.com/Sarafian/MiniNugetServer/tree/mountvolume) branch. 

It was mostly about learning how to mount and verifying the concept. To use the `C:\Shared\Packages` on the host as the *persisted* folder execute 

```text
docker run -d -p 8080:80 -v C:/Shared/Packages/:C:/Packages -e apikey=mininugetserver -e packagesPath=C:/Packages --name mininugetserver asarafian/mininugetserver
```

## Build inside the container

Up until this step all .NET building and publishing was done prior to building the container image. While troubleshooting I noticed that some other containers were building the source code inside the container and I found this idea very intriguing. I talk about this on my previous post [Build and deliver your service within the same medium (container)]({% link _posts/2017-02-13-docker-combine-build-deliverable.md %}). 

My goal is to put everything inside the container so the image could be built by [docker hub's automated builds](https://docs.docker.com/docker-hub/builds/). The code is available in [buildincontainer](https://github.com/Sarafian/MiniNugetServer/tree/buildincontainer) branch.

To achieve my goal, I created more scripts that install the prerequisites and moved my automation inside the docker file

```text
FROM microsoft/windowsservercore:latest

MAINTAINER Alex Sarafian

# C:\Repository will look like the current repository structure
# C:\Repository\Publish is the publish folder. All scripts are aligned.
ADD MiniNugetServer/ Repository/Source/MiniNugetServer
COPY Start-Build.Docker.Run.ps1 Repository/Source/
ADD https://github.com/Microsoft/iis-docker/blob/master/windowsservercore/ServiceMonitor.exe?raw=true /Repository/Publish/ServiceMonitor.exe

# First empty line helps with commenting each line
RUN powershell -NoProfile -NonInteractive -Command "\
    $ErrorPreference='Stop'; \
    Add-WindowsFeature Web-Server; \
    Add-WindowsFeature NET-Framework-45-ASPNET; \
    Add-WindowsFeature Web-Asp-Net45; \
    Remove-Item -Recurse C:\inetpub\wwwroot\*; \
"   

# First empty line helps with commenting each line
RUN powershell -NoProfile -NonInteractive -Command "\
    $ErrorPreference='Stop'; \
    & C:\Repository\Source\Start-Build.Docker.Run.ps1 -InContainer; \
    & C:\Repository\Publish\New-Site.Docker.Run.ps1 -Port 80 -RemoveDefaultWebSite; \
"

# This instruction tells the container to listen on port 80. 
EXPOSE 80

# set environment variables
ENV apikey "mininugetserver"
ENV packagesPath "~/Packages"

CMD powershell -NoProfile -File "C:\Repository\Publish\Start-ConfigurationServiceMonitor.Docker.Cmd.ps1" -ApiKey %apikey% -PackagesPath %packagesPath%
```

The difference is getting the source code from github and invoking the build and publishing process. This includes installing the necessary tooling to compile and publish a web application. Luckily Microsoft has done some effort to decouple the build of web applications from the Visual Studio installations. There are a couple of tricks worthwhile noticing in the [code changes](https://github.com/Sarafian/MiniNugetServer/compare/mountvolume...buildincontainer).

- Went back to .NET **4.6** from **4.6.2** as I could not get the tooling to work.
- Use this NuGet package [MSBuild.Microsoft.VisualStudio.Web.targets](https://www.nuget.org/packages?q=MSBuild.Microsoft.VisualStudio.Web.targets) to include in your project those Visual Studio specific targets.
- To build and publish we need the [windows-sdk-10.0](http://download.microsoft.com/download/E/1/F/E1F1E61E-F3C6-4420-A916-FB7C47FBC89E/standalonesdk/sdksetup.exe) and [microsoft-build-tools](http://download.microsoft.com/download/4/3/3/4330912d-79ae-4037-8a55-7a8fc6b5eb68/buildtools_full.exe). I could have used their respected Chocolatey packages but to avoid installing also **Chocolatey** I looked into their code and ported them inside my `Start-Build.Docker.Run.ps1` script.

![fail](http://eightball.ie/wp-content/uploads/sites/377/2016/05/FAIL.png){: .align-center}
At the moment of writing this post, [docker hub's automated builds](https://docs.docker.com/docker-hub/builds/) doesn't support building windows based images. I hope they do soon. I've configured everything and I'm ready when they will be. Issue [Automate the publish process](https://github.com/Sarafian/MiniNugetServer/issues/7) is open for this purpose.
{: .notice--warning}

## Running multiple instances

It was time to test the container against some load balancing. This proved to be nothing more that adding instructions for a docker compose file available in the [compose](https://github.com/Sarafian/MiniNugetServer/tree/compose) branch

```text
version: '2.1'

services:
  mininugetserver:
    image: asarafian/mininugetserver
    environment:
      apikey: "mininugetserver"
      packagesPath: "C:\Packages"
    volumes:
      - C:\MiniNuGetServer\Packages/:C:\Packages

networks:
  default:
    external:
      name: nat
```

Execute `docker-compose scale mininugetserver=2` to launch two instances. To be honest I didn't verify the load balancing but only that the instances were running separately with the same `apikey` and the same folder for the packages.

## Test the image with powershell

Admittedly I should had done this earlier. This step is about using **Pester** tests to verify that the docker image works indeed as expected. Not much of an interest here but if you want to see the code the branch is [Pester](https://github.com/Sarafian/MiniNugetServer/tree/pester) with the following [code changes](https://github.com/Sarafian/MiniNugetServer/compare/compose...pester).

## Finishing up

![image-left](https://t3.ftcdn.net/jpg/00/99/44/30/240_F_99443050_eLuGyYsxoPAQD6y1ctsyE7ySLNMGXTk1.jpg){: .align-center}
First let me say that this was great. Windows containers are demystified. I also realized a couple of things I would like to share:

- The docker build is nothing more that executing commands in a new instance of container defined in the `FROM` command. At the end it's all packages and docker keeps the layers representing the docker image. I could be wrong with the specifics but it feels like this.
- Try to put as much as possible of the code outside the docker file, so you can debug it while developing.
- Don't use the **microsoft/iis** image or any of its derivatives as they will not provide the necessary flexibility to configure your web site.
{: .notice--info}

## Tip of the day

![image-left](http://static.iphonelife.com/sites/iphonelife.com/files/tips-newsletter.jpg){: .align-center}
One thing I learned from this project is that docker offers something that no other technology does, at least not even remotely close to the efficiency of docker.

The fastest console with a clean windows server operating system is accessible with
- `docker run -it microsoft/windowsservercore cmd` launches a command line console.
- `docker run -it microsoft/windowsservercore powershell` launches a PowerShell console.

Even better, you can run as many of these instances as you want. You can name them to make easier stopping and starting them. The coolest thing about this is that it' super safe efficient compared for example to any virtualization technology where the entire operating system needs to replicated for merely two command prompts.
{: .notice--info}

To go one step further, if you want to execute commands from a customized state of the operating system, then create a docker file that gets you to that state and then do `docker run` as many times as you want to launch clean identical consoles.
{: .notice--info}