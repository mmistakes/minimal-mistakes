---
Layout: post
Author_profile: true
title: Slow shutdown analysis
Tags: 'WPA, WPR'
Date: '2016-02-16'
published: true
comments: true
---
Users complained multiple times about the duration of the shutdown process.
The users that were the most vocal about this issue, were all laptop users in combination with CITRIX VPN.

Desktop users have not complained up to this point.

Some shutdown tests  were run on my own computer a HP Folio 1040 with SSD. 
So one of the fastest computers in our entire park. 
The users that complained , use a HP 650 G1 without SSD.

Time was recorded by use of a smartphone

	Test 1 @ 16/02/2016 on computer L08w02G
	Phone Chrono Shutdown time : 1min25sec (85 seconds)
	
	Test 2 @ 18/02/2016 on computer L08w02G (The computer was booted and was immediately shut down afterwards without any further use.)
	Shutdown immediately after boot: 1min 10 sec (70 seconds)

### Analysis
I created a shutdown-trace with WPR (Windows Performance Recorder) and loaded it into WPA. 
The first thing i noticed was the duration of one of the KPI's (Key performance indicator), more specific the **Services**.
The McAfeeFramework service is online for about +- 65 seconds.
Since our shutdowns were around 75 seconds on average, I'm guessing this will be our culprit.

![culprit]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/1.png)

### Personal suspicion, testing and conclusion

Following the data i gathered (mentioned above) and the verbal feedback i received from our users, i decided to shutdown McAfee services.
I didn't stop all services, only those listed in the picture. 
(i did not take the time to find the dependant services for the remaining 3).

![services]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/2.png)

When we stop the above marked services, i redid the two shutdown tests.

>Shutdown duration McAfee disabled: 13 sec

>Shutdown duration McAfee disabled: 10 sec

_This is a huge win compared to the average of 75 seconds mentioned earlier!_

Testing further I came to the conclusion that it was the "McAfee Host-intrusion Prevention IPC service" that's causing the delay.
Just stopping this service is enough to resolve the issue.
For testing purposes i also did this test on an older machine  DELL Latitude E6420 with Windows 7.
This yielded the same results. I am confided that this would resolve issues on all impacted machines.

After i found the service and the "main component" that causes the issue (in this case being HIPS) i went online and found this topic on the McAfee forums:

[https://community.mcafee.com/thread/66375?start=20&tstart=0](https://community.mcafee.com/thread/66375?start=20&tstart=0)
[https://community.mcafee.com/thread/48770?tstart=0](https://community.mcafee.com/thread/48770?tstart=0)

Seems this is a known issue.

**Remains the question : why is McAfee taking so long ?**

### In search for the root cause

Looking at the CPU usage, we see that during the 65.61seconds of the McAfeeFramework service, the CPU is mostly IDLEing. So the computer is doing close to nothing during the time we are waiting.

![cpuusage]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/3.png)

Looking into the IDLE process in detail:

![cpuusageszoomed]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/4.png)

We can see that two processes are taking most of the idling time:

	- System (4)
	- FireSvc.exe (916)
	
What catches my eye is the column NewThreadStartFunction containing the value  "KiIdleLoop".

The word "loop" in combination with "IDLE" is causing me concern.
FireSvc has to do with (HIPS).

Source: [https://community.mcafee.com/thread/48770?tstart=0(https://community.mcafee.com/thread/48770?tstart=0)

It creates a log file on the local machine: c:\ProgramData\McAfee\Host Intrusion Prevention\FireSvc.log (might be worth investigating).

We drill down even further on FireSvc.exe (PID : 916)

![drillingdown]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/5.png)

Within this thread we find the column OldThreadId with value 2644.

We open a new tab with CPU Usage Precise and have a look at FireSvc.exe (PID 916).
We can see that thread 2644 waits for thread 2628 (see picture below).
When we open this thread, we see a wait for about 67 seconds.

![firesvc]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/6.png)

We open a new tab with "CPU usage sampled" and have a look at the STACK of  FireSvc (PID 916).
We notice that Thread 2632 takes +- 68 seconds.

![stackwalk]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/7.png)

FireSvc.exe (PID 916) with thread 2632 uses HmpRegistry.DLL. A quick Google-search learns us this is used to modify/interact with the registry.

	HmpRegistry.DLL-> http://systemexplorer.net/file-database/file/hpmregistry-dll/1594082


We open the Registry-trace.

![Registry]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/8.png)

When we look at process 916 with thread 2632 we can see that it only takes 0.2 seconds (see picture above).
So this can't be the root cause.
However, we do have threads that take up a lot of time:

Thread 2624 takes 66.12 seconds. In this thread registry values are created.

	8c61b0a8  = computer
    

![Registrywalk]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/9.png)

Again we can se thet HpmRegistry.DLL is being called 5 times. Is it calling itself? Should this happen?

![Registrywalk2]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/10.png)

Thread 2620 and more specific 1224 takes 60 seconds. In this thread, registry keys are being opened.

This seems to happen 4 times per key, why? Is this what the word "loop" in "KiIdleLoop" was referring to?

![Registrywalk3]({{site.baseurl}}/assets/images/WPASlowShutdownAnalysis/11.png)

### Conclusion

I did some further reading and came to the conclusion i was looking in the right direction.

My conclusion was correct, it only took a few more months after which there was a new version released of McAfee. When we updated to the newer version, the complaints were gone.

I tested this on my rig and sure enough, the shutdown is way faster now.
