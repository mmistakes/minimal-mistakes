---
layout: post
title: "Find A Virtual Machine by MAC Address with VSphere Client and PowerCLI"
date: 2014-03-12 07:00:00
categories: sysadmin
---

It is usual task to find someone computer by its MAC address when there is an issue related to his computer in the local network. The common case is IP conflict or network abuse. But, if the MAC Address shows that machine is one of many scattered VMware virtual machine out there, how do we find it?

####vSphere Client
If you have an VMware ESX or ESXi server, [vSphere Client](https://pubs.vmware.com/vsphere-4-esx-vcenter/index.jsp?topic=/com.vmware.vsphere.installclassic.doc_41/common/install/t_down_client.html) is tool to manage your virtual machines from remote computer. But, vSphere Client cannot tell the MAC Address of virtual machines from version 10 or higher and to find virtual machine based on MAC Address we must open the virtual machine Setting one by one. It is still possible when there are few virtual, but it is exhausting when we have many virtual machine.

####vSphere PowerCLI
There is alternative method by using vSphere PowerCLI, a command-line tools to manage virtual machines in conjunction with vSphere Client. You can install vSphere PowerCLI by referring to [this](http://blogs.vmware.com/PowerCLI/2011/06/back-to-basics-part-1-installing-powercli.html) page. To find the virtual machine based on its MAC Address, open vSphere PowerCLI.
![powercli1](/images/powercli1.PNG)


Connect to your Virtual Machine Server (ESX or ESXI) by using command `Connect-VIServer`.
![powercli2](/images/powercli2.PNG)


After pressing [Enter] twice, you will be presented by a logon window.
![powercli3](/images/powercli3.PNG)


Login to your Virtual Machines Server.
![powercli4](/images/powercli4.PNG)


Then you can find the virtual machine by its MAC Address using this command `Get-VM | Get-NetworkAdapter | Where {$_.MacAddress -eq "AA:BB:CC:DD:EE:FF"} | Format-List`
![powercli5](/images/powercli5.PNG)


The highlighted one is the virtual machine name in your server. Good luck!

####Reference
[Finding a virtual machine in VMware vSphere by the MAC address](http://terenceluk.blogspot.com/2013/11/finding-virtual-machine-in-vmware.html)
