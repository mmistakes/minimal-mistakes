---
excerpt: A PowerShell script available in the gallery to help quickly download and use source from public GitHub repositories
header:
  overlay_image: https://s3.amazonaws.com/mnb_keystone/blogs/github_logo.png
tags:
- Powershell
- Visual Studio Services
date: 2016-10-26 08:33:27
categories: Tips
title: Get-Github.ps1 script on Powershell gallery

---



There is so much code in GitHub either in the form of a repository or just as a gist. 
If you are lucky then you might find their published counterparts in different package repositories such PowerShell Gallery , NPM, NuGet, Maven etc. 
But this is not always the case and some repositories do not publish anything. Sometimes, there isn't anything to publish as the repository acts like a script container such as [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap). 
It could be also that some repositories acts as a demo container such as [ISHBootstrapDemo](https://github.com/Sarafian/ISHBootstrapDemo). 
To stretch it even further, in some cases I am only interested in specific parts of a repository such as a script for example [Test-VisualStudioTeamServicesBuildHostedAgent.ps1](https://github.com/Sarafian/PowerShellScripts/blob/master/Automation/VisualStudioTeamServices/Test-VisualStudioTeamServicesBuildHostedAgent.ps1).
I've always found myself limited because I lacked a good and solid way to access this abundance of functionality that is not published.

Imagine that you have an automation sequence that would benefit greatly from the above. 
[Get-Github](https://www.powershellgallery.com/packages/Get-Github/) on PowerShell gallery is exactly the toolkit I was missing. 
It's being developed in GitHub repository [PowerShellScripts](https://github.com/Sarafian/PowerShellScripts).

As a showcase example let’s assume that I would like to run the demo from [ISHBootstrapDemo](https://github.com/Sarafian/ISHBootstrapDemo). 
If you are interested about ISHBootstrapDemo then please read my previous post [ISHBootstrap v0.3 pre release and easy demo]({% link _posts/ish/2016-10-21-ISHBoostrap-v0.3.Demo.md %}). 

PowerShell module **PowerShellGet** offers two cmdlet to access a script from the gallery

- `Install-Script` saves the script in you `"$env:USERPROFILE\Documents\WindowsPowerShell\Scripts"` folder and can be updated in the futre with `Update-Script`. This option is more suitable for your development station.
- `Save-Script` saves the script in specified location

Here is an example for both

```powershell
# Using Install-Script
Install-Script -Name Get-Github -Scope CurrentUser -Force
& "$($PROFILE |Split-Path -Parent)\Scripts\Get-Github.ps1" -User Sarafian -Repository ISHBootstrapDemo -Expand

# Using Save-Script
Save-Script -Name Get-Github -Path $env:TEMP -Force
& "$($env:TEMP)\Get-Github.ps1" -User Sarafian -Repository ISHBootstrapDemo -Expand
```

The outcome in both cases will be 

```powershell
    Directory: C:\Users\asarafian\AppData\Local\Temp\ISHBootstrapDemo


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        26-Oct-16   8:40 AM                ISHBootstrapDemo-master
```

The `Get-Github.ps1` returns the path where the repository was downloaded. When using the `-Expand` parameter it will expand the compressed artifact into a folder and return it.

The best thing about this approach and the reason I created [PowerShellScripts](https://github.com/Sarafian/PowerShellScripts) is the increasing adoption of PowerShell version 5. 
Version 5 provides out of the box support for modules **PackageManagement** and **PowerShellGet** and that makes it super easy to access any module or script from the gallery. 
That last bit of relevant information is that recently the Visual Studio Team Services hosted agent was upgraded and it now offer PowerShell 5 support. 
That means all of the above can be implemented in your build definition.

[Get-Github](https://www.powershellgallery.com/packages/Get-Github/) can also download a specific branch or tag from that repository. 
By default it will download the `master` branch. 
Here are some examples from the [PowerShellScripts](https://github.com/Sarafian/PowerShellScripts) repository where the target repository is it self.

```powershell
.\Get-Github.ps1 -User Sarafian -Repository PowerShellScripts
.\Get-Github.ps1 -User Sarafian -Repository PowerShellScripts -Branch develop
.\Get-Github.ps1 -User Sarafian -Repository PowerShellScripts -Tag v0.1

.\Get-Github.ps1 -User Sarafian -Repository PowerShellScripts -Expand
.\Get-Github.ps1 -User Sarafian -Repository PowerShellScripts -Branch develop -Expand
.\Get-Github.ps1 -User Sarafian -Repository PowerShellScripts -Tag v0.1 -Expand
```

My next step is to add a parameter set for to download gist.
