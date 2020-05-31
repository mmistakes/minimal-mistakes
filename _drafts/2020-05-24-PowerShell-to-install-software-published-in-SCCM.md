---
layout: single
title: "PowerShell to install software published in SCCM"
excerpt: "Install SCCM Software's and updates using Powershell"
date: 2020-05-24
published: True
toc: true
toc_label: On This Page
toc_icon: list
toc_sticky: true
comments: true
header:
  teaserlogo:
  teaser: ''
  overlay_image: img/big-imgs/markus-spiske-466ENaLuhLY-unsplash.jpg
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
  #image: img/big-imgs/photo-1513735718075-2e2d37cb7cc1.jpg
  caption: 'Photo by [Markus Spiske](https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText){:target="_blank"} on [Unsplash](https://unsplash.com/s/photos/software?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText){:target="_blank"}'
tags:
  - SCCM
  - PowerShell
category:
  - PoweShell
---

SCCM is one of the wonderful endpoint managers out in the market to help System Administrators. As we know, it supports most of the operating systems (Compute\Mobile) in the market. But here we'll discuss Microsoft's Windows Operating Systems.
When it comes to a single user OS (Windows Client) like Windows 7 and Windows 10 this is a champ, with Multi-user OS (Windows Server) like Windows 2012\2019, I see this as a limitation. Here it is below.

**NOTE:** If multiple users are using a device at the same time, say via multiple remote desktop sessions, the user with the lowest session ID will be the only one to see all available deployments in Software Center. Users with higher session IDs may not see some of the deployments in Software Center. For example, the users with higher session IDs may see deployed Applications, but not deployed Packages or Task Sequences. Meanwhile the user with the lowest session ID will see all deployed Applications, Packages, and Task Sequences.<br> _Sourced from : [Software Center user guide](https://docs.microsoft.com/en-us/mem/configmgr/core/understand/software-center)_
{: .notice--primary}

