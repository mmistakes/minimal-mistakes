---
Layout: post
title: Logon/logoff - lock/unlock viewer
Author_profile: true
Tags: 'Powershell, Eventlogs'
Date: '2017-01-01'
published: true
comments: true
---

The goal of this script was to have a way where we could see how many times a computer was rebooted.
This was a necessity due to problems we had with SCCM. People were keeping their computers powered-on all the time which led to unupdated software and clients. 

Yes you could push the forced reboot/shutdown via GPO, but that wasn't a call management was willing to make. 

This script was made so that we could prove the computer wasn't being reset enough. Later on i added the possibility to see when a user locks or unlocks his/her windows session, just because, well why the hell not right? It was a fun challenge.

Resources that were used during the creation of this script:

 - [http://superuser.com/questions/528884/in-windows-7-how-to-query-times-when-the-computer-was-locked](http://superuser.com/questions/528884/in-windows-7-how-to-query-times-when-the-computer-was-locked)
 - [https://technet.microsoft.com/en-us/library/dn311470(v=ws.11).aspx](https://technet.microsoft.com/en-us/library/dn311470(v=ws.11).aspx)
 - [https://blogs.technet.microsoft.com/asiasupp/2010/12/14/secpol-cant-detect-the-audit-policys-change-that-modified-through-auditpol-command/](https://technet.microsoft.com/en-us/library/dn311470(v=ws.11).aspx)

So the logging of locks and unlocks isn't standard policy. You have to activate it yourself, otherwise these events aren't logged.

This means that you either activate this on the machine (manually) or through GPO.
Since we only wanted to have this on certain machines, i implemented a way in my script to activate it remotely.

```powershell 
$settings = @("logon","logoff"," Other Logon/Logoff Events"," Account Lockout")
foreach($setting in $settings)
{
	$check =  &psexec \\$Computer auditpol /get /subcategory:"$setting"
	sleep 2

	if($check -like "*completed*"){	
		Write-host "Auditpol-setting ""$setting"" was already correctly applied." -ForegroundColor Yellow
		sleep 2
	}else{
	   &psexec \\$Computer auditpol /set /subcategory:"$setting" /success:enable /failure:enable
		Write-host "Auditpol-setting ""$setting"" was installed just now. From now on, lock/unlock events will be saved to the logfile." -ForegroundColor Yellow
		sleep 5
	}
}#end foreach
```
With the use of [PSexec](https://technet.microsoft.com/en-us/sysinternals/bb897553.aspx) in combination of [AuditPol](https://technet.microsoft.com/nl-nl/library/cc731451%28v=ws.10%29.aspx) i was able to activate this via the script.

Next step was retrieving only the log files we needed, so that the process would be as smooth as possible.
```powershell
$ELogs = Get-WinEvent -ComputerName $computer -FilterHashTable @{LogName = "system"; ID = 7001,7002,6005,6006;StartTime = $date; }
```
FilterHashTable was the fastest way i found of doing this kind of sorting.
After that we loop through the \$Elogs with a foreach-loop. In each \$log sits the following date for each event matching our ID's.

```javascript
TimeCreated  : 23-08-2016 9:17:04
ProviderName : Microsoft-Windows-Winlogon
Id           : 7001
Message      : Melding van gebruikersafmelding voor het Programma voor verbeter
               ing van klantervaringen
```

So this holds some data, but we can't reach everything we need, so now we convert our \$log to XML, because there is more data than that we can see now.
```powershell
  $eventXML = [xml]$Log.ToXml()
```
If you were to print out \$eventXML you would see "Event".
So after some digging, googling and a bit of luck, i found most of my needed data resided in :

```powershell
  $eventXML.Event.EventData.Data
```

This holds 2 values and sits in an array. So we can access these values easily with [0] or [1]. The SSID sits in the second one [1]. But we want readable data so i found this trick where you can translate an SSID into a SamAccountName. 
```powershell
$objSID = New-Object System.Security.Principal.SecurityIdentifier("$sid")
$objUser = $objSID.Translate( [System.Security.Principal.NTAccount])
$user = $objUser.Value
write-host $user -ForegroundColor Magenta
```

So now we have all the data that we need, all that remains is to store it somewhere.
We'll create a custom object (array) in which we'll add all data.

```powershell
##create hashtable "result" with keys and values
$Result += New-Object PSObject -Property @{
	Computer = $log.MachineName
	Time = $Log.TimeCreated
	EventId = $Log.Id
   'Event Type' = $ET
	user = $user
	sid = $objSID
	message = $log.Message
}
```
We would apply the same principles on the other events (lock-unlocks).
When the script ran through all its events, it would then show it in a out-gridview.

``` powershell
$Result | Select-Object Computer, Time, EventId, "Event Type", User, SID, Message | Sort-Object Time -Descending | Out-GridView
```

Of course you could export it into a CSV or whatever form you'd like.

The script itself can be found in the repository : [Get_LogonEventViewer](https://github.com/CookieCrumbles/Get_LogonEventviewer)

Note: If you run this script, you should run it as an administrator
