---
date: 2016-11-29 12:23:27
title: Import-Module behaves wrongly when different versions are installed to different scopes
tags: PowerShell
excerpt: Import-Module is supposed to load the highest version of a module. But when there are different versions installed in local and global profile it seems to always prefer the local one even when the version is not the highest.

---



I believe this to be a bug with `Import-Module` on PowerShell version `5.0.10586.672`.
To help me showcase the issue I'll use the [MarkdownPS](https://www.powershellgallery.com/packages/MarkdownPS/) that has multiple version where `1.4` is the highest one.
To showcase the issue I'll follow these steps

1. Uninstall all versions of the module to reset my environment.
1. Install version `1.2` to my local storage.
1. Install version `1.4` to my global storage.
1. List the available module versions.
1. Import the module.
1. Show that it loaded version `1.2` which is not expected.

```powershell
$InformationPreference="Continue"
#region Uninstall module
Uninstall-Module MarkdownPS -AllVersions
#endregion

#region Install module
Find-Module MarkdownPS -Repository PSGallery -MaximumVersion 1.2 |Install-Module -Scope CurrentUser -Force
Find-Module MarkdownPS -Repository PSGallery -MaximumVersion 1.4 |Install-Module -Scope AllUsers -Force
#endregion

#region list module version
Get-Module MarkdownPS -ListAvailable |Format-Table Name,Version,ModuleBase
#endregion

#region Import module and show the issue
$module=Import-Module MarkdownPS -PassThru -Verbose
Write-Information "Imported $($module.Name) with version $($module.Version) from $($module.ModuleBase)"
#endregion

```

The output is like this

```powershell
Name       Version ModuleBase                                                           
----       ------- ----------                                                           
MarkdownPS 1.2     C:\Users\asarafian\Documents\WindowsPowerShell\Modules\MarkdownPS\1.2
MarkdownPS 1.4     C:\Program Files\WindowsPowerShell\Modules\MarkdownPS\1.4            


VERBOSE: Loading module from path 'C:\Users\asarafian\Documents\WindowsPowerShell\Modules\MarkdownPS\1.2\MarkdownPS.psd1'.
VERBOSE: Importing function 'New-MDCharacterStyle'.
VERBOSE: Importing function 'New-MDCode'.
VERBOSE: Importing function 'New-MDHeader'.
VERBOSE: Importing function 'New-MDImage'.
VERBOSE: Importing function 'New-MDInlineCode'.
VERBOSE: Importing function 'New-MDLink'.
VERBOSE: Importing function 'New-MDList'.
VERBOSE: Importing function 'New-MDParagraph'.
VERBOSE: Importing function 'New-MDQuote'.
VERBOSE: Importing function 'New-MDTable'.
Imported MarkdownPS with version 1.2 from C:\Users\asarafian\Documents\WindowsPowerShell\Modules\MarkdownPS\1.2
```

From the output is clear that the two versions are available at two different profile locations and that the `Import-Module` preferred the lower of the two from my current user profile. 
This was not expected and in my opinion its a bug, as it is also not documented. 
I did some workaround investigation for `Import-Module` and there is one like this `Import-Module MarkdownPS -RequiredVersion 1.4`. 
But it's not a good nor valid workaround because it doesn't solve two issues.

- You normally don't know the highest version of a module and you don't care about it in your scripts.
- When a cmdlet is referenced, then a module is imported implicitly with the same unexpected behavior as described here for `Import-Module`.

I appreciate anyone's feedback on this subject.
