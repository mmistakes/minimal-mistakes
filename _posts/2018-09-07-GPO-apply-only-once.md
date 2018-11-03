---
Layout: post
classes: wide
title: GPO-Apply only once 
Author_profile: true
Tags: 'Powershell, GPO, Windows 10'
published: true
date: '2018-09-07'
---

Every so often you need a Group Policy (or a part of it) that will be applied just once.
Set a setting and be done with it. I have used this in the past to deploy a scheduled task or quickly deploy an executable to a few computers.
These are all examples of situations where you need the GPO to do his thing once and not more than once.

So recently i had a new problem. Our new models of laptops didn't have a driver to use with a port-replicator.
Since not all branch-offices use a port-replicator, the drivers are not included in our basic image when staging a computer.
For reasons i won't disclose, using SCCM was not an option. So i looked into multiple options.

### 1) Do a manual installation on the device.

Yeah right. I'm not doing that. It's more than 350 computers!
Having said that, i did wanna know if there were commandline-switches added to the setup.
Turns out there was, interesting ... . The first thing i did was to test out if i could install it just manually using these switches.
This seemed to be working really well.

### 2) Powershell baby!

After finding out the setup had commandline-switches, i figured i could try to see if a remote installation via Powershell could work.
I created a script where it would make a remote connection and install the portreplicator software.

```javascript
<#
.NOTES
===========================================================================
    Created on:   	21-08-2018 13:17
    Created by:   	Stroobants Kristof
    Filename:     	Install-USBReplicator.ps1
===========================================================================
.DESCRIPTION
    Perform a remote installation of the USB-Replicator drivers for the HP devices by opening a PS-Session.

.EXAMPLE
    If you want to restart the computer after installation, you have to specify it with the -restartcomputer parameter
    install-USBReplicator -computername XXX -restartcomputer 1
#>
$VerbosePreference = "continue"
Function Install-USBReplicator
{
    PARAM (
        [Parameter(Mandatory = $True, Position = 1)]
        [string]$computername,
    
        [Parameter(Mandatory = $false, Position = 2)]
        [bool]$RestartComputer
    )

    TRY
    {
        IF (Test-Connection -ComputerName "$ComputerName.domain.com" -Count 3)
        {
            TRY
            {
                Write-verbose "Start to copy files!"
                $copy = Copy-Item -Path "\\servername\USBReplicator\sp88800" -Destination "\\$computername.domain.com\c$\windows\temp\" -Recurse -Force -Verbose -PassThru -ErrorAction silentlyContinue
                Write-Verbose "Let's create a remote session on $computername."
                IF ($copy)
                {
                    $session = New-PSSession "$computername.domain.com"
                    Invoke-Command -Session $session -ArgumentList $RestartComputer -ScriptBlock {
                        # THe restart SWITCH-option on the .EXE does not alwyas seem to work. This is why i build in my own parameter.
                        # By default the installation will start WITH the no-restart option
                        IF ($args[0])
                        {
                            & 'c:\windows\temp\sp88800\HP USB-C Universal Dock Installer.exe' /SP- /VERYSILENT /SUPPRESSMSGBOXES /log="C:\ProgramData\COMPANYNAME\WORKSTATIONMANAGEMENT\LOGS\08_USBPortReplicator.txt"                           
                        }
                        ELSE
                        { 
                            & 'c:\windows\temp\sp88800\HP USB-C Universal Dock Installer.exe' /SP- /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /log="C:\ProgramData\COMPANYNAME\WORKSTATIONMANAGEMENT\LOGS\08_USBPortReplicator.txt"
                        }

                    }
                    Write-Verbose "Trigger the remote session that will start the installation."
                    Enter-PSSession -Session $session -ErrorAction Stop
                }
                # wait 20 seconds, just in case and show some feedback to the user
                DO
                {
                    FOR ($i = 0; $i -lt 20; $i++)
                    {
                        Write-host "." -NoNewline -ForegroundColor Yellow
                        sleep -Seconds 1
                    }
                }WHILE ($i -lt 20)
                ""
                Write-Verbose "Installation Finished, closing session."
                Remove-PSSession -Session $session
                # If EXE has no /norestart switch, it SHOULD always restart after installation, but after testing it became clear this does not always work;
                # prolly because the invoke-command and it being run in a different session
                IF ($RestartComputer) {Restart-Computer -ComputerName $computername -Force} 
            }
            CATCH
            {
                $error[0] | fl * -Force
            }
        }
    }
    CATCH
    {
        $error[0] | fl * -Force
    }
}# end function
	
#$pc = read-host "Computername?" 
```

Installing the driver would be as simple as :

```javascript
Install-USBReplicator -computername $pc -RestartComputer 1
```

I figured this option would be my backup option. I had one more idea...

### 3) Use a GPO apply once installation method.

So i have used this in the past. You basically create a **run-once** registry key. This key will be applied on the next boot.
The idea is to create a scheduled task that will be automatically initiated in the late afternoon. Once this task has done its job, it has to self-delete, Mission Impossible style (no explosions tho).
The task itself will silently install the driver & keep a log of what it has done. I figured a logfile might come in handy someday.

The log itself is also one of the available switches. In hindsight, i should have just sticked with the default name, then i could have just used **/log**, but nope, i wanted to control how it was named. If i could choose the name, it would be a lot easier later to find it, if we ever needed it.

If you would just open a command-prompt and use the switches manually, it would not be hard at all. The problem was that i created a scheduled task via the registry.
This made it quite confusing on how my quotes should go. It appeared that the registry interprets certain quotes differently as i intended them to be. Some even seemed to disappear  :-/


So after a lot of trials and **errors** (especially those), i got that to work. 

![gpo]({{site.baseurl}}/assets/images/GPOapplyOnce/1.png)

<span style="font-size:10px;color:gray">Please note that you can right-click on an image an see it in a new tab, this way you see its full format.</span>

Notice that i removed the spaces in the executables name. This was causing issues and removing them was the fastest solution.

While testing this, i had multiple devices at hand but after a while i ran out of "blank" devices where the GPO did not run on.
I could have just edited the GPO to not only run once during testing, but what fun would that be?

So i digged a little deeper into Group Policy. Turns out that when you create a "task" in a GPO, like say copying a file, it creates a XML where it keeps track of all your chosen options.

![gpo]({{site.baseurl}}/assets/images/GPOapplyOnce/2.png)

<span style="font-size:10px;color:gray">Please note that you can right-click on an image an see it in a new tab, this way you see its full format.</span>

One of those options is called **FilterRunOnce ID**. This ID is stored in the computers registry.  

![gpo]({{site.baseurl}}/assets/images/GPOapplyOnce/3.png)

<span style="font-size:10px;color:gray">Please note that you can right-click on an image an see it in a new tab, this way you see its full format.</span>

By storing this value into the registry, it knows not to apply this part of the group policy again.
If you were to remove this key, it would get re-applied once more.

![gpo]({{site.baseurl}}/assets/images/GPOapplyOnce/4.png)

<span style="font-size:10px;color:gray">Please note that you can right-click on an image an see it in a new tab, this way you see its full format.</span>

Knowing this might be useful in later endeavors. This is why i chose to share it here.
Maybe someone else was wondering how this worked...

Funny how installing a simple driver can lead into more insight of the inner workings of Group Policy :-)
