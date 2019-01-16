---
layout: post
title: NicolTIP#030- How to disable Direct Access via Powershell
date: 2013-11-14 01:51
author: nicold
comments: true
categories: [networking, NicolTIP, powershell, Script, Uncategorized, Windows 8, windows 8.1]
---
in order to disable Direct Access on Windows 8.1, you can run the following powershell script (as administrator)
<blockquote><span style="font-family: Courier New">remove-itemproperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient" -name DnsPolicyConfig
Net stop iphlpsvc /y
Net start iphlpsvc
ipconfig /flushdns</span>

<span style="font-family: Courier New">Write-Host ""
Write-Host "Press any key to continue ..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")</span></blockquote>
