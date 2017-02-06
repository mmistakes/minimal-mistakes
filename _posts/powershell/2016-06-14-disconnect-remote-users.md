---
excerpt: Find logged on users on remote computers. Create a script to disconnect your user from each computer.
tags: PowerShell
date: 2016-06-14 11:38:05
categories: Tips
title: disconnect remote users

---



Where I work we have a password policy that enforces us periodical change of passwords. After my last change, I noticed that after the morning standup I would find my account locked.
First I thought this was a onetime glitch or I mistyped my password a couple of times triggering the lock policy. But today it happened again exactly after the same meeting and I had do to something.

After some discussions with some colleagues, I was informed that this happens when I've forgotten to log out from some servers and to fix this I need to explicitly log off from them.

I searched about this subject and first conclusion is that you can't easily find all computers that I'm logged in. 
Active directory doesn't support this and a few people have suggested some scripts that simulate the same feature. For more information please read this [Script to check what machine a user is logged into?](https://www.reddit.com/r/PowerShell/comments/23rk66/script_to_check_what_machine_a_user_is_logged_into/).

Having accepted that I need to hard code the list of computers, I searched for some PowerShell scripts or modules or cmdlets that can scan a computer for any user session and then disconnect.
While searching I found various implementation but most looked. The most recent and relevant entries for what I need are from [Jaap Brasser](https://social.technet.microsoft.com/profile/jaap%20brasser/) which helped my understand the tooling required:

- [Get-LoggedOnUser](https://gallery.technet.microsoft.com/scriptcenter/Get-LoggedOnUser-Gathers-7cbe93ea)
- [Disconnect-LoggedOnUser](https://gallery.technet.microsoft.com/scriptcenter/Disconnect-LoggedOnUser-116ea40c)

From everything I've read here are some tips

To query a computer for all sessions execute `quser /server:server01`. To further limit the query to your user then execute `quser username /server:meculab12001`. 
If there are no users logged in then it will return this error

> No User exists for *

`quser` generate a not very PowerShell output but this script block can format it's output for an array of computers
```powershell
@("server01","server02") | ForEach-Object {
        $computerName=$_
        $items=quser $env:USERNAME /server:$computerName |Select-Object -Skip 1 |ForEach-Object { $_.Trim() -Replace '\s+',' ' -Split '\s' }
        if($items)
        {        
            $newSession = New-Object System.Object
            $newSession | Add-Member -type NoteProperty -name User -value $items[0]
            $newSession | Add-Member -type NoteProperty -name ComputerName -value $computerName
            $newSession | Add-Member -type NoteProperty -name ID -value $items[1]
            $newSession
        }
    }
```

Each session has an identifier `ID` which is required by `rwinsta` to disconnect it. For example. to disconnect a session with ID `1` on `server01` execute `rwinsta 1 /server:server01`.

I've combined the above in a PowerShell script [gist](https://gist.github.com/Sarafian/8c51a63ebbc465be3df53cd04855769a) `Disconnect-RemoteSessions.ps1` that does:

1. Scans remote computers for sessions based on the current user (`$env:USERNAME`).
1. Generate an array with the session id and the computerName.
1. Disconnect each session.

{% gist Sarafian/8c51a63ebbc465be3df53cd04855769a %}


# An altenative implementation

While searching, I've also found a script from [mjolinor](http://stackoverflow.com/users/574168/mjolinor) in [Powershell script to see currently logged in users (domain and machine) + status (active, idle, away)](http://stackoverflow.com/questions/23219718/powershell-script-to-see-currently-logged-in-users-domain-and-machine-status).
I modified a bit his script and created also this

```powershell
function Get-LoggedOnUser { 
    param(
        [Parameter(Mandatory=$true, 
                   ValueFromPipeline=$true,
                   ValueFromPipelineByPropertyName=$true)]
        [string]$ComputerName
    )
 
    BEGIN{
    }

    PROCESS{
        

        #mjolinor 3/17/10 
 
        $regexa = '.+Domain="(.+)",Name="(.+)"$' 
        $regexd = '.+LogonId="(\d+)"$' 
 
        $logontype = @{ 
            "0"="Local System" 
            "2"="Interactive" #(Local logon) 
            "3"="Network" # (Remote logon) 
            "4"="Batch" # (Scheduled task) 
            "5"="Service" # (Service account logon) 
            "7"="Unlock" #(Screen saver) 
            "8"="NetworkCleartext" # (Cleartext network logon) 
            "9"="NewCredentials" #(RunAs using alternate credentials) 
            "10"="RemoteInteractive" #(RDP\TS\RemoteAssistance) 
            "11"="CachedInteractive" #(Local w\cached credentials) 
        } 
 
        $logon_sessions = @(gwmi win32_logonsession -ComputerName $ComputerName) 
        $logon_users = @(gwmi win32_loggedonuser -ComputerName $ComputerName) 
 
        $session_user = @{} 
 
        $logon_users |% { 
            $_.antecedent -match $regexa > $nul 
            $username = $matches[1] + "\" + $matches[2] 
            $_.dependent -match $regexd > $nul 
            $session = $matches[1] 
            $session_user[$session] += $username 
        } 
 
 
        $logon_sessions |%{ 
            $starttime = [management.managementdatetimeconverter]::todatetime($_.starttime) 
 
            $loggedonuser = New-Object -TypeName psobject 
            $loggedonuser | Add-Member -MemberType NoteProperty -Name "Session" -Value $_.logonid 
            $loggedonuser | Add-Member -MemberType NoteProperty -Name "User" -Value $session_user[$_.logonid] 
            $loggedonuser | Add-Member -MemberType NoteProperty -Name "Type" -Value $logontype[$_.logontype.tostring()] 
            $loggedonuser | Add-Member -MemberType NoteProperty -Name "Auth" -Value $_.authenticationpackage 
            $loggedonuser | Add-Member -MemberType NoteProperty -Name "StartTime" -Value $starttime 
            $loggedonuser | Add-Member -MemberType NoteProperty -Name "ComputerName" -Value $ComputerName 
 
            $loggedonuser 
        } 
    }

    END{
    }
}
```
