---
title: Parse TOPdesk Access Logs with PowerShell
tags:
- PowerShell
- Access Logs
- TOPdesk
classes: wide
---

Do you know who has logged into your TOPdesk environment? Did you know that TOPdesk offers you access logs? Unfortunately the process to access these is rather cumbersome. Manually downloading and reviewing the Access Logs would take too long. Let's use PowerShell to help us improve our log review process.

### Setup

Before we can begin downloading any access logs we need to ensure that we have read permissions for Access Logs.

*Note: You don't need ALL of these permissions, this post only requires you to have accesslogs access.*

![WebDAVPerms]({{ "/assets/td-webdav.png" | absolute_url}})

Once permissions are set let's create a `PSDrive`.

```

$credential = Get-Credential -Message 'enter TOPdesk credentials.'

# Splat our parameters
$psDriveParams = @{
    PSProvider = 'FileSystem'
    Root = '\\company.topdesk.net@SSL\webdav' # ex: '\\contoso.topdesk.net@SSL\webdav'
    Credential = $credential
    Name = 'TOPdesk'
}

New-PSDrive @psDriveParams

Set-Location TOPdesk:\accesslogs

```

### Download zip containing logs

If you run `Get-ChildItem` you will notice that there is a folder created for each month. Inside each folder there are access logs for each day.

```

Get-ChildItem TOPdesk:\accesslogs\2019-02


    Directory: \\company.topdesk.net@SSL\webdav\accesslogs\2019-02


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         2/6/2019   6:25 AM           1482 access_log.2019-02-05_0.log.zip
-a----         2/5/2019   1:33 AM           1629 access_log.2019-02-04_0.log.zip
-a----         2/4/2019   1:05 AM            757 access_log.2019-02-03_0.log.zip
-a----         2/3/2019  12:13 AM           1046 access_log.2019-02-01_0.log.zip

```

For simplicity, we can use Copy-Item to download our file

```

# folder where we want to copy the access log zip
$Directory = 'c:\delete'

# Lets select that most recent access log
$File = Get-Childitem TOPdesk:\accesslogs\2019-02 |
    sort-object lastwritetime |
    Select -Last 1

# Copy File, save to variable so we can interact with our local file later
$newFile = Copy-Item $File $Directory -Passthru
```

Now we have a copy of our access logs locally! It's a compressed file, so we need to expand it. We can use the `Expand-Archive` command to extract the contents.

```

Expand-Archive -Path $newfile.fullname -DestinationPath $Directory

# Let's clean up the zip file since we have the log now.
Remove-Item $NewFile

# Put the newly created file into a variable
# The name of the log is that same as $Newfile, we just need to remove the .zip from the end.
$LogFile = Get-Item -Path ($newfile.fullname).replace('.zip','')

# we can view the contents of the file
Get-Content $LogFile
```

### Parse Access Log and create report

If you have been following along, then you can tell that this log isn't the best and it needs to be parsed further. `PowerShell` to the rescue!

Let's write a script that will create a log that is much easier to read.

* Determine if User authenticated to `/tas/secure` (operator login) or `/tas/public` (person login)
* Determine if Saml or TOPdesk authenticated the login
* Grab Username
* Grab Time
* Output an object

Each line of the log file corresponds to a request. We will be able to throw all of the content into a variable and then `foreach` through them all. Let's give it a shot.

### Finally

This is a gist showing how to return objects for yesterdays access log file. I would NOT use this as a finsihed product. Go through it one time and then wrap it up in a script that meets your needs. For a cleaner implementation please see the [`TOPdeskPS` module](https://github.com/andrewpla/topdeskps)


<script src="https://gist.github.com/AndrewPla/23080ccc157a82a750f48a629914ddc5.js"></script>

### Resources

* [https://blogs.msdn.microsoft.com/powershell/2019/01/18/parsing-text-with-powershell-1-3/](https://blogs.msdn.microsoft.com/powershell/2019/01/18/parsing-text-with-powershell-1-3/)
