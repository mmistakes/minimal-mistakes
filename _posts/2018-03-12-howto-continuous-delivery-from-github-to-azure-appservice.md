---
title: #HOWTO - Continuous delivery from GitHub to Azure AppService
tags: [App Service, AppService, Azure, DevOps, GitHub, VisualStudio]
---

![process](..\assets\post\2018-03\deployment-process.png)


<p lang="en-US">Well, yesterday, while I was working on other stuff on a customer's AppService, the following icon have grabbed my attention:</p>

![deployment](..\assets\post\2018-03\deployment-button.png)


<p lang="en-US">It allows to enable a continuous deployment from various sources to the AppService.</p>
<p lang="en-US">In the list of available sources I have found also GitHub... 2 seconds and I have quickly realized that I already have a perfect playground where to test this <em>automagic</em> workflow!</p>

![deployment](..\assets\post\2018-03\deployment-source.png)

so I went back on my subscription &gt; Lametric AppService and after a click on [deployment options] &gt; [GitHub] and the corresponding authorization workflow, I has been able to select my GitHub solution and preferred branch

![github](..\assets\post\2018-03\deployment-github.png)


<strong><span lang="en-US">Important note</span></strong><span lang="en-US">: in order to work the Visual Studio Solution file (</span><span lang="it">.sln) <strong>MUST BE</strong> the GitHub repository root folder!!</span>

Aftes a click on [OK] everything is <strong>DONE:</strong> AppService connects to GitHub, download the solution code, build it and deploy in <strong>PRODUCTION </strong>in a couple of minutes!
<p lang="en-US">When the deploy finishes an active deployment is shown under [Deployment Options] so you know what you have live.</p>

![log](..\assets\post\2018-03\deployment-log.png)

<p lang="en-US">...and if you click on it you can also see what Azure have done under the hood:</p>

![log](..\assets\post\2018-03\deployment-log2.png)

<p lang="en-US">Interesting and <strong>USEFUL</strong> when you have to troubleshoot the process in case of an error.</p>
<p lang="en-US">From now every time I push an update to GitHub, well, the magic happen… in a couple of minutes a new version of the app is globally available :-) Yes, <em><strong>scary as it looks...</strong></em></p>
<p lang="en-US">Luckily I can<strong> easily rollback</strong> to a previous version if I need: I just have to select a previous deployment and click on [redeploy].</p>


![recovery](..\assets\post\2018-03\deployment-recovery.png)
