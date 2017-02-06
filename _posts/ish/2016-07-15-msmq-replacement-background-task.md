---
excerpt: Design a highly unbalanced queue with focus on stability, fairness and efficiency.
tags:
- SDL
- Knowledge Center
- Content Manager
date: 2016-07-15 14:46:24
categories:
- SDL
- Knowledge-Center
title: Background task, the centralized queue to replace MSMQ

---



[SDL Knowledge Center 2014](sdl.com/xml) Content Manager 11.0.0 made a significant breakthrough with regards to how the *batch* concept is implemented. 
The engineering team replaced the dependency to MSMQ with a proprietary queue implementation that is known as **Background Task**. 
In this post, I'll discuss 

- Why did we replace an out of the box free component such as MSMQ?
- Why didn't we use an existing queuing technology like e.g. RabbitMQ?
- How did we address fairness in an extremely unbalanced composition of queue items.
- Maximizing efficiency.
- Increasing total throughput by scaling.
- On demand extra throughput.

## Why replace the MSMQ?

A couple of main reasons:

- MSMQ is a component offered by the operating system. 
This is not compliant with Service Oriented Architecture yet alone, cloud and micro-services.
- MSMQ is a localized queue. It doesn't scale almost at all.
- MSMQ offers very little control and visibility over what happens in the queue.

Overall, MSMQ is component of the Visual era. Quick and easy development as long as the application is *small* and *easy*.
Since then the technology has dramatically changed.

## Why didn't we use an existing queuing technology?

There are two main reasons:

- We are still porting from Visual Basic and we needed minimum impact on existing components.
- The queue composition is very unbalanced without upfront knowledge for the potential execution weight of an item.

For historical reasons, an item is added in the queue as part of a transaction. 

MSMQ offered this feature while other services don't. Even if they did, we would require to maintain dependency to Distributed Transactions which is not container/cloud friendly.

The queue is composed from items that can be like this

- Some items execute within a minute
- Some items execute within 10 minutes
- Some items execute for as long as a day and as customer's are adding more and more data into Content Manager, the day limit is not considered an edge case any longer.
- For all items we don't know the execution weight. We can simply speculate based on the items classification. We call it **Event Type**.

The event type drives the execution of an item in the queue. 
This is how the system knows what to do with the item. 
Each item has also a payload that represents what should be processed but more than often this payload does not represent the weight of the execution.

To give you an example, if you want to publish then you add an item in the queue with event type **EXPORTFORPUBLICATION** and the payload is among other things the publication identifier. 
Depending on how big the publication is, that potentially means processing 100, 1000, 10000 or even 100000+ topics. 

## How did we address fairness in an extremely unbalanced composition of queue items. 

When we designed the system we tried to take into consideration a long standing request to support priority. 
But priority is very difficult goal to achieve while working with an unbalanced queue and while still maintaining  fairness.

After some deliberations we decided to skip the prioritized queue and to approach the subject from a different angle. 
Priority was still in our minds but as a secondary goal.

Our biggest problem has been always protecting the system and making sure that when something *big* executes all other systems are still operational without noticable delays. 
For example if one of the demanding in resources event types e.g. (EXPORTFORPUBLICATION) would consume 2GB RAM on an 8GB server, then you would restrict a maximum concurency of 3 for this event type. 
Each execution might take 1 hour or might take 10 hours but regardless, the system needs to be swift and operational. We assume here that the 2GB left are enough for the operating system and the rest of the components. 
Obviously the IO channel is not taken into consideration but I just simplified the example.

The above looks like a resource management problem. 
Our number one concern was and still is the stability of the system when very demanding items execute for a very long time.
If we would have gone with priority then we could land into a very dangerous situation when 3 long running EXPORTFORPUBLICATION are executing and a simple **CREATETRANSLATION** is getting hold back because there is no free execution slot. 
It wouldn't matter if the item would have the highest priority of all, the reality would be that in order to protect the system, it would have to wait and annoy the users. 

With every "Resource Management" problem you get a definite amount of resources that can be assigned to different tasks. 
If you think about the problem then most probably you will land into the conclusion of weight classification of each task with proper resource assignment. 
For example, a server with 8GB of ram can execute 3 very long running demanding EXPORTFORPUBLICATION but a server with 4GB of ram can execute only one EXPORTFORPUBLICATION concurrently or 1000 small light weight tasks every hour. 

So we came up with the concept of the **Availability matrix**. 
The availability matrix is a definition of different resource groups and their maximum execution concurrency. 
The availability matrix expresses what is the maximum allowed combination of execution load to maintain a healthy system. 

For example this is a fragment of the default configuration

