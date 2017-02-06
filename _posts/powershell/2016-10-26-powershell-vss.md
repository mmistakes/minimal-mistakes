---
excerpt: Latest developments for Visual Studio Team Services and PowerShell. Troubleshooting and feedback to the development teams.
header:
  overlay_image: https://msdnshared.blob.core.windows.net/media/2016/01/VorlonJS_DevOps_Part1_2.png
tags:
- PowerShell
- Visual Studio Services
date: 2016-10-26 11:33:14
title: PowerShell and Visual Studio Team Services

---



Many months ago when I started working with PowerShell I tried using Visual Studio Team Services as my CI tool. 
My main focus is PowerShell for PowerShell meaning that I'm not interested in building .NET applications or publishing NuGet packages, but I'm interested in testing with Pester and publishing to the [PowerShell gallery](https://www.powershellgallery.com/). 
Almost half a year ago, I've wrote a post [PowerShell in Visual Studio Services]({% link _posts/powershell/2016-05-10-powershell-vss.md %}) regarding the limitations of Visual Studio Team Services hosted agent. 

To my surprise the hosted agent now supports PowerShell version 5. 
It even comes out of the box with the **PowerShellGet** and **PackageManagement** but not with **Pester**. 
This is great news since you can leverage the cmdlets such as `Save-Module`, `Install-Module` and their script counterparts `Save-Script`, `Install-Script` to bootstrap your agent's environment. 
But things aren't that simple and it seems that the team developing the hosted agent is not focused much on PowerShell at least in my scenario. 
Let me explain.

Let’s assume the following scenario. I'm developing a module/script that I want to automatically publish to the PowerShell gallery. 
I want to publish automatically when my master branch gets updated using continuous integration. 
This would be my normal flow 

1. Run Pester scripts.
1. Publish.

So when I've noticed that PowerShell v5 is supported, I thought this would be easy for my [PowerShellScripts](https://github.com/Sarafian/PowerShellScripts) repository. 

1. I've got my Pester tests and my publish script. 
1. I figured out how to publish a script only when it's necessary. 
1. Created a build configuration on VSTS
1. **Failed**

The first thing that went wrong is that the Pester module is not included. 
I thought this is easy, lets create a step that installs the module `Install-Module Pester -Scope CurrentUser -Force`. 
This would make Pester available for all next steps. 
**Didn't work again**. 
It seems that you need first to update the NuGet package provider. 
I added another step `Install-PackageProvider -Name NuGet -Force -Scope CurrentUser`.
Then the `Install-Module -Name Pester -Force -Scope CurrentUser` for Pester worked. 
**Fail again**. 
This is my current sequence:

1. Force an update for the NuGet Package provider
1. Install Pester
1. Run Pester
1. `Publish-Script` fails during publishing step.

The error reads 

> Exception calling "ShouldContinue" with "2" argument(s): "Windows PowerShell is in NonInteractive mode. Read and
> 
> Process completed with exit code 0 and had 1 error(s) written to the error stream.

This is where it gets very complicated and spend almost a day troubleshooting. 

I will not get into detail about the error message besides mentioning that is dependent on the `-NonInteractive` parameter for `powershell.exe`. 
All PowerShell scripts run with this parameter in Visual Studio Team Services. 

The problem is that if I would mimic the agent's execution, I could not reproduce on my system. 
I tried many different things and triggering a build is so difficult and time consuming with Visual Studio Team Services that doesn't help the cause. 
For troubleshooting purposes I've setup some build definitions with many different steps that I add or modify inline PowerShell scripts and execute and see what happens. 
Very bad experience. 

After many iterations and after reading the code of `PowerShellGet` I figured out that the `Publish-Script` or `Publish-Module` must be called with the `-Force` parameter. 
Looks simple but when trying to develop a publishing script you always use the `-WhatIf` parameter. 
You can't publish after all for debugging! As long as the `-WhatIf` is used then there is a conflict with the `-Force` parameter. 
This is the main reason it took me so long to find what the solution is. 
I was completely sidetracked and looking into something like this `Import-PackageProvider -Name NuGet` as required step before `Publish-Script`. 
It turns out that it is not necessary.

During this effort I ended up with this block that works both in a hosted agent and on my development host.  
I hope it helps many other people

```powershell
if($shouldTryPublish)
{
    Write-Debug "Publishing $($sourceScript.FullName)"
    Write-Progress -Activity $progressActivity -Status "Publishing..."
    if($NuGetApiKey)
    {
        Publish-Script -Repository PSGallery -Path $sourceScript.FullName -NuGetApiKey $NuGetApiKey -Force
    }
    else
    {
        $mockKey="MockKey"
        if($isVSTSHostedAgent)
        {
            # When VSTS hosted agent is detected, the -Force is required. But it overrides the -WhatIf. 
            # This is only to check if it is possible to publish.
            Write-Warning "VSTS detected. Simulating publishing with -Force parameter."
            Publish-Script -Repository PSGallery -Path $sourceScript.FullName -NuGetApiKey $mockKey -WhatIf -Force -ErrorAction SilentlyContinue
            Write-Warning "Publish script is expected to have failed because of the $mockKey key."
        }
        else
        {
            Publish-Script -Repository PSGallery -Path $sourceScript.FullName -NuGetApiKey $mockKey -WhatIf
        }
    }
``` 

Unfortunately the `-WhatIf` equivalent for the hosted agent is not very informative but I can't find a workaround. 
So I just added some warning messages. 

You can find the full code in [Publish-ToGallery](https://github.com/Sarafian/PowerShellScripts/blob/master/Automation/Publish-ToGallery.ps1). 
It also demonstrates how I figure out if I should publish a script by comparing the local version with the online counterpart. 
You will also notice references to this folder [Automation/VisualStudioTeamServices](https://github.com/Sarafian/PowerShellScripts/tree/master/Automation/VisualStudioTeamServices). 
After much frustration I ended up creating re-usable scripts that can be used from one step in the build definition. 
A build step very specific to address the limitations of the hosted agent.

## My feedback to the Microsoft for the VSTS-Agent project

The interaction with Visual Studio Team Services must improve significantly because working with PowerShell is extremely difficult and limited. 

**Performance improvements**

1. Installing the NuGet package provider is time consuming and delays the build significantly.
1. Installing the Pester module is also time consuming and delays the build.

Please make it possible to not require the following two lines on every build

```powershell
Install-PackageProvider -Name NuGet -Force -Scope CurrentUser
Install-Module -Name Pester -Force -Scope CurrentUser
```

**Big fix**

Something on how the powershell.exe is called is different and forces the PowerShellGet module to try to raise a question during `Publish-Script` and `Publish-Module`. 
I've narrowed it down to the internal function `Install-NuGetClientBinaries` that is always called to make sure the NuGet client is available.

I haven't tried the [AppVeyor](https://www.appveyor.com/) counter offer but from a couple of posts I've read it seems to be more straightforward.
