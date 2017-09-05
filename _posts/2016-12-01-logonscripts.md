---
Layout: post
title: Why logonscripts aren't always such a good idea
Author_profile: true
Tags: 'WPA'
Date: '2016-12-01'
published: true
comments: true
---


![logonscripts]({{site.baseurl}}/assets/images/logonscripts/1.png)

So I've made a few traces and the Winlogon was always above 60 seconds. During this period GPO's are being processed. Since we have quite a few, i decided to have a more detailed look as to what was going on.

![logonscripts]({{site.baseurl}}/assets/images/logonscripts/2.png)

Since i'm very familiar with our GPO's, it is easy for me to see what's going on.

So the lines 93,95 and 99 are taking most of the time.

Line 99 is a tool that I’ve created in Powershell. It's a tool to communicate to critical personal in the case both phone and email would be down at the same time.

Thanks to this analysis i made changes on how to deploy this tool and how to use it, but that's not the main focus of this post.

Line 93 & 95 both concern a tool called Lansweeper. This is a great tool that i can recommend to everyone. It's an inventory software for your network.

The LSPUSH.EXE is provided by Lansweeper. We run it each time a user logs onto the network. It captures lots of data and forwards that to the lansweeper server. This is how we know who logs on what computer and where.

Although this is critical information that i use every day during my work at the helpdesk, it is not worth waiting +-40 seconds on each device.

So i deployed a scheduled task via a GPO that will run LSPUSH.EXE 1 minute after the user has logged on. This will still accurately show where a user has logged on , only the logon time would be off by 1 minute. No biggie.

![logonscripts]({{site.baseurl}}/assets/images/logonscripts/3.png)

The GPO's seen in the picture above will only be deployed once per pc off course. One will create the scheduled task, the other will copy the LSPUSH.EXE to where it needs to be.

![logonscripts]({{site.baseurl}}/assets/images/logonscripts/4.png)

So after i made all these changes, the Winlogon Init time, changed from +- 75 second into +- 31 seconds.

Thanks to a different project i worked on in 2015, i had statistics from the amount of logon and logoff events.

![logonscripts]({{site.baseurl}}/assets/images/logonscripts/5.png)

If 2016 has the exact same amount of logon's we would win 524.23 hours in time. Time that was now spend on waiting on the logon screen and now can be used to do work. Thank you WPA !


