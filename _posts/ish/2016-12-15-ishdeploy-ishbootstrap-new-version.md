---
excerpt: PowerShell modules ISHDeploy and automation repository ISHBootstrap for SDL's Knowledge Center Content Manager are moving forward with new versions.
tags:
- PowerShell
- ISHDeploy
- SDL
- Knowledge Center
- Content Manager
- ISHBootstrap
date: 2016-12-15 08:46:43
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
- SDL
- Knowledge-Center
- Content-Manager
title: ISHDeploy and ISHBootstrap have new versions

---



This is going to be a joined post for **ISHDeploy** and **ISHBootstrap**. 
Both are part of the greater automation being developed for SDL's Knowledge Center Content Manager. 
There is more information about each on previous posts:

- [About ISHDeploy]({% link _posts/ishdeploy/2016-07-04-what-is-ishdeploy.md %})
- [About ISHBootstrap]({% link _posts/ish/2016-07-25-introduce-ishbootstrap.md %})

In this post I want to focus on the new features that the new versions make available.

## ISHDeploy

As ISHDeploy is a PowerShell module that targets specific versions of SDL's Knowledge Center Content Manager, we have two modules and their respected documentation portals. 

- ISHDeploy.12.0.0
    - [PowerShell module](http://www.powershellgallery.com/packages/ISHDeploy.12.0.0/)
    - [Documentation portal](https://sdl.github.io/ISHDeploy/12.0.0/)
- ISHDeploy.12.0.1
    - [PowerShell module](http://www.powershellgallery.com/packages/ISHDeploy.12.0.1/)
    - [Documentation portal](https://sdl.github.io/ISHDeploy/12.0.1/)

Both modules are now on version **1.2** and the main focus of this release was to add cmdlets to configure menu and buttons in the web the web client (**ISHCM**). 
As part of this release there are also some improvements focuses on improving the experience when scripting with the module. 
For more detailed information about what has changed with this release please read the full [release notes](https://github.com/sdl/ISHDeploy/releases/tag/stable-1.2).

Let's take a look at an example of what is possible:

The [Work with files and packages](https://sdl.github.io/ISHDeploy/12.0.1/Articles/Module/Work%20with%20files%20and%20packages.html) tutorial explain how to copy your customization package into the ISHCM. 
The customization can be compromised by anything such as html, javascript, pictures and binary .net assemblies.

1. Copy files to the module's staging folder. 
1. Apply the customization into the ISHCM folder using `Copy-ISHCMFile` or `Expand-ISHCMPackage` cmdlets.

With the above steps executed, there will a **Custom** folder in the website root with the customization files but nothing is changed in the user interface of the web client. 

The [Configuring ISHCM web UI menu bars](https://sdl.github.io/ISHDeploy/12.0.1/Articles/ISHCM/Configuring%20ISHCM%20web%20UI%20menu%20bars.html) and [Configuring ISHCM web UI button bars](https://sdl.github.io/ISHDeploy/12.0.1/Articles/ISHCM/Configuring%20ISHCM%20web%20UI%20button%20bars.html) tutorials explain how to add, move or even remove menu and button items from the user interface using `Set-ISHUIMainMenuBarItem`, `Set-ISHUIEventMonitorMenuBarItem`, `Set-ISHUISearchMenuBarItem` and `Set-ISHUIButtonBarItem` cmdlets.

One major improvement to the scripting experience is that the `ISHDeployment` parameter is now optional and can be ommitted when only one deployment is available on the system. 
That means that all a previous command such as `Enable-ISHUIContentEditor -ISHDeployment $deploymentName` can be become `Enable-ISHUIContentEditor`. 
If the module finds more than one deployment then the execution will be halted as there is no good logic to chose which deployment to target.

Another improvement is that the cmdlets that have the potential to alter files and require elevated permissions will break immediatly as part of their validation flow.

I've been asked what to do when a configuration needs to be applied to a file but the process is not supported by the module. 
With the understanding that the module is still young and much functionality is still missing, this is a very good question. 
I myself had to address the issue when I needed for testing purposes to increase the level of logging.  
The recommendation is that you should always apply a delta to the file(s) with a script and not maintain **version specific** copies of files and then overwrite them. 
A delta script is the better way because

- It can be tested, therefore your script repository can be validated against a new release.
- It targets a specific section of the file. If the file is different between versions, then chances are that those differences are not near the area of your interest.
- If the target file is structured, e.g XML, then you have almost 100% guarantee for cross version compatibility unless the xml's schema has changed.  

Overall, the above will significantly reduce your upgrade cost while making the upgrade more predictable when a new Knowledge Center version is released. 
With some extra automation, this approach can go a long way.

This is great but what about if as a script author I make a mistake and I want to undo my changes using `Undo-ISHDeployment`. 
This had been the missing link until the introduction of `Backup-ISHDeployment` cmdlet with this version.
With `Backup-ISHDeployment` you can tell the module to backup a specific file in the same way it would have done itself. 
This makes sure that the `Undo-ISHDeployment` will rollback back all changes including the ones to files you modified as long as you explicit requested a backup. 
This process is explained in the [Work with files and packages](https://sdl.github.io/ISHDeploy/12.0.1/Articles/Module/Work%20with%20files%20and%20packages.html#modify-a-file-on-the-deployment-without-the-module) tutorial.

In my opinion `Backup-ISHDeployment` is the hidden gem of this release as it allows you to venture ahead and beyond the capabilities of the module. 
If you create a custom script that you think is a good generic functionality please share with us.

## ISHBootstrap

[ISHBootstrap](https://github.com/Sarafian/ISHBootstrap/) is an automation repository to streamline the deployment of SDL's Knowledge Center Content Manager on a clean Windows operating system. 
The repository acts as a 

- Script source to drive the installation.
- Showcase of how a json configuration file could execute and sequence correctly the above scripts.
- ISHDeploy configuration scripts for ISHDeploy PowerShell module.

As their were some breaking changes with ISHDeploy's new version, ISHBootstrap needed to be updated also. 
New version **0.4** brings also some additional enhancements.

- WinRM with CredSSP has been improved and is now fully automated leveraging new functionality offered with [CertificatePS](https://www.powershellgallery.com/packages/CertificatePS/) PowerShell module.
- Improved progress indication. This improved the experience as the scripts are long running and it's not always clear what was going on.
- Bug fixes.
- The MSXML4 prerequisite is now optional. All versions starting from upcoming Knowledge Center 2016 SP3 will not require it.

For more detailed information, please refer to the full [release notes](https://github.com/Sarafian/ISHBootstrap/releases/tag/v0.4).

As always, any feedback you may have will be much appreciated.
