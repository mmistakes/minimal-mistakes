---
title: NicolTIP#022: How to remove Windows 7 and Windows 2008R2 backup Files…
tags: [Clean, disk, NicolTIP, powershell, SP1, Window 7, windows 2008 R2, Windows 2008R2]
---
<p>…created during service pack 1 (SP1) installation via PowerShell.</p>  <p>Run Powershell in elevated mode (run as administrator) and type:</p>  <pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">Dism.exe /online /cleanup-image /spsuperseded</pre></pre>

<p>You should earn more than 1Gb of disk space.</p>

<p><a href="https://msdnshared.blob.core.windows.net/media/MSDNBlogsFS/prod.evol.blogs.msdn.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/49/62/metablogapi/7382.image_00CEA9E5.png" original-url="http://blogs.msdn.com/cfs-file.ashx/__key/CommunityServer-Blogs-Components-WeblogFiles/00-00-00-49-62-metablogapi/7382.image_5F00_00CEA9E5.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://msdnshared.blob.core.windows.net/media/MSDNBlogsFS/prod.evol.blogs.msdn.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/49/62/metablogapi/6712.image_thumb_37C8881E.png" original-url="http://blogs.msdn.com/cfs-file.ashx/__key/CommunityServer-Blogs-Components-WeblogFiles/00-00-00-49-62-metablogapi/6712.image_5F00_thumb_5F00_37C8881E.png" width="660" height="184" /></a></p>
