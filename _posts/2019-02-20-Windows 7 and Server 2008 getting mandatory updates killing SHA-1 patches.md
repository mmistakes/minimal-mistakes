---
layout: single
author_profile: true
read_time: true
comments: true
share: true
title: Windows 7 and Server 2008 getting mandatory updates killing SHA-1 patches
date: February 20, 2019 at 03:00AM
categories: Tech News
---
<img class="align-center" src="%20http://d2.alternativeto.net/dist/icons/windows-7_94498.png?width=36&amp;height=36&amp;mode=crop&amp;upscale=false">
<p><p>Microsoft has announced via <a href="https://support.microsoft.com/en-us/help/4472027/2019-sha-2-code-signing-support-requirement-for-windows-and-wsus" rel="nofollow">a new support article</a> that it will be phasing out the Secure Hash Algorithm 1 (SHA-1) based portion of its cryptographic signing of Windows updates across all actively supported distributions (<a href='//alternativeto.net/software/windows-7/'><img alt='Small Windows 7 icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/windows-7_94498.png?width=36&height=36&mode=crop&upscale=false' />Windows 7</a>, <a href='//alternativeto.net/software/windows-server-2008-r2/'>Windows Server 2008</a>, <a href='//alternativeto.net/software/windows-8/'><img alt='Small Windows 8 icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/windows-8_33098.png?width=36&height=36&mode=crop&upscale=false' />Windows 8</a>, <a href='//alternativeto.net/software/windows-server-8/'><img alt='Small Windows Server 2012 icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/windows-server-8_100971.png?width=36&height=36&mode=crop&upscale=false' />Windows Server 2012</a>, <a href='//alternativeto.net/software/windows-10/'><img alt='Small Windows 10 icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/windows-10_82838.png?width=36&height=36&mode=crop&upscale=false' />Windows 10</a>, and <a href='//alternativeto.net/software/windows-server-2019/'><img alt='Small Windows Server 2019 icon' class='mini-app-icon' src='//d2.alternativeto.net/dist/icons/windows-server-2019_123104.png?width=36&height=36&mode=crop&upscale=false' />Windows Server 2019</a>) in favor of solely signing with the newer and more secure SHA-2 algorithm.</p>
<p>According to Microsoft, the reason for this transition from dual signing operating system updates with both SHA-1 and SHA-2 to just using SHA-2 is because of SHA-1 &quot;...[becoming] less secure over time due to weaknesses found in the algorithm, increased processor performance, and the advent of cloud computing.&quot; For users on Windows 10 and Server 2019, no action is needed for the process. However, for users on Windows 7 and Server 2008, a mandatory update is required in order to ensure the ability to download and install future security updates.</p>
<p><a href="https://support.microsoft.com/en-us/help/4472027/2019-sha-2-code-signing-support-requirement-for-windows-and-wsus" rel="nofollow">The support article</a> contains a time table of events shows that the critical dates for Windows 7 and Windows Server 2008 are March 12th, when the update to support SHA-2 code sign support goes live, and July 16th, which is when Windows 7 and Windows Server 2008 users should have downloaded and installed the update from March 12th by in order to continue receiving security updates.</p>
<p>Further coverage:<br />
<a href="https://support.microsoft.com/en-us/help/4472027/2019-sha-2-code-signing-support-requirement-for-windows-and-wsus" rel="nofollow">Windows support article</a><br />
<a href="https://www.zdnet.com/article/windows-7-users-you-need-sha-2-support-or-no-windows-updates-after-july-2019/" rel="nofollow">ZDNet</a><br />
<a href="https://arstechnica.com/gadgets/2019/02/mandatory-update-coming-to-windows-7-2008-to-kill-off-weak-update-hashes/" rel="nofollow">Ars Technica</a><br />
<a href="https://fossbytes.com/windows-7-users-sha-2-update-march-microsoft/" rel="nofollow">Fossbytes</a><br />
<a href="https://news.softpedia.com/news/microsoft-to-release-must-have-sha-2-update-for-windows-7-next-month-524991.shtml" rel="nofollow">Softpedia</a></p>
</p>
<a class="btn btn--info" href="https://alternativeto.net/news/2019/2/windows-7-and-server-2008-getting-mandatory-updates-killing-sha-1-patches">View Complete Article</a>