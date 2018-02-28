---
Layout: post
title: SCCM-collections (with query based membership based on AD) created by Powershell
Author_profile: true
Tags: 'PS, SCCM, AD'
published: true
date: '2018-02-28'
---
Before i can explain the script, i'll explain the way we work.
Back when we were using SCCM 2007, our SCCM was a real mess. We had too many advertisements, collections, ... .

So i came up with a new method of working in light of the deployment of a new OS (Windows 7).

The goal of this project was two-sided:

1.   Make the deployment of software as transparant and logical as possible.
2.   Make it possible for non-helpdesk or non-SysAdmins (yes i mean the developers ![]({{site.baseurl}}/assets/images/SCCMcollections/omg.png) ) to deploy software to a spare computer, this without a deep knowlegde of SCCM.

The method was designed with SCCM 2007 but it has transitionned into SCCM 2012.
Having said that, SCCM 2007 was *a lot easier* to "see" what was going on.

Therefore, the screenshots that you'll see below, are old screenshots from SCCM 2007 which i photoshopped so that they don't contain corporate\sensitive information.

So if you see some font that isn't quite right, you know why :).

**The basic idea is that a computer only needs to be added into an Active-Directory computergroup**. 
This way, you don't have to be in SCCM at all. This computergroup will serve as a feeder for SCCM.

The method goes as follows:

1.   You create a computergroup in AD e.g: CG_Marketing, CG_ICT,CG_Financial
2.   In SCCM you create a **"Department Collection"** with the same name : CG_Marketing, CG_ICT, CG_Financial, ...
	 <br/>2.1   You add a query-membership to the AD group with the same name.
4.   You create an **"Application collection"**. I made them with a prefix of "app". APP_Office, APP_Bizaggi, ...
5.   You create an advertisement\deployment for this APP_ collection and deploy it to the **"Application collection"**.
6.   You add the **"Department collection"** as a member to the  **"Application collection(s)"** aka: the software it needs.

This way, when you look at the membership of an "Application Collection" you can immediatly see which departments are getting this software installed. Again, this was a lot more visible in SCCM 2007.

Now to make this more visible, i created a graphical representation of this workflow:


![]({{site.baseurl}}/assets/images/SCCMcollections/method.png)

# Deployment of Windows 10

Fast forward few years and we are now almost ready to start deploying Windows 10. So we need to get our systems ready to go.
I will still be maintaining the same method of deployment as described above. 
The issue is that Windows 7 will still be active during the deployment of Windows 10. This means that i need to be able to deploy software to both Windows 7 and Windows 10.

Therefore i need new Active Directory computergroups and SCCM collections so that i can separate the two.

## Setting up Active Directory
So first we start with retrieving the current AD-groups, replacing the prefix with a suiting W10 so that we then can create new groups with those new fitting names.

```javascript
Get-ADObject -Filter 'name -like "CG*"' | select -ExpandProperty Name | % {$_ -replace 'CG_','CG_W10_'} | % { New-ADGroup $_ -GroupScope Global -WhatIf -Path "yadayada" }
```

The script below will create new SCCM collections with the same name as the new groups in Active Directory.

It will first create them in a root-folder and then move it to our local branch (this is internal).
After it moved the collection, it will add a membership rule based on a query. 

This query will retrieve all computers from the computergroup that has the same name in AD. (see picture above for clarification if needed)


## Setting up SCCM
```javascript
# Site configuration
$SiteCode = "sitename" # Site code 
$ProviderMachineName = "servername.domain.com" # SMS Provider machine name

# Customizations
$initParams = @{}
#$initParams.Add("Verbose", $true) # Uncomment this line to enable verbose logging
#$initParams.Add("ErrorAction", "Stop") # Uncomment this line to stop the script on any errors

# Import the ConfigurationManager.psd1 module 
if((Get-Module ConfigurationManager) -eq $null) {
    Import-Module "$($ENV:SMS_ADMIN_UI_PATH)\..\ConfigurationManager.psd1" @initParams 
}

# Connect to the site's drive if it is not already present
if((Get-PSDrive -Name $SiteCode -PSProvider CMSite -ErrorAction SilentlyContinue) -eq $null) {
    New-PSDrive -Name $SiteCode -PSProvider CMSite -Root $ProviderMachineName @initParams
}

# Set the current location to be the site code.
Set-Location "$($SiteCode):\" @initParams
$prefix = "internalprefix" 

$arr = (
"CG_W10_ICT",
"CG_W10_Financial",
"CG_W10_Marketing"
)

# Set collecton parameters
$LimitingCollectionID = (Get-CMDeviceCollection | Where-Object {$_.Name -eq 'yoda'}).CollectionID # We don't actually have a collection named yoda ;-)
$CMSchedule = New-CMSchedule -Start '2018/02/01 00:00:00' -RecurInterval  Days  -RecurCount 0 

FOREACH ($item in $arr){
    $CollectionName = "$item"
    $col = $prefix + $CollectionName # add internal prefix to the collectionname
    
    #Create the collection
    write-host "Creating:  $col" -ForegroundColor Cyan
    New-CMDeviceCollection -Name $col -LimitingCollectionId $LimitingCollectionID -RefreshType Both -RefreshSchedule $CMSchedule -WhatIf

    #Move the collection to our Federation withing SCCM
    $Collection1 = Get-CMDeviceCollection -Name $col
    write-host "Moving:  $Collection1" -ForegroundColor Cyan
    Move-CMObject -InputObject $Collection1 -FolderPath $($SiteCode+":\DeviceCollection\yoda") -WhatIf

    # Creata a membership Query Rule
    write-host "Add query:  $col" -ForegroundColor Cyan
    Add-CMDeviceCollectionQueryMembershipRule -CollectionName $col -QueryExpression "select SMS_R_SYSTEM.ResourceID,SMS_R_SYSTEM.ResourceType,SMS_R_SYSTEM.Name,SMS_R_SYSTEM.SMSUniqueIdentifier,SMS_R_SYSTEM.ResourceDomainORWorkgroup,SMS_R_SYSTEM.Client from SMS_R_System where SMS_R_System.SystemGroupName = ""ourdomain\\$item"" " -RuleName "AD_Query_$col" -WhatIf
 
    # Update the collection
    write-host "Update col:  $col" -ForegroundColor Cyan
    Invoke-CMDeviceCollectionUpdate -Name $col -WhatIf

}	
```

As you can see i've created a $arr in which i copy/pasted the new groups. I could have made this more dynamically, but since i will only be doing this onces, i didn't bother to do that.

# TL;DR

With this method, a computer receives the needed software, based on its department, just by adding it to the correct computergroup in Active Directory.

