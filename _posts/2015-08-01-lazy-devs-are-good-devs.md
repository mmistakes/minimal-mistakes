---
title: "'Lazy Developers are good Developers' OR Lean Software Support"
excerpt: "without ‘lazy’ software developers you would have nothing to support."
layout: single
comments: true
read_time: true
share: true
related: true
categories:
  - Blog
tags:
  - development
  - devops
header:
  overlay_image: /assets/images/local-govt-efficiency-machine.jpg
  overlay_filter: 0.25 # same as adding an opacity of 0.5 to a black background
  caption: "'Lazy Developers are good Developers'"
  teaser: /assets/images/local-govt-efficiency-machine.jpg

---

# “Lazy Developers are good Developers” OR Lean Software Support

Recently an ex-colleague wrote a blog about support teams and their role in the world of Agile Software Development that used some rather emotive and denigrating language about Software Developers. He focussed on what he perceived as Software Developers lack of care and attention to what happens to their software after it’s released to production.

He added some emotive and unhelpful language which stated, that in his opinion, Software Developers in an agile development are:

* focused only on coding, implying they don’t care about anything beyond ‘code’.
* lazy
* malicious
* only interested in the next cool technology

However, under the distracting emotional language he was trying to make the point that he felt Agile teams adopt a ‘throw it over the wall’ attitude to production support.

His suggested antidote was more documentation, knowledge articles, embedding support team members in development ‘projects’ and, above all else, good old-fashioned ITIL with a dedicated support team to look after software in production.

I would have whole-heartily agreed with this… ten to fifteen years ago! This *was* a valid model for software support.

But it’s not 2000, or even 2005, anymore. Modern Lean and Agile development and support rely on a characteristic that he highlighted in developers and that I agree with and am proud of:

## We software developers are lazy! And this is good!

Good software developers don’t like repeating ourselves on a mundane manual task. It’s a waste of our time. We are paid to solve hard problems for the business, to deliver value and early return on investment. If we find ourselves repeating a manual task we automate it so we don’t have to repeat it again.

We are not paid to write lots of Word documents and knowledge articles documenting software. The major issue with this kind of documentation is it never stays in line with the software.

Our software is self documenting. It has a set of automated tests at various levels that document functional requirements (in the form of acceptance tests) and non-functional requirements (performance, stress tests..).

Our software is self monitoring. Not just through logs, it raises events that can be trapped, monitored and analysed…automatically.

Our software is self healing. It is designed and tested to recover itself where possible and alert where not possible.

Good software developers don’t just ‘keep coding’… In fact we spend most of our time thinking. And this is what we should be doing. Software developers codify knowledge. This is what you want us to spend our time doing, its what you pay us for.

My ex-colleagues whole blog hangs on an assumption, that I posit does not hold true in many modern organisations, and is rapidly becoming redundant in others as they play ‘catch up’, the dedicated support team.

## Support in the Distributed World
### Documentation is Software
Documents never reflect what software does.

This is not due to laziness, lack of dedication or application, it’s simply the fact that representing the complex code paths of even a simple application in static documents, that cannot be automatically validated, is a task akin to cleaning of the Augean Stables (or the painting of the Forth Bridge if you prefer!).

It is better to record this knowledge in the code, tests and if the language allows in ‘literate programming’ techniques (a blog for another time). Why? Because this knowledge stays current and more importantly is verifiable. It’s virtually impossible to verify that a document is in line with the software but a good test must be..or it fails.

P.S. Detailed comments inlined in code are noise! Don’t do it. They never stay in line with the code and get in the way of scanning the code to get it’s true meaning. That’s not to say that you shouldn’t document your public APIs or interfaces within the code in the form of doc strings (e.g. JavaDoc)

### Deployment is Software
Modern distributed systems frequently deploy to tens, hundreds or even thousands of servers.

* Real and virtual.
* On premise or in the ‘cloud’.
* Using a multitude of platforms, application servers, lightweight containers, etc.

In this complex heterogeneous environment it’s impossible for a support team to deploy to this estate manually.
Deployment has to be automated. It’s codified in scripts and tested like any other software product. It’s an integral part of the delivery of the software system itself and is used to spin up all the environments from the developers desktop to production.

It’s this level of automation that makes it possible for an organisation like Amazon to deliver a software deployment every second (on average).

### Configuration is Software
As part of the deployment process, the configuration of servers, environments, tools, 3rd party libraries, frameworks and services is automated. The configuration of all of these moving parts is captured in yet more code.

### Production Monitoring is Software
Modern distributed software is deployed across hundreds of servers and broken up into tens of services that are composed together to deliver the end product.

In this environment it’s not practical for a team of people to monitor
the detailed workings of all these moving parts, even with traditional
application monitoring tools.

Therefore increasingly it’s becoming the norm to stream events from these systems, components and services, and to write bespoke systems to analyse patterns in this event stream for potential issues and to raise the alarm. These monitoring systems are frequently as complex, if not more complex, than the systems they are monitoring and use techniques from Artificial Intelligence like Machine Learning.

### Failover and DR is Software
Trying to maintain high availability with failover targets in the millisecond range in a massively concurrent, horizontally scaled environment is impossible for a human operator.

Software detects when a service or application has ceased to respond and fails over to passive instances automatically.

### Elastic Distribution and Auto Scaling is Software
Modern organisations and their software applications and services are making more and more use of virtualisation. This virtualisation may be a ‘private, ‘hybrid’ or ‘public’ cloud but anyway you dice it the principle is to efficiently flex the processing, storage and network based on the demands made on the systems at any moment in time.

This has led to environments that will scale automatically based on that load, exemplified in services such as Amazons Elastic Beanstalk or Apache Mesos abstraction of resource management.

Guess what? All of these services rely on configuration and orchestration using software.

### User support is Software
Over the last decade there has been an increase in automated mechanisms to service customer support demands and, although I would never argue that this has eradicated the need for human beings to talk to, it is certainly becoming more accepted to make requests of an automated help desk or to use self service knowledge bases.

The rise of social media and sophisticated software to interact with customers, again using AI techniques has meant that users either form a community to ‘help themselves’ and/or are supported by software.

## So where does this leave the dedicated Support Team?
The dedicated support team is rapidly becoming an anachronism.

Well, while I would not like to propose that the dedicated support team has had it’s day, I would suggest that the importance of non-development support staff carrying out manual tasks is likely to decline rapidly in the next few years.

So where does the future of support lie?

You guessed it….

## Those lazy developers are your support team too!
All this automation means the only pragmatic way to support massively concurrent distributed systems is through code.

The people supporting these systems need to be able to write, test and, most importantly, read code.
The people supporting the systems should be the people building the systems.
This has the side benefit I learned from supporting my own code in production, us lazy developers hate being woken at 3am to fix our own bugs so we tend to think about how we can avoid this. That means more automation (testing, monitoring, self healing).
Finally, if you are in the business of application support muse on this….

> WITHOUT ‘LAZY’ SOFTWARE DEVELOPERS YOU WOULD HAVE NOTHING TO SUPPORT.
