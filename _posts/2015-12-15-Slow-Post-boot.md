---
Layout: post
title: Slow Post-boot
Author_profile: true
Tags: 'WPA, Boot'
published: true
date: '2016-08-25'
---
We had a computer where the logon-process was quite fast but the post-boot was not.
This made that the computer was almost none responsive for a long time. Users weren't able to help customers because of this slow post-boot time. The "solution" of the user was to not reboot the client, but this led to other issues. 

We had several devices that had this issue, below you can find a few screenshots where the long post-boot is displayed.

![]({{site.baseurl}}/assets/images/Slowpostboot/a.png)

![]({{site.baseurl}}/assets/images/Slowpostboot/b.png)

We can see A LOT of disk I/O time for a file named OBJECTS.DATA. 
Because we use SCCM, i immediately knew that this was the WMI repository (WBEM).

When we look up the repository folder, we see that it is fairly large.

![]({{site.baseurl}}/assets/images/Slowpostboot/c.png)

According to this article: [http://thelazysa.com/tag/wmi/](http://thelazysa.com/tag/wmi/) a repository should only be around 25MB. During my search i found articles where the repository took on huge sizes, up to 1 GB!

As i said before, the repository is used by for instance the SCCM-client. Because we have had issues with the client in the past, we know how to reset this repository.

All is explained in detail here: [https://blogs.technet.microsoft.com/askperf/2009/04/13/wmi-rebuilding-the-wmi-repository/](https://blogs.technet.microsoft.com/askperf/2009/04/13/wmi-rebuilding-the-wmi-repository/)

But what it comes down to is this, you open a command-prompt and do the following:

	- net stop winmgmt /y
	- We browse to %windir%System32\Wbem and rename the repository folder to whatever 
	- Net start winmgmt

After about 10-20 seconds, a new repository (folder) will be created.
We did a new trace after resetting the repository and sure enough, post boot shrunk a lot! 

![]({{site.baseurl}}/assets/images/Slowpostboot/d.png)
	
The postboot is now only about 30 seconds!
