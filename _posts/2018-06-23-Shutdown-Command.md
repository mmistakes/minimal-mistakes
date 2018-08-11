---
title:  "Shutdown Command in Windows"
categories: commands
description: Shutdown command in Windows Cmd/Run/Powershell
tag: 
    - cmd
    - windows
---

We always use the _Start Menu_ for shutting down. What if we could run a command to shutdown the computer.  

Its as simple as running the command `shutdown`.  

The `shutdown` command comes with support for multiple parameters. If you just execute the command `shutdown`, it will display the help menu for the command.

You could run it from either `Command Prompt`, `Run (WinKey + R)` or `Powershell`.

Various useful shutdown commands are :

  
* Shutting down the computer

``` 
shutdown -s
```

-------------------------

* Forcefully Shutting down the computer

``` 
shutdown -s -f
```

_Note: You will lose any unsaved data_

-------------------------

* Setting a timer to Shutdown

``` 
shutdown -s -t 60
```

_Note: The time is specified in seconds. If not specified, the default time is 30 secs_

This is helpful if you are watching a video and is not sure if you would have fallen asleep by the end of the video.  
Just run the command : `shutdown -s -f -t <<time-left * 60>>`

-------------------------

* Logging off

``` 
shutdown -l
```

-------------------------

* Aborting a shutdown

``` 
shutdown -a
```

-------------------------

> Reference : [Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/shutdown)