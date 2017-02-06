---
excerpt: Windows 10 wakes up unexpectly. What is the reason and how can you stop it?
header:
  overlay_image: /assets/images/posts/2016-05-14-windows-stop-unwanted-wakeup.jpg
tags: PowerShell
date: 2016-05-14 17:40:03
categories: Tips
title: Windows 10 stop unwanted wake up and boots

---



I'm one of those that his **Windows 10** operating system often boots the computer in the middle of the night. 
In my case that happens around 3am during the night and I find it very annoying. 

As far as I know, Microsoft wants our Windows 10s to update as quick as possible, so they made the OS boot in the middle of the night to execute the **Windows Update**.
They also want to spread the pressure to the network and not sure but also use each desktop as a network share for the updates, that is something like p2p client. 
The ideas are good but the the implementation is terrible for the following reasons in sequence of importance.
 
1. There is no user consensus. I'm sorry Microsoft but people who make experience related decisions often fail to understand users. 
They are very aggressive and seems they don't think much of the power users. How is it possible that advanced users would not notice and complain? I'll discuss more about this in a future post.   
1. When windows update is set to **notify to schedule restart** nothing will happen automatically. So it really cancels the intention and the result is a computer that wastes energy until you wake up in the morning. 
Maybe you get the network spread and p2p client but that just moves the responsibility from Microsoft to my very own utilities. Its not that big of an expense, but I should at least have an opinion about it.  
In my case, if I don't notice when I wake then the computers wastes energy until I return from work. And I really don't want to think computers when I wake up.

At the beginning you really think something is broken. 
First suggestion is to check why the computer woke up and the OS booted with this command `powercfg -lastwake`. 
Please note that `powercfg` requires a command prompt with administrator rights.

    C:\WINDOWS\system32>powercfg -lastwake
    Wake History Count - 1
    Wake History [0]
    Wake Source Count - 0

The output doesn't help much but over time I've learned that a scheduled task was the trigger. Lets verify this with `powercfg -waketimers`. 

    C:\WINDOWS\system32>powercfg -waketimers
    Timer set by [SERVICE] \Device\HarddiskVolume3\Windows\System32\svchost.exe (SystemEventsBroker) expires at 18:14:30 on 14/05/2016.
    Reason: Windows will execute 'NT TASK\Microsoft\Windows\UpdateOrchestrator\Reboot' scheduled task that requested waking the computer. 
 
 Honestly, up until Windows 10 and facing this issue, I didn't know that a scheduled task could boot my computer. 
 To stop the madness
 
 1. Open the **Task Scheduler** 
 1. Locate the task
 1. Disable it.
  
 Unfortunately after some time you will notice again that your computer boots and the task is re-enabled.
 It seems that Windows 10 periodically checks the status of this task and enables it again without the user consensus. 
 
 What can be do? Of coarse take ownership and automate. using PowerShell. All following commands require administrator rights.
 `Get-ScheduledTask` cmdlet returns all scheduled tasks. The ones that can wake up the computer have the property `.Settings.WakeToRun` with value `$true`. 
 So the following can find all with the potential to wake up your computer.
 
 ```powershell
 Get-ScheduledTask | ? {$_.Settings.WakeToRun}
 ```
 
 Personally I don't care which exact task is going to wake up my computer. I don't want the computer to wake up without my explicit permission so I disable them all with a script that implements these steps:
 
 1. Get all task that can wake up the computer and are enabled. 
 1. Set the property `.Settings.WakeToRun` to `$false`.
 1. Save
  
 ```powershell
 Get-ScheduledTask | ? {$_.Settings.WakeToRun -eq $true -and $_.State -ne "Disabled"} | % {$_.Settings.WakeToRun = $false; Set-ScheduledTask $_}
 ```
 If you desire, create a scheduled task that runs the script so you might get one step ahead of Windows 10 pro activeness. 
 But it doesn't always work, unless you set it to run every hour. Therefore I don't do it.
 
 Since I mentioned `powercfg` another useful command is `powercfg -devicequery wake_armed`. This returns all devices that can wake up your computer.
  
    C:\WINDOWS\system32>powercfg -devicequery wake_armed
    Realtek PCIe GBE Family Controller
    HID Keyboard Device (002)
    HID-compliant mouse (001)

I use the mouse click to invoke a computer boot just because it is more convenient with the layout of my office.
