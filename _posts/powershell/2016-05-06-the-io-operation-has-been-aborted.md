---
excerpt: Troubleshooting the I/O operation has been aborted
header:
  overlay_image: /assets/images/posts/powershell/2016-05-06-the-io-operation-has-been-aborted.jpg
tags: PowerShell
date: 2016-05-06 10:55:34
categories: Tips
title: The I/O operation has been aborted..

---



A couple of days ago I run into this PowerShell error while executing very lengthy operations remote script blocks.

> The I/O operation has been aborted because of either a thread exit or an application request. For more information, see the **about_Remote_Troubleshooting** Help topic. 

At first I suspected the stability of the session and I wanted to understand what caused the problem to refactor my code base.

While investigating the issue on [about_Remote_Troubleshooting] (https://technet.microsoft.com/en-us/library/hh847850.aspx?f=255&MSPPError=-2147217396) and on Google, I kept reading about timeouts. I also read about the maximum memory size that the process of **wsmprovhost.exe** is allowed to consume.

I tried simulating these problems to determine the conditions that led to this error. So I tried, timeouts and terminating the process of **wsmprovhost.exe** in a variety of methods but in every case I could not get this error. Actually, PowerShell was amazing on trying to reconnect with warning messages. 

Finally, I attempted a restart while a PowerShell block was executing remotely. Then I got this error.

It turns out that stopping the **winrm** service will cause exactly this error. The restart was just the trigger.

While investigating this issue, I watched what happens in the remote server while one or many script blocks are executed remotely on this server.
I experimented with `Invoke-Command` using a computer name or just a session. 
In all cases, the process lifetime on the server matched what was happening on the client.


