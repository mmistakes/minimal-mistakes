---
excerpt: Modify the windows network hosts entries with Powershell.
tags: Powershell
date: 2016-09-15 11:15:26
categories: Tips
title: Modify windows network hosts entries with pshosts

---



Most of us know how to workaround dns issues by editing the `C:\Windows\System32\drivers\etc\hosts` file.

The problem, if one can consider it as such, is that you need to

1. Start notepad or any editor in administrator mode
1. Browse to C:\Windows\System32\drivers\etc if you remember it
1. Change the file filter to all files to show files without extensions
1. Chose the file `hosts`
1. Add the line
1. Save

For most people that is fine but there is an alternative especially if you do this often.

Lets see how you can quickly solve a dns host e.g `dns.example.com` that is not resolving with an ip `10.10.10.10` that you know already. 
This is a temporary requirement and can be required because of DNS synch issues but the example is as equally good if you want to override the IP resolution of any dns entry. 

## Local execution

First install Powershell module [PsHosts](http://www.powershellgallery.com/packages/PsHosts/)

```powershell 
Install-Module PSHosts -Scope CurrentUser -Force
```

For every line you would add above in the hosts file execute 

```powershell
#With comment
Set-HostEntry -Name dns.example.com -Address 10.10.10.10 -Comment "Workaround for DNS synch issues" -Enabled $true
#Without a comment
Set-HostEntry -Name dns.example.com -Address 10.10.10.10 -Enabled $true
```

To get a list of modified host entries
```powershell
Get-HostEntry
```

In my case the above entry is work around so I need to remove it or disable it soon.

```powershell 
Disable-HostEntry -Name dns.example.com
```
or 

```powershell
Remove-HostEntry -Name dns.example.com
```

## Remote execution

If you want to do this on a couple of computers e.g. Server1 to Server10 then this is how you do it

Make sure the module is installed on all servers. This is a one time action.

```powershell
$computers=@(
    "Server1"
#   "ServerX"
    "Server10"
)

Invoke-Command -ComputerName $computers -ScriptBlock {Install-Module PSHosts -Scope CurrentUser -Force}
```

And then depending on each step execute

```powershell
# Add the entry with a comment
Invoke-Command -ComputerName $computers -ScriptBlock {Install-Module PSHosts -Scope CurrentUser -Force}

# Disable the entry
Invoke-Command -ComputerName $computers -ScriptBlock {Disable-HostEntry -Name dns.example.com}# Remove the entry

# Remove the entry
Invoke-Command -ComputerName $computers -ScriptBlock {Remove-HostEntry -Name dns.example.com}# Remove the entry
```

## Advanced

There is more into the powershell module where you can mark entries with special values. 
You can query them and potential pipe them to a disable/enable or remove. 
You can use such a trick as a toggle on/off script.
