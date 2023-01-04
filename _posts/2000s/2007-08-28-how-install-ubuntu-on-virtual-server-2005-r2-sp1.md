---
title: How install UBUNTU on Virtual Server 2005 R2 SP1
tags: [Linux, UBUNTU, Virtual Server]
---
<P>For an interop test with a customer of mine, I needed to install an UBUNTU on my Virtual Server. In order to achieve this reult, I found&nbsp;2 main issues to address:</P>
<UL>
<LI>Virtual Server VGA implementation support up to 16 bit as pixel depth, while&nbsp;UBUNTU default is 24</LI>
<LI>Virtual Server emulates a PS/2 mouse while&nbsp;UBUNTU (and many other linux distributions) have a known bug in PS/2 implementation</LI></UL>
<P>As you easly understand from the company I work for :-) I'm not a really expert on Linux so, after a search here and there, I collected a bunch of information that allows me to succesfully install this OS.</P>
<UL>
<LI><STRONG>Step by step installation steps to address the VGA problem</STRONG>: <A href="http://arcanecode.wordpress.com/2007/02/26/installing-ubuntu-610-on-virtual-pc-2007-step-by-step/" mce_href="http://arcanecode.wordpress.com/2007/02/26/installing-ubuntu-610-on-virtual-pc-2007-step-by-step/">http://arcanecode.wordpress.com/2007/02/26/installing-ubuntu-610-on-virtual-pc-2007-step-by-step/</A>&nbsp;(good)</LI>
<LI><STRONG>by-pass the mouse problem using the keyboard to emulate the mouse</STRONG>: <A href="http://arcanecode.wordpress.com/2007/04/25/ubuntu-704-and-virtual-pc-2007-mouse-issue-workaround-sort-of/" mce_href="http://arcanecode.wordpress.com/2007/04/25/ubuntu-704-and-virtual-pc-2007-mouse-issue-workaround-sort-of/">http://arcanecode.wordpress.com/2007/04/25/ubuntu-704-and-virtual-pc-2007-mouse-issue-workaround-sort-of/</A>&nbsp;(better)</LI>
<LI><STRONG>Patch the operating system to fix the issue and use you real MOUSE</STRONG>: <A href="http://arcanecode.wordpress.com/2007/05/17/fixing-ubuntu-704-fiesty-fawn-mouse-under-virtual-pc-2007/" mce_href="http://arcanecode.wordpress.com/2007/05/17/fixing-ubuntu-704-fiesty-fawn-mouse-under-virtual-pc-2007/">http://arcanecode.wordpress.com/2007/05/17/fixing-ubuntu-704-fiesty-fawn-mouse-under-virtual-pc-2007/</A>&nbsp;(best! :-)</LI></UL>