```xml
<matrix>
    <group name="Translations" maxExecutions="2">
        <handlers>
            <add ref="CREATETRANSLATIONFROMLIST" />
            <add ref="CREATETRANSLATIONFROMREPORT" />
            <add ref="CREATETRANSLATION" />
            <add ref="RELEASETRANSLATIONS" />
        </handlers>
    </group>
    <group name="Export" maxExecutions="2">
        <handlers>
            <add ref="EXPORTFORPUBLICATION" />
            <add ref="INBOXEXPORT" />
            <add ref="REPORTEXPORT" />
            <add ref="SEARCHEXPORT" />
            <add ref="PUBLICATIONEXPORT" />
        </handlers>
    </group>
    <group name="SynchronizeToLiveContent" maxExecutions="1">
        <handlers>
            <add ref="SYNCHRONIZETOLIVECONTENT" />
        </handlers>
    </group>
    <group name="Others" maxExecutions="2">
        <handlers>
            <add ref="THUMBNAILSUBMIT" />
            <add ref="ISHBATCHIMPORT" />
        </handlers>
    </group>
</matrix>
```

Another way to read the configuration is this

| Group | Possible Event Types to execute | Maximum Concurrency |
| ----- | ------------------------------- | ------------------- |
| Translations | CREATETRANSLATIONFROMLIST,CREATETRANSLATIONFROMREPORT,CREATETRANSLATION and RELEASETRANSLATIONS| 2 |
| Export | EXPORTFORPUBLICATION,INBOXEXPORT,REPORTEXPORT, SEARCHEXPORT and PUBLICATIONEXPORT| 2 |
| SynchronizeToLiveContent | SYNCHRONIZETOLIVECONTENT| 1 |
| Others | THUMBNAILSUBMIT and ISHBATCHIMPORT| 2 |

Next to the queue we have a windows service known as the **Background Task Service**. 
With the above configuration a service operating in maximum capacity can be **only** in the following execution state.

- Maximum 2 items with event type CREATETRANSLATIONFROMLIST or CREATETRANSLATIONFROMREPORT or CREATETRANSLATION or RELEASETRANSLATIONS
- Maximum 2 items with event type EXPORTFORPUBLICATION or INBOXEXPORT or REPORTEXPORT or SEARCHEXPORT or PUBLICATIONEXPORT
- Maximum 1 items with event type SYNCHRONIZETOLIVECONTENT
- Maximum 2 items with event type THUMBNAILSUBMIT or ISHBATCHIMPORT

What happens if an item completed its execution?

- If an item with event type SYNCHRONIZETOLIVECONTENT is completed then service will try to pick items to execute with only SYNCHRONIZETOLIVECONTENT. 
- If an item with event type THUMBNAILSUBMIT is completed then service will try to pick items to execute with only with event type THUMBNAILSUBMIT or ISHBATCHIMPORT.

Below is a slide taken from the internal sprint demos. The matrix doesn't fully match the above configuration but I hope it helps you visualize the process.

![Polling strategy](/assets/images/posts/ish/2016-07-15-msmq-replacement-background-task.Polling strategy.png "Polling strategy")

We've organized the default configuration based on proven configuration from the MSMQ era. 

All items in the queue have equal priority regardless of their "weight" and that makes the system always fair. 

However perceived fairness is really driven by how the resources are allocated. 
Let me explain. 
I can't prioritize a specific item but I can make sure that it's type can have a higher *priority* compared to others, where *priority* is expressed in execution potential. 
I can do this by favoring some of the event types and increasing the maximum concurrency. 
From the system perspective all is still fair but if I provide double the resources for an event type then most probably that event type will feel that it has double the "priority". 
It really won't but the user will perceive it as such.

This is very similar to real life and this is the reason I refer to it as a "resource management/allocation" problem. 
Think about a priority lane in the airport. It's not that there are some special people that work better but it's just that there is a different lane for travelers who payed for the privilege of priority. 
In fact if the priority lane is full then the traveller needs to wait as any other traveller. He might even consider moving to a non priority lane. 

With the airport priority lane in mind, we don't prioritize but we've given you the power to implicitly favor certain flows if you chose to.

As long as each server's resource capacity is respected, then each service has the potential to hit maximum efficiency without inflicting other systems. 
This is very important because there is no good if an item is picked up really fast but has the potential to slow performance for the next hour or even bring down a server. 
Simply put, all users will suffer and money will be lost.

## Maximizing efficiency

If the server is capable for more, then we can increase the concurrency of one of the groups. 

If the server operates at maximum capacity but not maximum efficiency constantly then the only solution is to optimize the efficiency. 
This is what you would happen with any resource management problem. First verify the efficiency with the available resources and then add more resources. 
For example lets hypothetically assume that the server is capable for double of what the default configuration expects. 
Just by doubling all `maxExecutions` concurrency values we get:

- Maximum 4 items with event type CREATETRANSLATIONFROMLIST or CREATETRANSLATIONFROMREPORT or CREATETRANSLATION or RELEASETRANSLATIONS
- Maximum 4 items with event type EXPORTFORPUBLICATION or INBOXEXPORT or REPORTEXPORT or SEARCHEXPORT or PUBLICATIONEXPORT
- Maximum 2 items with event type SYNCHRONIZETOLIVECONTENT
- Maximum 4 items with event type THUMBNAILSUBMIT or ISHBATCHIMPORT

