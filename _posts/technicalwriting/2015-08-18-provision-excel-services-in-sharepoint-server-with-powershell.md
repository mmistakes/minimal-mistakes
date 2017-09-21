---
title: "Provision Excel Services in Sharepoint Server with Powershell"
excerpt: &excerpt "How to provision Excel Services using PowerShell cmdlets with 
each step explained, leaving you with a complete script to setup Excel 
Services in SharePoint."
modified: 2017-09-20
category: technicalwriting
author_profile: false
related: false
share: false
image: 
  teaser: 
  thumb: 
show_category_list: false
show_tag_list: false
fullwidth: true
featured: 
---

_Before reading..._

*   _Target Audience:_ This article targets IT Pros, DevOps and System 
    Administrators working in a SharePoint Server environment. 
*   _Scenario:_ While providing a full PowerShell script to provision (setup) 
    Excel Services, it also explains each section of the process, line by 
    line, showing how the pieces of code fit together. 
*   _Sources:_ I wrote 100% of the content, including the PowerShell code, 
    without an editor providing input. The information was derived from my 
    experience as a SDET (software development engineer in test) with Excel 
    Services at Microsoft. 

_...and here's the sample._

---

SharePoint administrators are able to setup, deploy and configure 
[Excel Services](https://msdn.microsoft.com/en-us/library/office/ms517343(v=office.14).aspx) 
running on [SharePoint Server 2010](https://msdn.microsoft.com/en-us/library/office/dd776256(v=office.12).aspx) 
using [PowerShell](http://www.microsoft.com/powershell). In this article, 
you’ll see how to provision Excel Services using PowerShell cmdlets 
(pronounced “command-lets”). Each step will be explained and you'll
have a complete script to setup Excel Services in SharePoint.

The purpose of this PowerShell script will be to:

1.  Remove any existing occurrences of Excel Services. 
2.  Remove the existing Internet Information Server (IIS) Application Pool used by Excel Services. 
3.  Provision (setup) Excel Services with the domain user account running the script. 
4.  Start Excel Services. 

## Contents ##

1.  [Prerequisites](#prerequisites) 
2.  [Getting Ready](#getting-ready) 
3.  [The Script &ndash; Set Constants](#the-script--set-constants) 
4.  [The Script – Initial Clean Up](#the-script--initial-clean-up) 
5.  [The Script – Add SharePoint Managed Account](#the-script--add-sharepoint-managed-account) 
6.  [The Script – Provision Excel Services](#the-script--provision-excel-services) 
7.  [The Script – Run Excel Services](#the-script-run-excel-services) 
8.  [The Full Script](#the-full-script) 
9.  [Summary](#summary) 
10. [Resources](#resources)

## Prerequisites ##

Before we proceed, you must have a SharePoint Server 2010 farm and be a member of the 
[SharePoint Farm Administrators group](https://msdn.microsoft.com/en-us/library/Cc767417.aspx). 
You should be familiar with the following technologies, at least to a small extent.

*   [Excel Services](https://msdn.microsoft.com/en-us/library/office/ms517343(v=office.14).aspx) &ndash; 
    Allows you to view and edit [Excel](http://www.microsoft.com/excel) workbooks 
    in your browser that are located in SharePoint document libraries. 
*   [SharePoint Server 2010](https://msdn.microsoft.com/en-us/library/ee557323(office.14).aspx) &ndash; 
    The server platform required by Excel Services. 
    *   The previous version of SharePoint (2007) that ran Excel Services 
        was called Microsoft Office SharePoint Server (MOSS). 
*   [Internet Information Systems (IIS)](https://technet.microsoft.com/en-us/library/cc753433(v=ws.10).aspx) 
    &ndash; Web server and platform that runs on Windows Server 2008. 
*   [PowerShell](http://www.microsoft.com/powershell) &ndash; A scripting 
    language and platform used by Windows operating systems.

## Getting Ready ##

1.  Log in to your SharePoint server. You must be a member of the Farm 
    Administrators group. If you have a multiple-server farm configured, any 
    server in the farm will work. 
2.  Open PowerShell with the SharePoint snap-in.

    a.  Start –> All Programs –> Microsoft SharePoint 2010 Products –> 
        SharePoint 2010 Management Shell 
        
    b.  Alternatively, you can open a regular PowerShell prompt and add 
        the Microsoft.SharePoint.PowerShell snap-in with the following command: 

        Add-PSSnapin Microsoft.SharePoint.PowerShell

## The Script – Set Constants ##

In order to run the script, some variables need to be set.

```powershell
6 ##### Set constants
7 $ServiceAccount = $env:UserDomain + "\" + $env:UserName;
8 $ServiceName="ExcelServices";
9 $IISAppPool="ExcelServicesAppPool";
```

_Line 7_ &ndash; In this sample, the script is assumed to be running in a 
Windows Active Directory environment, which requires user authentication. 
The credentials of the user logged into the server, running the PowerShell 
cmdlets, will be used to authenticate when Excel Services is running. The 
script reads the environment variables for the user’s domain and name, 
`$env:UserDomain` and `$env:UserName`, respectively.

_Line 8_ &ndash; The SharePoint service should have a descriptive name. In 
this case, it will be called ExcelServices.

_Line 9_ &ndash; IIS will create a separate IIS Application Pool for the new 
SharePoint service. This service should also have a descriptive name, such 
as ExcelServicesAppPool, instead of the name SharePoint provides by default.

## The Script – Initial Clean Up ##

Before provisioning a new service, it’s best to verify that the environment 
is clean. This allows you to proceed knowing there aren’t any current 
instances of Excel Services, which might create conflicts with your script.

```powershell
11 ##### Clean up
12 write-host " ---- Removing all instances of Excel Services Service Application Proxies" -Fore Red;
13 Get-SPServiceApplicationProxy | where { $_.TypeName.Contains('Excel Services') } -ErrorAction SilentlyContinue | Remove-SPServiceApplicationProxy -confirm:$false;
14 write-host " ---- Removing all instances of Excel Services Service Applications" -Fore Red;
15 Get-SPExcelServiceApplication | Remove-SPServiceApplication -confirm:$false -ErrorAction SilentlyContinue;
16 write-host " ---- Removing IIS Application pool from SP, if it exists" -Fore Red;
17 Remove-SPServiceApplicationPool -Identity $IISAppPool -ErrorAction SilentlyContinue; 
```

_Line 13_ &ndash; `Get-SPServiceApplicationProxy` retrieves any SharePoint 
Service Application Proxies with Excel Services in the name. These are 
piped `|` into the `Remove-SPServiceApplicationProxy` cmdlet, which deletes 
them.

*   Service Application Proxies are the virtual link between Web Applications, 
    such as Excel Services, and the SharePoint service. They understand the 
    load-balancing scheme for a service, communicate to service machine 
    instance(s) and enable inter-farm services.

_Line 15_ &ndash; `Get-SPExcelServiceApplication` retrieves any Excel Service 
Applications and pipes them into the `Remove-SPServiceApplication` cmdlet, 
which deletes them.

_Line 17_ &ndash; `Remove-SPServiceApplicationPool` deletes the SharePoint 
Service Application Pool and IIS Application Pool named ExcelServicesAppPool. 
That value is contained in `$IISAppPool`, which was defined on line 9.

## The Script – Add SharePoint Managed Account ##

In order for an Active Directory user account to manage SharePoint services 
and web applications, it must be registered with SharePoint as a Managed 
Account. In this example, you’ll be using the account you’re logged in as 
to run Excel Services.

**Note:** You can use a different Active Directory account to run Excel Services, but how to do so is not covered in this guide.

```powershell
19 ##### Add user account as a SPManagedAccount, if it isn't already, so we can use it to run the application pool
20 $ManagedAccount = Get-SPManagedAccount | where { $_.UserName.Contains($ServiceAccount) };
21 write-host "Service account (currently logged in as) = $ServiceAccount";
22 if (($ManagedAccount -eq $null) -or ($ManagedAccount.UserName.ToLower() -ne $ServiceAccount.ToLower()))
23 {
24    write-host "We will use this account to run the Excel Services application!";
25    $credAccount = $host.ui.PromptForCredential("Managed Account", "Enter Account Credentials:", "", "NetBiosUserName" );
26    New-SPManagedAccount -Credential $credAccount;
27 }
``` 

_Line 20_ &ndash; Determine if the current logged in user, as defined 
earlier in line 7, is registered in SharePoint as a Managed Account. 
This is done by searching for the user name with `Get-SPManagedAccount` 
and creating a SPManagedAccount object variable called `$ManagedAccount`.

_Line 22_ &ndash; If the Managed Account **is not found** (meaning that 
`$ManagedAccount` is null) _OR_ **running under a different user** account 
(meaning that it’s different than `$ServiceAccount`), then **add the current 
user as a SharePoint Managed Account** (in _lines 25 and 26_). Otherwise, 
the current user is already registered as a Managed Account with SharePoint 
and does not need to be added again.

_Line 25_ &ndash; Prompt the current user to enter their password in order 
to create a Credential Object.

_Line 26_ &ndash; `New-SPManagedAccount` creates a new SharePoint Managed 
Account with the current user's credentials.

## The Script – Provision Excel Services ##

Using the constant variables defined in the beginning of the script, create 
a new instance of Excel Services with a new IIS Application Pool.

```powershell
29 ##### Provision Excel Services using a new IIS application pool
30 write-host "Creating new Excel Services Application: $ExcelServices"
31 write-host "Using a new IIS application pool: $IISAppPool"
32 New-SPServiceApplicationPool -Name $IISAppPool -Account $ServiceAccount | New-SPExcelServiceApplication -Name $ServiceName -Default | Out-Null;
```

_Line 32_ &ndash; `New-SPServiceApplicationPool` creates a new SharePoint 
Service Application Pool in IIS and `New-SPExcelServiceApplication` creates 
the Excel Service in SharePoint.

## The Script – Run Excel Services ##

Now that Excel Service exists on the SharePoint server, it still needs to 
be started so it can process the requests to view and edit Excel workbooks.

```powershell
34 ##### Start Excel Services:
35 write-host "Starting Excel Services service instance."
36 Get-SPServiceInstance -Server $env:computername | where {$_.TypeName.Contains('Excel')} | Start-SPServiceInstance;
```

_Line 36_ &ndash; Find the SharePoint service that was just created by 
using `Get-SPServiceInstance` with a piped `|` where clause for a service name 
that contains Excel. Then run `Start-SPServiceInstance` on the object 
found to start the service running.

**Note:** In PowerShell, the pipe `|` carries the results from the first cmdlet to the next one, and so on. Breaking down the cmdlets from line 36, they translate as follows:

*   `Get-SPServiceInstance -Server $env:computername` &ndash; Retrieves all SharePoint services running on the local server 
*   `where {$_.TypeName.Contains(‘Excel’)}` &ndash; Reduces the list of services to those that contain the string ‘Excel’ 
*   `Start-SPServiceInstance` &ndash; Starts the SharePoint services containing the string ‘Excel’ in the name (found in the previous step)

## The Full Script ##

Here is the full script. To run this, copy/paste the contents below into a text editor and save it as a .ps1 file (example: ProvisionExcelServices.ps1).

**Note:** The script must be run from the SharePoint 2010 Management Shell or a 
PowerShell prompt with the Microsoft.SharePoint.PowerShell add-in loaded 
(see [Getting Ready](#getting-ready) for details).

```powershell
 1 #~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 2 # Provisions excel services with a new IIS application pool and starts the service instance.
 3 # NOTE: This will delete any existing instances of Excel before provisioning.
 4 #~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 5 write-host "----- Starting Provision Excel Services -----" -Fore Green;
 6 ##### Set constants
 7 $ServiceAccount = $env:UserDomain + "\" + $env:UserName;
 8 $ServiceName="ExcelServices";
 9 $IISAppPool="ExcelServicesAppPool";
10  
11 ##### Clean up
12 write-host " ---- Removing all instances of Excel Services Service Application Proxies" -Fore Red;
13 Get-SPServiceApplicationProxy | where { $_.TypeName.Contains('Excel Services') } -ErrorAction SilentlyContinue | Remove-SPServiceApplicationProxy -confirm:$false;
14 write-host " ---- Removing all instances of Excel Services Service Applications" -Fore Red;
15 Get-SPExcelServiceApplication | Remove-SPServiceApplication -confirm:$false -ErrorAction SilentlyContinue;
16 write-host " ---- Removing IIS Application pool from SP, if it exists" -Fore Red;
17 Remove-SPServiceApplicationPool -Identity $IISAppPool -ErrorAction SilentlyContinue;
18  
19 ##### Add user account as a SPManagedAccount, if it isn't already, so we can use it to run the application pool
20 $ManagedAccount = Get-SPManagedAccount | where { $_.UserName.Contains($ServiceAccount) };
21 write-host "Service account (currently logged in as) = $ServiceAccount";
22 if (($ManagedAccount -eq $null) -or ($ManagedAccount.UserName.ToLower() -ne $ServiceAccount.ToLower()))
23 {
24     write-host "We will use this account to run the Excel Services application!";
25     $credAccount = $host.ui.PromptForCredential("Managed Account", "Enter Account Credentials:", "", "NetBiosUserName" );
26     New-SPManagedAccount -Credential $credAccount;
27 }
28      
29 ##### Provision Excel Services using a new IIS application pool
30 write-host "Creating new Excel Services Application: $ExcelServices"
31 write-host "Using a new IIS application pool: $IISAppPool"
32 New-SPServiceApplicationPool -Name $IISAppPool -Account $ServiceAccount | New-SPExcelServiceApplication -Name $ServiceName -Default | Out-Null;
33  
34 ##### Start Excel Services:
35 write-host "Starting Excel Services service instance."
36 Get-SPServiceInstance -Server $env:computername | where {$_.TypeName.Contains('Excel')} | Start-SPServiceInstance;
```

This PowerShell script will enable 
[Excel Services](https://msdn.microsoft.com/en-us/library/office/ms517343(v=office.14).aspx) 
on a [SharePoint Server 2010](https://msdn.microsoft.com/en-us/library/office/dd776256(v=office.12).aspx) 
farm. Please note the requirements listed earlier in [Getting Ready](#getting-ready).

## Summary ##

Through the course of this document, you’ve learned how to:

* Remove a SharePoint service application via PowerShell. 
* Create a new Excel Services SharePoint service application via PowerShell. 
* Start a SharePoint service application via PowerShell. 
* Register an Active Directory user as a SharePoint Managed Account. 
* Understand piping and using the pipe character `|` in PowerShell. 
* Automate the provisioning of Excel Services via PowerShell, increasing efficiency and repeatability.

## Resources ##

*   [Excel Services (SharePoint Server 2010)](https://msdn.microsoft.com/en-us/library/office/ms517343(v=office.14).aspx) 
    *   [Getting Started with Excel Services](https://msdn.microsoft.com/en-us/library/office/ms519581(v=office.14).aspx) 
    *   [Excel Services Administration (SharePoint Server 2010)](https://technet.microsoft.com/en-us/library/ee681487(v=office.14).aspx) 
    *   [Manage Excel Services with Windows PowerShell (SharePoint Server 2010)](https://technet.microsoft.com/en-us/library/ff191201(v=office.14).aspx) 
*   [SharePoint Server 2010](https://msdn.microsoft.com/en-us/library/office/dd776256(v=office.12).aspx) 
    *   [Managed Accounts in SharePoint 2010](http://blogs.technet.com/b/wbaer/archive/2010/04/11/managed-accounts.aspx) by Bill Bae 
*   [PowerShell](http://www.microsoft.com/powershell) 
    *   [Windows PowerShell for SharePoint](https://technet.microsoft.com/en-us/library/ee890108.aspx) 
    *   [Excel Services cmdlets in SharePoint Server](https://technet.microsoft.com/en-us/library/ee906545.aspx) 
*   PowerShell cmdlets used in this script:
    *   [Get-SPExcelServiceApplication](https://technet.microsoft.com/en-us/library/ff607559.aspx) 
    *   [Get-SPManagedAccount](https://technet.microsoft.com/en-us/library/ff607835.aspx) 
    *   [Get-SPServiceApplicationProxy](https://technet.microsoft.com/en-us/library/ff607727.aspx) 
    *   [Get-SPServiceInstance](https://technet.microsoft.com/en-us/library/ff607570.aspx) 
    *   [New-SPExcelServiceApplication](https://technet.microsoft.com/en-us/library/ff607809.aspx) 
    *   [New-SPManagedAccount](https://technet.microsoft.com/en-us/library/ff607831.aspx) 
    *   [New-SPServiceApplicationPool](https://technet.microsoft.com/en-us/library/ff607595.aspx) 
    *   [Remove-SPServiceApplication](https://technet.microsoft.com/en-us/library/ff607874.aspx) 
    *   [Remove-SPServiceApplicationPool](https://technet.microsoft.com/en-us/library/ff607921.aspx) 
    *   [Remove-SPServiceApplicationProxy](https://technet.microsoft.com/en-us/library/ff607876.aspx) 
    *   [Start-SPServiceInstance](https://technet.microsoft.com/en-us/library/ff607965.aspx) 
