---
title: Downloading TOPdesk Database Backups with PowerShell
tags:
- PowerShell
- Invoke-WebRequest
- PSDrive
- TOPdesk
classes: wide
---

# Downloading TOPdesk Database Backups with PowerShell

We are going to learn how to backup the TOPdesk database using PowerShell. By default TOPdesk takes a full backup daily and keeps it for 3 days. I want to take my own backups and keep them for longer.

## Setup

Before you will be able to interact with folders you will need to ensure that you have the appropriate permissions. The TOPdesk account that you use will need the relevant permissions. All of these commands are being run in a SAAS version of TOPdesk.

![WebDAVPerms]({{ "/assets/td-webdav.png" | absolute_url}})

## Map WebDAV as a PSDrive

We are going to map the webdav share as a `psdrive`. It's important that we append `@SSL` topdesk url and we need to use UNC format. Creating a PSDrive allows for easy navigation.

```powershell
$Credential = Get-Credential -Message 'Please enter in TOPdesk Operator Credentials'

$psDriveParams = @{
    PSProvider = 'FileSystem'
    Root = '\\topdeskurl@SSL\webdav' # ex: '\\contoso.topdesk.net@SSL\webdav'
    Credential = $Credential
    Name = 'TOPdesk'
}

New-PSDrive @psDriveParams
```

Now we have access to a `PSDrive` named TOPdesk. It is a drive, so we would access it as such.

```
Get-ChildItem TOPdesk:\

    Directory: \\company.topdesk.net@SSL\webdav


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
da----        12/31/1600  7:00 PM                .
da----        12/31/1600  7:00 PM                ..
d-----        12/31/1600  7:00 PM                accesslogs
d-----        12/31/1600  7:00 PM                csvexport
d-----        12/31/1600  7:00 PM                database_backup
d-----        12/31/1600  7:00 PM                import
d-----        12/31/1600  7:00 PM                photos
d-----        12/31/1600  7:00 PM                topsis
d-----        12/31/1600  7:00 PM                upload
d-----        12/31/1600  7:00 PM                web
```

## Download Database Backup

By default, TOPdesk only keeps a backup for 3 days. TOPdesk continuously creates transaction backups for SaaS environments, which are `.trn` files. I prefer using the `.bak` file that is created daily that contains a full backup of the TOPdesk database.

### Using Copy-Item

Houston, we have a (small) problem!

```
$file = Get-ChildItem TOPdesk:\database_backup -filter *.bak |
 Sort-Object LastWriteTime |
 Select-Object -last 1

Copy-Item $file.fullname -Destination c:\path\to\folder

Copy-Item : The file size exceeds the limit allowed and cannot be saved.
At line:1 char:1
+ Copy-Item $file.FullName -Destination c:\delete
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [Copy-Item], IOException
    + FullyQualifiedErrorId : System.IO.IOException,Microsoft.PowerShell.Commands.CopyItemCommand
```

Looks like our file is too large.

### Finally

I want to add this command to my `TOPdeskPS` module. This module is cross-platform, so I want to choose a method that works on BOTH PS Core and Windows PowerShell.

I will use `[System.Net.WebClient]` as I will be able to access it from both. Let's give it a shot!

### Gist

<script src="https://gist.github.com/AndrewPla/22aced2413e91d15a449c59c021d7176.js"></script>
