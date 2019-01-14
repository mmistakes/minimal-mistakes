---
title: NicolTIP#026: How to fix poor network performance connecting with windows 2008/R2 in Remote Desktop and File Share
date: 2011-05-26 15:51
tags: [Netsh, NicolTIP, remote desktop, SOHO, windows 2008, windows 2008 R2, Windows 2008R2]
---
<p>Remote Desktop 6.0 leverages a new feature called auto-tuning for the TCP/IP receive window that could be causing the trouble. Window Auto-Tuning could have issues on some networks, and cheap SOHO routers. I fixed typing the following command on the server I was not able to connect:</p>  <p><strong>netsh interface tcp set global autotuninglevel=</strong><strong>highlyrestricted</strong> </p>  <p>after this I <strong><font color="#ff0000">rebooted</font></strong> the server and I was able to work again.</p>  <p><a title="http://blog.tmcnet.com/blog/tom-keating/microsoft/remote-desktop-slow-problem-solved.asp" href="http://blog.tmcnet.com/blog/tom-keating/microsoft/remote-desktop-slow-problem-solved.asp">http://blog.tmcnet.com/blog/tom-keating/microsoft/remote-desktop-slow-problem-solved.asp</a></p>
