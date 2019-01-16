---
layout: post
title: #HOWTO - Continuous delivery from GitHub to Azure AppService
date: 2018-03-12 15:01
author: nicold
comments: true
categories: [App Service, AppService, Azure, DevOps, GitHub, Uncategorized, VisualStudio]
---
<p lang="en-US"><a href="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-process.png"><img width="511" height="503" class="aligncenter size-full wp-image-1105" alt="" src="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-process.png" /></a></p>
<p lang="en-US">Few months ago I have spent a couple of evening in implementing an AppService able to delivery events from <a href="https://blogs.msdn.microsoft.com/nicold/2017/10/13/from-visual-studio-to-lametrictime-clock/">Visual Studio Online to a Lametric smart clock</a>. I have also <a href="https://github.com/nicolgit/visualstudio-lametric">shared all the solution code on GitHub</a>.</p>
<p lang="en-US">Well, yesterday, while I was working on other stuff on a customer's AppService, the following icon have grabbed my attention:</p>
<p lang="en-US"><a href="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-button.png"><img width="202" height="213" class="aligncenter size-full wp-image-1045" alt="" src="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-button.png" /></a></p>
<p lang="en-US">It allows to enable a continuous deployment from various sources to the AppService.</p>
<p lang="en-US">In the list of available sources I have found also GitHub... 2 seconds and I have quickly realized that I already have a perfect playground where to test this <em>automagic</em> workflow!</p>
<p lang="en-US"><a href="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-source.png"><img width="629" height="429" class="aligncenter wp-image-1055 size-full" alt="" src="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-source.png" /></a>so I went back on my subscription &gt; Lametric AppService and after a click on [deployment options] &gt; [GitHub] and the corresponding authorization workflow, I has been able to select my GitHub solution and preferred branch<a href="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-button.png"></a> to use for the deploy.</p>
<p lang="en-US"><a href="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-github.png"><img width="318" height="419" class="aligncenter size-full wp-image-1065" alt="" src="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-github.png" /></a></p>
<strong><span lang="en-US">Important note</span></strong><span lang="en-US">: in order to work the Visual Studio Solution file (</span><span lang="it">.sln) <strong>MUST BE</strong> the GitHub repository root folder!!</span>

Aftes a click on [OK] everything is <strong>DONE:</strong> AppService connects to GitHub, download the solution code, build it and deploy in <strong>PRODUCTION </strong>in a couple of minutes!
<p lang="en-US">When the deploy finishes an active deployment is shown under [Deployment Options] so you know what you have live.</p>
<p lang="en-US"><a href="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-log.png"><img width="794" height="567" class="aligncenter wp-image-1075 size-full" alt="" src="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-log.png" /></a></p>
<p lang="en-US">...and if you click on it you can also see what Azure have done under the hood:</p>
<p lang="en-US"><a href="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-log2.png"><img width="1024" height="729" class="aligncenter wp-image-1085 size-large" alt="" src="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-log2-1024x729.png" /></a></p>
<p lang="en-US">Interesting and <strong>USEFUL</strong> when you have to troubleshoot the process in case of an error.</p>
<p lang="en-US">From now every time I push an update to GitHub, well, the magic happen… in a couple of minutes a new version of the app is globally available :-) Yes, <em><strong>scary as it looks...</strong></em></p>
<p lang="en-US">Luckily I can<strong> easily rollback</strong> to a previous version if I need: I just have to select a previous deployment and click on [redeploy].</p>
<p lang="en-US"><a href="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-recovery.png"><img width="1024" height="335" class="aligncenter size-large wp-image-1095" alt="" src="https://msdnshared.blob.core.windows.net/media/2018/03/deployment-recovery-1024x335.png" /></a></p>
