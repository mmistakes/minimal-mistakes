---
title: "PowerShell FileWatcher"
description: ""
category: PowerShell
tags: PowerShell, Utilities
---


We recently had to migrate data in the form of some flat-files between two systems. As is often the case some transformation of the flat-file was required before loading into the destination system.

The transformed file would be moved into an output folder triggering a migration process, via a simple .exe, that wrote the flat-file contents to our destination system. 

The first part was accepting a few parameters into the script of which the main thing was declaring a script-block parameter that would be the action we execute in response to finding a file matching our filter criteria. 

For the script-block parameter which we named `$FileFoundAction` you would then pass in something like this:
{% highlight PowerShell %}
{ #Encrypt the File upon Creation in the Target Folder.
  [Sytem.IO.FileInfo]::new($args[0]).Encrypt(); }
{% endhighlight %}

Where `$args[0]` would be the Full Path to the file that has just been dumped in the folder we are watching.

A while block would then run until a break was detected. Inside the block we’d poll our directory for files matching `$FilePattern` regex. Waiting for an equivalent of the `$PollingIntervalMin` between checks to the directory.

{% highlight PowerShell %}
#Poll Directory Indefinitely
while ($true){
  #Create tab separated list of files found in our directory.     
  $fileString=[string]::Empty
  ls $FileDirectory -Filter $FilePattern | %{
	$fileString = $fileString + ($_.Name+"`t")};
    
  foreach ($fileName in $fileString.Split("`t")){
      #Check if is new and/or non-empty FileName
      if ($existingFileString.Contains($fileName) -eq $false -and
		 $fileName -ne [string]::Empty)
      {
         #File is Newly Created.
         Write-Host ('Match Found:' + $fileName)
         #Add File to ExistingFileString.
         $existingFileString = ($existingFileString + $fileName
		 + '`t')  
         #Invoke any ScriptBlocks on the File.
         if($FileFoundAction -ne $null)
         {
             $path=[string]::Concat($FileDirectory,$fileName)
             [object[]]$arguments = [string]$path
             $session = New-PSSession
             Invoke-Command  -ScriptBlock $FileFoundAction 
		-ArgumentList -Session $session ($path) -AsJob
         }
      }
  }
  #Wait for Duration equal to PollingInterval.
  Start-Sleep -Milliseconds ($PollingIntervalMin * 60 * 1000)
}
{% endhighlight %}

The more complicated bit however was invoking the script-block and not blocking the polling operation.
In this case, we settled for invoking the script-block As-Job and running it in another PSSession.

{% highlight PowerShell %}
$session = New-PSSession
Invoke-Command  -ScriptBlock $FileFoundAction -Session $session -ArgumentList ($path) -AsJob
{% endhighlight %}

This meant though that we'd have to run the script as admin because of the `New-PSSession` we had created and then check our jobs using the `Get-Job` cmdlet.    

Needless to say this created a wicked problem because we were going to dump a couple hundred files maybe a thousand thereby creating a lot of sessions and jobs that we would have to monitor. 

We also observed that memory usage really shot up for a few sessions. As an aside I don't think this is a PowerShell issue rather our script-block invoked code that loaded some large objects into memory.

### Conclusion:

In the end this would work for what it's designed to do which is looking for new files added to a folder and triggering a simple action.
But the solution wouldn’t scale well. 

After some digging around we used another solution which came out the PowerShell box as far back as version 3.1 actually. 
Check [Part 2 of this Post](https://mziyabo.github.io/powershell/2016/07/24/powershell-filewatcher-2) for this solution.

Full code for the script used here is available at this link: [FileWatcher](https://gist.github.com/mziyabo/aa686a0c1d9dd22d1d9ce4be9ad080a0)
