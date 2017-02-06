---
excerpt: PowerShell differences in Visual Studio Services and how to do old school debugging/experimantation
header:
  overlay_image: /assets/images/posts/powershell/2016-05-10-powershell-vss.png
tags:
- PowerShell
- Visual Studio Services
date: 2016-05-10 13:50:30
title: PowerShell in Visual Studio Services

---



I'm using **Visual Studio Services (VSS)** as my CI not because its the best, but because it will get better and many of the CI's provided for [github](https://github.com) or [bitbucket](https://bitbucket.org) do not support windows.

Currently, I'm focussing on building PowerShell modules and executing tools such as [Hugo](https://gohugo.io/). One of the most frustrating problems I face is the PowerShell environment provided by the **hosted** agent.
Here are some basic differences you should be aware of:

- PowerShell is version 4, so if you are developing on version 5 be prepared for suprises. Here are some basics things I'm missing:
    - Ability to utilize **PackageManagement** or **PowerShellGet**.
    - Ability to use the parameters of `New-ModuleManifest`
- The `$env:PSModulePath` does not include a user location that you can install modules on. Instead you always have to download the assets in the `$env:Temp` folder and include the files. I typically wrap the download in a **Modules** sub-folder and add that to the `$env:PSModulePath`.
- `Git` as executable is provided from two different locations. More on how to execute Git on PowerShell in this post.

As you engage with the tool you get learn more and more differences. Unfortunately you learn them by trying to troubleshoot why a perfect running script, tested locally, is failing on VSS. 
You can commit again again hoping it will work but yesterday I decided to do this another way.

I decided to create an empty build with a powershell build step. For this step I chose to execute inline script. I edit the script on one tab and from a second browser tab I trigger the build and watch the output.
Unfortunately the script length is a bit limited but even with this limitation it is better to experiment on certain execution patterns. 
Keep in mind that multiple PowerShell steps execute on the same agent and therefore the result of one step could be the working item of another.

 


