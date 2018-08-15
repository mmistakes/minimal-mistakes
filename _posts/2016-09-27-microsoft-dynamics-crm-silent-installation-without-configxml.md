---
title: "Microsoft Dynamics CRM silent installation without config.xml"
description: ""
category: [Microsoft Dynamics CRM]
tags: [Microsoft Dynamics CRM]
---


Microsoft Dynamics CRM has the option of doing a command line install where the installation parameters are filled in a [config.xml](https://technet.microsoft.com/en-us/library/hh699830.aspx) file.
For [Windows Server Core](https://msdn.microsoft.com/en-us/library/hh846313(v=vs.85).aspx) a command line installation isn't just another option though- It is the only way.

Using PowerShell we can eliminate the need to fill out the config.xml by placing the config params in a [hashtable](https://technet.microsoft.com/en-us/library/hh847780.aspx):

{% highlight PowerShell %}
 $Configuration=@{
    PatchLocation="";
    UpdateInstall=$true;
    LicenseKey="";
    SqlServer="";
    CreateDatabase=$true;
    ReportingUrl="http://"+({HOSTNAME.EXE}).Invoke()
            +"/reportserver";
    OrganizationCollation="Latin1_General_CI_AI"; 
    ...
 }
{% endhighlight %}

This allows us to display configuration properties like this `$Configuration.LicenseKey`. 
We can then also set them easily by doing this `$Configuration.CreateDatabase = $false` for example.

From this point, after setting up our `Configuration` object we can write it out to file. 
In our case we did this by storing a minified template config.xml in the PowerShell script and then inserting our hashtable values into the template.

{% highlight PowerShell %}
$template='<CRMSetup><Server><Patch update='+$Configuration.UpdateInstall+'>'+$Configuration.PatchLocation+'</Patch>...'
#Write to current working directory
$template > Join-Path $PWD -ChildPath "config.xml"
{% endhighlight %}

In the example `$Configuration.UpdateInstall` sets a true or false value on whether we should update the CRM installation files.

Once we have generated the file from code we can then call **SetupServer.exe** in the CRM setup directory like this:
{% highlight PowerShell %}
 $setup = Join-Path $CRMSetupFolder -ChildPath "SetupServer.exe"
    if (Test-Path $setup) {
        Start-Process $setup -ArgumentList ("/Q /config " 
            + $ConfigFilePath)    
    }
{% endhighlight %}

`$CRMSetupFolder` being our CRM setup folder. The arguments **/Q** and **/config** are our normal arguments which we pass to [SetupServer](https://technet.microsoft.com/en-us/library/hh699659.aspx) to initiate a silent installation.

The full script code is available as a [github gist here](https://gist.github.com/mziyabo/6c7acb4c80e94d86257b5011311e7957). You can install the script as a module and give it a whirl.

To sum up after installing the module you'd typically make the following set of calls:

{% highlight PowerShell %}
Import-Module [ModuleName]
$config1 = New-SetupConfiguration
# Display default config
$config1.Configuration
# Set config values
$config1.Configuration.PatchLocation="\\Server\CRM\server.msp"
$config1.Configuration.Organization="CRM"
# Write config to file
$configpath="C:\config.xml"
Export-ToFile -OutputFileName $configpath -Configuration $config1.Configuration
# Install CRM
$crmsetupfolder="E:\InstallationFiles\CRM"
Install-CRM -CRMSetupFolder $crmsetupfolder -ConfigFilePath $configpath
{% endhighlight %}

The main aim is taking the pain from the config.xml file and also just technically requiring one file on the server for a silent install. In addition we can validate parameters in the script file and then even invoke this using `PSRemoting`.
