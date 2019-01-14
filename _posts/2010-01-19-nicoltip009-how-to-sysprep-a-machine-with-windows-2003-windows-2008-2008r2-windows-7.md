---
title: NicolTIP#009- How to Sysprep a machine with Windows 2003, Windows 2008 / 2008R2, Windows 7
tags: [clone, NicolTIP, sysprep, Window 7, Windows 2003, windows 2008, windows 2008 R2]
---
<p>I&rsquo;m writing here because every time I need to set up a bunch of virtual machines, I have to go back and look up where to find the Sysprep tool and how to use it.</p>
<p><strong>&nbsp;</strong></p>
<p><strong>Windows 2008, Windows 2008 R2, Windows 7:</strong></p>
<p>C:\Windows\System32\sysprep\sysprep.exe</p>
<p><a href="https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_msdn/nicold/WindowsLiveWriter/NicolTIP009HowtoSysprepamachinewithWindo_939B/image_2.png" original-url="http://blogs.msdn.com/blogfiles/nicold/WindowsLiveWriter/NicolTIP009HowtoSysprepamachinewithWindo_939B/image_2.png"></a>&nbsp;<a href="https://msdnshared.blob.core.windows.net/media/MSDNBlogsFS/prod.evol.blogs.msdn.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/49/62/1018.sysprep.PNG" original-url="http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-49-62/1018.sysprep.PNG"><img src="https://msdnshared.blob.core.windows.net/media/MSDNBlogsFS/prod.evol.blogs.msdn.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/49/62/1018.sysprep.PNG" original-url="http://blogs.msdn.com/resized-image.ashx/__size/550x0/__key/communityserver-blogs-components-weblogfiles/00-00-00-49-62/1018.sysprep.PNG" border="0" /></a></p>
<p>&nbsp;</p>
<p><strong>Windows 2003:</strong></p>
<li>Open &lt;DVD&gt;:\Support\Tools\Deploy.cab and extract setupcl.exe, setupmgr.exe, and sysprep.exe to C:\Sysprep. (N.B. C: is your system drive. If you installed Windows to another drive letter, use that drive letter rather than C:.) </li>
<li>Run setupmgr.exe from C:\Sysprep. </li>
<li>The Setup Manager wizard starts. Click Next... </li>
<li>Create new... Next... </li>
<li>Select "Sysprep setup". Next... </li>
<li>Select the correct OS version... Next... </li>
<li>Select "No, do not fully automate the installation"... Next... </li>
<li>Enter Name and Organization, Time Zone, Product Key, and Workgroup or Domain. The other settings can remain defaulted. Note that you don't want to specify the computer name since you will be creating multiple computers from the base image and you don't want to specify the admin password, even encrypted. If the sysprep program can extract the password from the answer file, so can any hacker worth their salt. Click Next... through to the end. </li>
<li>Finish... Save to C:\Sysprep\sysprep.inf. OK... </li>
<li>Wait while Setup Manager finishes. Cancel... (Yes, odd way to exit a program that has completed successfully.) </li>
<li>Run sysprep.exe. </li>
<li>Click OK. </li>
<li>Ensure that "Don't regenerate security identifiers" is UNCHECKED. You want to regenerate the SIDs when each new clone boots. </li>
<li>Click Reseal, OK to confirm that you want to regenerate SIDs, and wait for the system to shut down.</li>
