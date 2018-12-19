---
layout: single
author_profile: true
read_time: true
comments: true
share: true
title: Microsoft unveils Windows Sandbox for Windows 10 to safely test unknown .exes
date: December 20, 2018 at 01:29AM
categories: Tech News
---
<img class="align-center" src="%20http://d2.alternativeto.net/dist/icons/vmware-workstation_96242.png?width=36&amp;height=36&amp;mode=crop&amp;upscale=false">
<p><p>Microsoft will soon implement a new built-in Windows 10 utility now officially named Windows Sandbox. This will be welcome for users that want to test out an application that they're unsure if it's safe to install.</p>
<p>According to <a href="https://techcommunity.microsoft.com/t5/Windows-Kernel-Internals/Windows-Sandbox/ba-p/301849" rel="nofollow">the post announcing Windows Sandbox's formal name on the Microsoft Tech Community website</a>, the ability to test unknown applications, as well as scenarios that require a fresh installation of Windows, are the primary reasons that the company is developing Windows Sandbox.</p>
<p>The post gives the following summary of how Windows Sandbox works:</p>
<ul>
<li>Part of Windows – everything required for this feature ships with Windows 10 Pro and Enterprise. No need to download a VHD!</li>
<li>Pristine – every time Windows Sandbox runs, it’s as clean as a brand-new installation of Windows</li>
<li>Disposable – nothing persists on the device; everything is discarded after you close the application</li>
<li>Secure – uses hardware-based virtualization for kernel isolation, which relies on the Microsoft’s hypervisor to run a separate kernel which isolates Windows Sandbox from the host</li>
<li>Efficient – uses integrated kernel scheduler, smart memory management, and virtual GPU</li>
</ul>
<p>Though virtual machines such as <a href='//alternativeto.net/software/vmware-workstation/'><img alt='Small VMware Workstation Pro icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/vmware-workstation_96242.png?width=36&height=36&mode=crop&upscale=false' />VMware Workstation Pro</a>, <a href='//alternativeto.net/software/virtualbox/'><img alt='Small VirtualBox icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/virtualbox_96241.png?width=36&height=36&mode=crop&upscale=false' />VirtualBox</a>, and <a href='//alternativeto.net/software/qemu/'><img alt='Small QEMU icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/qemu_96243.png?width=36&height=36&mode=crop&upscale=false' />QEMU</a> exist to perform virtually risk-free testing of unknown or previously untested software, and although certain key components run using virtual machine-based protection in order to ensure they remain secure even in the event that the brunt of an instance of Windows 10 is compromised, these either aren't immediately viable or aren't the most user friendly to implement.</p>
<p>This move is great for less enthusiast computer users that feel wary about any software that they want to use but are unsure of if it is safe. It should be noted, however, that <a href='//alternativeto.net/software/windows-10/'><img alt='Small Windows 10 icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/windows-10_82838.png?width=36&height=36&mode=crop&upscale=false' />Windows 10</a> Home users cannot use the feature; only Windows 10 Pro and Enterprise installations have access to Windows Sandbox. Here's a full list of prerequisites:</p>
<ul>
<li>Windows 10 Pro or Enterprise Insider build 18305 or later</li>
<li>AMD64 architecture</li>
<li>Virtualization capabilities enabled in BIOS</li>
<li>At least 4GB of RAM (8GB recommended)</li>
<li>At least 1 GB of free disk space (SSD recommended)</li>
<li>At least 2 CPU cores (4 cores with hyperthreading recommended)</li>
</ul>
<p>Further Coverage:<br />
<a href="https://techcommunity.microsoft.com/t5/Windows-Kernel-Internals/Windows-Sandbox/ba-p/301849" rel="nofollow">Microsoft Tech Community</a><br />
<a href="https://arstechnica.com/gadgets/2018/12/windows-sandbox-marries-vm-isolation-to-container-efficiency-to-safely-run-dodgy-apps/" rel="nofollow">Ars Technica</a><br />
<a href="https://www.engadget.com/2018/12/19/windows-sandbox-safety-programs/" rel="nofollow">Engadget</a><br />
<a href="https://www.ghacks.net/2018/12/19/a-first-look-at-windows-sandbox/" rel="nofollow">gHacks Tech News</a><br />
<a href="https://www.theverge.com/2018/12/19/18147991/microsoft-windows-sandbox-security-safety-isolation-standalone-apps" rel="nofollow">The Verge</a></p>
</p>
<a class="btn btn--info" href="https://alternativeto.net/news/2018/12/microsoft-unveils-windows-sandbox-for-windows-10-to-safely-test-unkown-exes">View Complete Article</a>