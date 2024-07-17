---
id: 96
title: Creating a new developer box
date: 2015-02-04T16:18:05+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=96
permalink: /creating-a-new-developer-box/
categories:
  - Uncategorized
---
{:right: style="float: right; width:250px; padding: 2px"}
![boxstarter]({{site.url}}/assets/boxlogo_sm.png){:width="250px"}
{:right:}
I was issued a new laptop, <a title="HP 840 Product Page" href="http://www8.hp.com/emea_middle_east/en/products/laptops/product-detail.html?oid=5449573" target="_blank">HP 840 G1</a>, so needed to set up a proper development environment. The first time I set it up I manually downloaded and installed my regular dev kit. When I was upgraded to an SSD, I had to do it again so figured there must be a better way. I found <a href="http://Boxstarter.org" target="_blank">Boxstarter.org</a> would install applications similar to how <a href="http://www.puppetlabs.com" target="_blank">Puppet </a>and <a href="https://www.chef.io/" target="_blank">Chef </a>work. My <a href="https://gist.github.com/edgriebel/0ef4a9b3529391ab56e0" target="_blank">gist of the packages I install</a>. It took a little bit to learn how to run Boxstarter and chose my packages, but once these are set up and running it's fire-and-forget.

Boxstarter has a URL-based install that downloads a small application that steps through the packages in the gist that is specified in the URL. According to the <a href="https://github.com/chocolatey/choco/wiki/Proxy-Settings-for-Chocolatey" target="_blank">documentation</a>, the installer will use http_proxy/https_proxy environment variables if defined.

Aside from the underlying exe/msi's for a few packages being 404'd (commented out in gist) it worked quite well!

&nbsp;
