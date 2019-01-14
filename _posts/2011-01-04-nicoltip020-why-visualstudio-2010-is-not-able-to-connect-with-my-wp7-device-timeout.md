---
title: NicolTIP#020- Why VisualStudio 2010 is not able to connect with my WP7 device? (timeout)
tags: [Debuging, NicolTIP, Visual Studio, WP7]
---
<p>Today without any reason VisualStudio was not able to connect with the WP7 device. When I selected “deploy solution” I received the following error:</p>  <pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">------ Deploy started: Project: ...
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">Deploying D:\MyProjects2010\...
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">Deployment of application to device failed.
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">This operation returned because the timeout period expired.
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">========== Build: 2 succeeded or up-to-date, 0 failed, 0 skipped ==========
</pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">========== Deploy: 0 succeeded, 1 failed, 0 skipped ==========
</pre><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre><pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"></pre></pre>

<p>Zune client was on.</p>

<p>Zune client seen the device.</p>

<p>Device was dev-unlocked.</p>

<p>Everything worked fine for weeks…</p>

<p>I don’t know why it happened, but I resolved doing the following steps:</p>

<ul>
  <li>Turn off PC </li>

  <li>Turn off mobile </li>

  <li>Remove and reinsert battery from mobile </li>

  <li>Turn on PC </li>

  <li>Turn on mobile </li>

  <li>Visual Studio is able to connect with device again </li>
</ul>
