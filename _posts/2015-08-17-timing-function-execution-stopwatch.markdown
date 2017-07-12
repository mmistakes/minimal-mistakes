---
layout: post
title: "Timing Function Execution"
date: 2015-08-17T23:01:45+02:00
categories: ios
tags: [ios, objective-c, cocoa, cocoa-touch, foundation, swift, stopwatch]
comments: true
---

When writing software it always good practice to keep an eye on how much resources will be used by our code at run time.
Resources are for example time, memory, disks space, battery power etc. etc.

Measuring resource usage at run time is called __Profiling__. Specifically in this article I will be addressing __Time Profiling__.

If you work on Apple platforms you should be familiar with Instruments. The __Time Profiler__ within Instruments is
at your disposal to help you analyze where your application is spending most of it's cpu time and eliminate bottlenecks.

In this article however I will not be dealing with the Time Profiler at all. An overview tutorial on how to use
the Time Profiler is available here: [iOS SDK: Time Profiling with Instruments](http://code.tutsplus.com/tutorials/ios-sdk-time-profiling-with-instruments--mobile-9403).

Instead I will present a quicker solution to answer the question: _"How long will this take?"_.
This solution can be used while developing (e.g. for sanity checks) or if you need a permanent log every time your code runs (e.g. in debug builds).

The basic functionality needed to time the execution of a certain piece of code is very similar to the one of a stop watch.

##Replicating a Stop Watch

A stop watch at it's most basic functionality has the following interface:

* Start Timer
* Stop Timer

Some stop watches allow you to start an stop multiple timers, which translates to:

* Start Timer for event
* Stop Timer for event

That looks pretty simple and should be enough to help us answer our _"How long will this take?"_ question.

However we can keep thing even more
simple, and avoid dealing with timers all together. We're instead just going to log the start/stop time of an event.
This will be the base for our stop watch.

In code it will look as follows:

{% highlight swift %}

// Create an event and log the start time
StopWatch.starEvent("important function")
performance_critical_function()
// Get the event and log the stop time
StopWatch.stopEvent("important function")

{% endhighlight %}

### A Stop Watch Event

Since we're going to base our timing on measuring the difference between start/stop time of an event, it's pretty clear that
we need to have at least 2 properties in our ``StopWatchEvent`` class.

* A start time
* A stop time

To be as accurate as possible, we're going to get the time information expressed as time units in the system's time reference frame.
On iOS we can simply use [mach_absolute_time()](https://developer.apple.com/library/mac/qa/qa1398/_index.html) to do so.

To these two properties we're going to add a third one to know in what state a stop watch event is. This is the state of the
stop watch event.

{% highlight swift %}

public enum StopWatchEventState: Int {

    case Undefined = 0
    case Started
    case Stopped
}

{% endhighlight %}

### A Stop Watch

Dealing with raw stop watch events would mean that we would have to keep a reference around for every event that we want to time. That is
going to be pretty inconvenient if what we want to profile starts in a certain part of our application and end in at a completely different
point in the code. Passing the reference of that particular event around is going to be annoying.

For this purpose we're going to create a ``StopWatch`` class to store all the events. We're also going to use this class to start and stop events
without having to create a ``StopWatchEvent`` directly.

At the bare minimum our StopWatch class is going to look as follows:

{% highlight swift %}

public class StopWatch {

    private (set) public var events = [String:StopWatchEvent]()    

    public func startEvent(name:String) -> StopWatchEvent {
        //TODO
    }

    public func stopEvent(name:String) -> StopWatchEvent? {
        //TODO
    }
}

{% endhighlight %}


## Give me the code

My implementation of a StopWatch written in Swift 1.2 is available at [https://github.com/blender/stopwatch](https://github.com/blender/stopwatch). It supports starting, stopping, restarting, removing (one, all) event(s).
