---
id: 149
title: 'NTLM Proxies are the Devil''s spawn'
date: 2016-09-15T11:34:25+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=149
permalink: /ntlm-proxies-suck/
categories:
  - Uncategorized
tags:
  - pain-points
---
{:left: width="250px" style="float: left"}
![Very Evil Firewall](https://cdn.meme.am/instances/41007948.jpg){:width="250px"}\\
*how NTLM proxies were conceived*
{:left}

Even though most developer apps recognize and support proxies, they all require some sort of configuration either on the commandline, through environment vars (e.g. <code>http_proxy</code>) or via a configuration file. Setting up a non-encrypting proxy is tedious, but none in my experience support <a href="https://en.wikipedia.org/wiki/NT_LAN_Manager" target="_blank">NTLM-based</a> authentication. The process for getting these apps to talk across a proxied firewall is painful.
<!--more-->
So, every developer who wants their tools to access the internet needs to configure <a href="https://gist.github.com/triskell/2b0922a2469a448b507b" target="_blank">CNTLM</a> and configure their apps to use this proxy. This is fiddly too, as some apps use <code>HTTP_PROXY</code>/<code>HTTPS_PROXY</code> environment variables, and some use a config file. This config file could be in the install directory, users home directory (<code>%USERPROFILE%/.gitconfig</code>), an app directory in the home directory (<code>%USERPROFILE%/.m2/settings.xml</code>), some other random place, or commandline (<code>npm config set proxy...</code>, <code>npm config set http-proxy ...</code>, etc.

Woe to you if the https proxy cert's is self-signed so that the signature can't be traced back to a standard Certificate Authority (CA). There's a whole new ring of Hell of figuring out how to disable signature validation. Most of the time signature validation can't be disabled, so another configuration needs to be set to tell the app to use the http flavor of a given repo instead of the default https, if it even offers a non-encrypted version.
