---
excerpt: Announcing pre release version 0.9 for SDL Knowledge Center 2016 Content Manager
header:
  overlay_image: http://www.naturalheightgrowth.com/wp-content/uploads/2014/07/Almost-There.jpg
tags:
- PowerShell
- ISHDeploy
- SDL
- Knowledge Center
- Content Manager
date: 2016-08-18 13:22:57
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
title: ISHDeploy pre-release version 0.9 is available

---



We are getting closer to a final release of **ISHDeploy**. 
There are a couple of issues that need to be fixed and I do hope in short time we will offer a final first version.

As a reminder, **ISHDeploy** is a PowerShell automation module for **SDL Knowledge Center 2016 Content Manager** deployments. 
For more detailed analysis please refer to previews [post]({% link _posts/ishdeploy/2016-07-04-what-is-ishdeploy.md %}). 
Each version of Content Manager (e.g. X.0.Z) is matched with a specific module named ISHDeploy.X.0.Z. 
During this week, engineering also released the new patch **SDL Knowledge Center 2016 SP1** that includes Content Manager 12.0.1.
For this reason, there are now two modules available in the PowerShell gallery:

- ISHDeploy.12.0.0 for the Content Manager 12.0.0
- ISHDeploy.12.0.1 for the Content Manager 12.0.1

You can always search for all ISHDeploy modules with these quick links:

- [Search for all ISHDeploy modules](http://www.powershellgallery.com/items?q=ISHDeploy)
- [Search for all modules tagged with ISH](http://www.powershellgallery.com/items?q=Tags%3A%22ISH%22)

To access the module and documentation per Content Manager version, please use this quick reference [link](http://sdl.github.io/#dita).

As the latest and greatest for **SDL Knowledge Center 2016 Content Manager** is now on version 12.0.1, that means that ISHDeploy.12.0.1 will be also the referenced module.
Since ISHDeploy was designed to facilitate streamline updates of the product we are providing same functionality to ISHDeploy.12.0.0 when possible.

## Release details

The release artifacts are available on [github](https://github.com/sdl/ISHDeploy/releases/tag/beta-0.9). 
With the latest pre-release version v0.9 you can now 

- Pipe the output of all `Get-ISH*` cmdlets. e.g. `Get-ISHDeployment` can be piped. e.g. `Get-ISHDeployment | ForEach-Object {$_}`.
- Specify multiple user roles in `Set-ISHUIEventMonitorTab`.
- Configure ISHSTS using `Set-ISHSTSConfiguration`.
  - Enable windows authentication.
  - Update the token signing certificate.

## Known issues

- When the deployment is configured for light weight windows authentication, the described certificate rollover leaves the system broken. The workaround is to re-execute the `Set-ISHSTSConfiguration -ISHDeployment $deploymentName -AuthenticationType Windows`.
- `Set-ISHSTSConfiguration` does not check if the windows authentication module is installed on IIS. 

## Where to reach out for feedback and questions?

- Bellow in the comments
- On the github [repository](https://github.com/sdl/ISHDeploy/)