## Increasing total throughput (Scaling)

Let’s assume that while running under maximum efficiency I've noticed that users complain about very slow publishing and a bit slow translations. 
The server is on full load and I don't want to risk its stability. 
My next action would be to add X to my overall capacity for EXPORTFORPUBLICATION and Y for translation based event types. 

The configuration for background task defines roles. 
Each role among other things contains an availability matrix. 
The configuration is centralized and each Background Task Service is configured to operate based on a role. 
Implicitly the Background Task Service asks the central configuration what can it do and then tries to fullfill its potential.

Let's assume the following configuration

```xml
<service role="Default">
    <matrix>
        <group name="Translations" maxExecutions="2">
            <handlers>
                <add ref="CREATETRANSLATIONFROMLIST" />
                <add ref="CREATETRANSLATIONFROMREPORT" />
                <add ref="CREATETRANSLATION" />
                <add ref="RELEASETRANSLATIONS" />
            </handlers>
        </group>
        <group name="Export" maxExecutions="2">
            <handlers>
                <add ref="EXPORTFORPUBLICATION" />
                <add ref="INBOXEXPORT" />
                <add ref="REPORTEXPORT" />
                <add ref="SEARCHEXPORT" />
                <add ref="PUBLICATIONEXPORT" />
            </handlers>
        </group>
        <group name="SynchronizeToLiveContent" maxExecutions="1">
            <handlers>
                <add ref="SYNCHRONIZETOLIVECONTENT" />
            </handlers>
        </group>
        <group name="Others" maxExecutions="2">
            <handlers>
                <add ref="THUMBNAILSUBMIT" />
                <add ref="ISHBATCHIMPORT" />
            </handlers>
        </group>
    </matrix>
</service>
<service role="Translation">
    <matrix>
        <group name="Translations" maxExecutions="3">
            <handlers>
                <add ref="CREATETRANSLATIONFROMLIST" />
                <add ref="CREATETRANSLATIONFROMREPORT" />
                <add ref="CREATETRANSLATION" />
                <add ref="RELEASETRANSLATIONS" />
            </handlers>
        </group>
    </matrix>
</service>
<service role="Publish">
    <matrix>
        <group name="Export" maxExecutions="3">
            <handlers>
                <add ref="EXPORTFORPUBLICATION" />
            </handlers>
        </group>
    </matrix>
</service>

```     

And three services background task services each configured for each one of the roles

- Default
- Translation
- Publish

Then the total maximum capacity in would be

- Maximum 5 items with event type CREATETRANSLATIONFROMLIST or CREATETRANSLATIONFROMREPORT or CREATETRANSLATION or RELEASETRANSLATIONS
- Maximum 2 items with event type EXPORTFORPUBLICATION or INBOXEXPORT or REPORTEXPORT or SEARCHEXPORT or PUBLICATIONEXPORT
- Maximum 3 items with event type EXPORTFORPUBLICATION
- Maximum 1 items with event type SYNCHRONIZETOLIVECONTENT
- Maximum 2 items with event type THUMBNAILSUBMIT or ISHBATCHIMPORT

With such a configuration I could be executing minimum 3 and maximum 5 events with EXPORTFORPUBLICATION type at maximum capacity. 
If that is still not enough for publishing then adding a new service linked to role Publish raises the number to 6-8.

## On demand extra throughput

The background task was built with cloud scalability in mind. 
In Azure or AWS you typically pay for what you use. 
Many people increase or decrease the available resources based on rules of time or load.

In the long term we want Content Manager to support such functionality. 
**To be clear this is not yet part of the product** but here is how some custom implementations would look like.

1. Publishing happens during the evening. I need to publish 20 big publications every evening.
1. If a lot of EXPORTFORPUBLICATION items are pending in the queue, then I need to expedite their execution.

In both cases the implementation is almost the same and only the condition for the trigger changes. 
I'll use the last configuration example from above.
I'll also assume that a virtualized environment powers my Content Manager deployment.

What would the trigger need to do?

1. Fry or bake a new Content Manager server. That means all prerequisites are installed. Let’s call it ISHServer.
1. Install Content Manager and enable only Background Task Service running. The service is configured against the publish role. 
This can be done with PowerShell module [ISHDeploy](powershellgallery.com/packages/ISHDeploy.12.0.0/). 
In fact the module doesn't offer yet suitable cmdlets but it offers a good enough reference for the deployment to drive core cmdlets such as `Start-Service`.
1. Let the cluster deliver the higher execution throughput.
1. Stop the VM and/or delete it as a resource.

The above can be adapted to your needs. For example the VM could be always ready and we just need to start and stop it.

The accomplishments are happier users, empowering the business and maximizing the hourly efficiency of each user. 
In the past, this would come with an extra standard cost for the additional resources being always *warm*. 
Often this cost would not be accepted and no one would benefit and users would start nagging. 
With this approach, the cost of satisfied users is translated to a workload processing cost. 
For the workload to be a lot, that means that the users are busy and maximizing their work week.   

