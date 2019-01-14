---
title: NicolTIP#025–How to keep up to date your local copy of SysInternals tools
tags: [powershell, Russinovich, SysInternals]
---
<p>Even if http:\\live.sysinternals.com is great when you’re not on your pc, I usually prefer to have locally all Russinovich Tools.</p>  <p>The problem is that you have to keep up to date your local copy, problem that, I resolved writing the following PowerShell script (“Sysinternals Update.ps1”)</p>  <div class="csharpcode">   <pre class="alt"><span class="lnum">   1:  </span>net use k: http://live.sysinternals.com </pre>

  <pre><span class="lnum">   2:  </span>Robocopy.exe k:\tools <span class="str">'C:\Sysinternals\Local'</span> /MIR</pre>

  <pre class="alt"><span class="lnum">   3:  </span>net use k: /delete</pre>
</div>


<p>It copies in c:\SysInternals\local all tools. Remember that if you don’t want to double-click on it now and then, there is task scheduler that can help you.</p>

<p><a href="https://msdnshared.blob.core.windows.net/media/MSDNBlogsFS/prod.evol.blogs.msdn.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/49/62/metablogapi/6786.image_2B216C70.png" original-url="http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-49-62-metablogapi/6786.image_5F00_2B216C70.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://msdnshared.blob.core.windows.net/media/MSDNBlogsFS/prod.evol.blogs.msdn.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/49/62/metablogapi/6201.image_thumb_62673204.png" original-url="http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-49-62-metablogapi/6201.image_5F00_thumb_5F00_62673204.png" width="644" height="382" /></a></p>
