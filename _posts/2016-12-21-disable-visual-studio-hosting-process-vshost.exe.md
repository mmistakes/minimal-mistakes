---
excerpt: Disable the Visual Studio hosting process (vshost.exe) in Visual Studio.
tags: Visual Studio
date: 2016-12-21 10:11:47
categories: Tips
title: Disable Visual Studio hosting process (vshost.exe)

---



I always wondered what is the purposed of the hosting process files (`vshost.exe`) in a modern IDE such as Visual Studio. 
I understand their initial purpose but since the introduction of .NET 2.0 debugging has become much easier and much better supported by the operating system.
I expected them to be obsolete and a left over from the past. 

While reading Rick Strahl's [Visual Studio Debugging and 64 Bit .NET Applications](https://weblog.west-wind.com/posts/2016/Dec/19/Visual-Studio-Debugging-and-64-Bit-NET-Applications) post, I found something very interesting about the hosting process that had completely slipped by me. 
From the [twitter conversation](https://twitter.com/KirillOsenkov/status/809347006049067008) and as [Kirill Osenkov](https://twitter.com/KirillOsenkov) mentions

> old VB zoning feature (never useful), Immediate Window when process is not running, and that's it.

it is indeed a relic of the past. 

There is also an option in Visual Studio to disable the hosting process altogether which I don't why is not there by default.

1. Go to the project's debug options.
1. Deselect the **Enable the Visual Studio hosting process** checkbox.
1. Rebuild the project.
1. Run.

This process doesn't delete the `vshost.exe` files if you already have them but it will not use them anymore. 
Just delete the bin folder before building and running your project.

![Disable Visual Studio hosting process](/assets/images/posts/2016-12-21-disable-visual-studio-hosting-process-vshost.exe.gif "Disable Visual Studio hosting process")
