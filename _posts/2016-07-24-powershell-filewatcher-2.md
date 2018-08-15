---
title: "PowerShell FileWatcher 2"
description: ""
category: PowerShell
tags: PowerShell, Utilities, Eventing
---


There is a neccesity to watching or observation particularily for a developer. 
An example is during debugging.

PowerShell and .NET have mechanisims to allow us to watch or subscribe to events. We can then perform whatever desired actions in response to those events.

In PowerShell eventing hinges primarily on the following cmdlets `Register-EventObject`, `Get-EventSubscriber` and job cmdlets like `Get-Job` and `Receive-Job`. In .NET the `System.IO.FileSystemWatcher` class allows applications to watch for these events Changed, Created, Deleted, Error and Renamed on files and directories.

And due to the .NET framework going open source this classes implementation is available on [.NET Reference Source]("https://referencesource.microsoft.com/") and Github. In case you want to modify or follow the same pattern.

In order to watch a directory or file and subscribe to .NET events on the `System.IO.FileSystemWatcher` class we use `Register-ObjectEvent` as below:

{% highlight PowerShell %}
$fileLocation=(Join-Path $HOME "Desktop");
$filePattern="*.csv";

#Declare action to move *.csv file to a data folder.
$action = 
{
  mv args[1].FullPath (Join-Path $HOME "Desktop\Data");
  return gci (Join-Path $HOME ("Desktop\Data\" + args[1].Name));
} 

# Create file watcher for *.csv files placed on the desktop. 
$fileWatcher=[System.IO.FileSystemWatcher]::new($fileLocation,$filePattern);

# Start file watcher.
Register-ObjectEvent -InputObject $fileWatcher -EventName "Created" -SourceIdentifier "*.csv watcher" -Action $action;
{% endhighlight %}

When our event fires, code passed within the  -Action parameter is executed. 
The action could be anything like sending an email notification. In this case we are moving all *.csv files placed on the desktop to a data folder.



Tracing or tracking of jobs and or subscriptions is done using the `Get-Job` and `Receive-Job` cmdlets.


{% highlight PowerShell %}
# Return a PSEventJob representing the File Watching Job created above.
Get-Job "*.csv watcher"

# Return the results of the -Action script-block passed into Register-ObjectEvent.
[System.IO.FileInfo]$actionResult =
$Get-Job "*.csv watcher" | select -First 1 | Receive-Job -Keep
{% endhighlight %}

Note the `Receive-Job` cmdlet lets us return the `System.IO.FileInfo` object for us to use as an argument to other actions. 
The `System.IO.FileInfo` object is the result of this line in our example code:

{% highlight PowerShell %}
return gci Join-Path $HOME -ChildPath ("Desktop\Data\" + args[1].Name)
{% endhighlight %}

Other job and event control cmdlets are available in PowerShell like Wait-Event, and Unregister-Event.
Furthermore details of the subscription are accessible through `Get-EventSubscriber`.
You can run `man Register-ObjectEvent` for more detail on this or any of the other cmdlets.  

Ultimately because we are subscribing to .NET events we can also use a class like `System.Management.ManagementEventWatcher` to get management events from the operating system.