---
excerpt: ISHRemote is a PowerShell business automation module on top of SDL Knowledge Center Content Manager (LiveContent Architect, Trisoft InfoShare)
tags:
- PowerShell
- ISHRemote
- SDL
- Knowledge Center
- Content Manager
- PowerShell
- MarkdownPS
date: 2016-10-17 11:11:10
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
title: Introducing ISHRemote automation for SDL Knowledge Center Content Manager

---



Finally, after much anticipation I'm really happy to introduce the newest member of the PowerShell automation modules for SDL Knowledge Center Content Manager. 

## History

My colleague [Dave De Meyer](https://github.com/ddemeyer) saw a couple of years saw future into the PowerShell technology and at some point during the product's development timeline, an internal project known as **Trisoft.Automation** started. 
Trisoft.Automation started as direct implementation over the Content Manager's API, which meant that most of the cmdlets were structured in a manner that assumed you were already an ISH API expert. 
A couple of years ago the engineering team picked up the module, improved it significantly and placed it inside the ISH CD, that is the deliverable of Content Manager. 
But as the module was an internal artifact of the CD it was very difficult to increase scope. 

This when I got involved, as I'm trying to convince everyone here that we should externalize tooling for our product and break away from the slow release cycle we have. 
In my opinion this allows more granularity, easier planning but most importantly a faster delivery vehicle so more happy customers. 
It also allows me to blog about to further increase visibility and even provide a platform for discussion.
In fact the tooling that accompanies a product is also it's silent advocate. 
Besides the offering of each tool, it allows a certain buzz to developed using social media and blog engines. 
It provides a steady anchor that help make a blogspot relevant to people that first hear words such as ISH. 
Then they may investigate what it is and you never know, they might get interested.

Since beginning of 2016, the engineering team has one agile team assigned in creating [ISHDeploy](/tags/ishdeploy/) to solve the big issue of upgrading. 
I transitioned into the product owner role for this team and I immediately set a goal for public scope. 
Initially there was much hesitation as the open source culture is not one of our disciplines. 
Its not only the open source aspect but even making the artifact public on PowerShell gallery required much convincing to achieve. 
So after much deliberation and with some needed convincing [ISHDeploy](https://www.powershellgallery.com/items?q=ISHDeploy&x=0&y=0) became the first public PowerShell module of SDL.

Opposition to change is powered by fear of the unknown and once we published our first module, the unknown and fear transformed into "let’s make some more artifacts public". 
The next immediate candidate was **Trisoft.Automation** but some things needed to be changed. 
My colleague [Dave De Meyer](https://github.com/ddemeyer) who is the mental father of this module and its biggest advocate took it upon himself to make this a reality. 
And his done a great job given the conditions.
At this point the name **ISHRemote** was decided. 
We already had **ISHDeploy** to handle the server side deployment configuration, so **ISHRemote** felt a good name as the proxy to the remote API. 

[Dave De Meyer](https://github.com/ddemeyer) has a deep background in the Content Manager's ISH API, so many things were designed with a big assumption on the available knowledge of his target audience. 
I on the other hand I'm not that experienced and to this day I find certain aspects of the API extremely difficult to experiment with and this requirement felt very strange and unappealing. 
Yes, in SDL we have many people very skilled and knowledgeful with the product, but in modern software you need to get the attention of everyone, experienced and not. 
It's not only your customers but also the younger audience you need to attract. 
To give an example, there can be a customer using the product for the last 10 years, there can be our very own professional services but once you go SAAS and once you acquire new customers you need something easy. 
If I would chose a product, one of the first things I would check would be its level of automation. 

For this reason, I set my self to play the role of a non-experienced integrator. 
My main goal was to make the module more attractive to the wider audience of the world.
So I started experimenting with it. 
Maybe one day I'll write a post on how I dug myself into the world of **ISHRemote**.
We did two iteration of me exploring, providing feedback and [Dave De Meyer](https://github.com/ddemeyer) explaining, listening and implementing. 
I really enjoyed this process as I enjoy a lot research, experimentation and reverse engineering. 
On my second session I was already very satisfied with what I saw and although the module is not ready, I feel it’s in a great state for others to start experimenting. 
For this reason I insisted to put the module out there even if it’s not the perfect product. 

For a while now, I've been trying to push the engineering team into the direction of not being afraid of the incomplete. 
If people find the idea interested, then they will pick up. 
Its better to familiarize the world with your idea rather than missing out by keeping it a secret until its perfect. 
And as many open source projects, the feedback from the world is as much valuable as the idea itself.

## Pre-release

I hope you liked the history and the insight into the changes happening within our engineering team. 
On Friday 14th October 2016, we spent a day publishing the first pre-release 0.3 version of [ISHRemote](https://www.powershellgallery.com/packages/ISHRemote/). 
It took us some time to prepare the github [repository](https://github.com/sdl/ISHRemote), move Dave's code in there, clean up some internal SDL specific artifacts and publish the module. 

There is still much to do and we have some good ideas. 
Dave's driving he functional side as he is an expert on the API  and I'm driving the user experience side.

But it's finally out there and it’s a cause for celebration. 

## The obvious use cases

Having a PowerShell API proxy module is great for many things and I'm sure the ones I'm going to mention are not the most important ones. 
Obviously you can use the module to export and import data from Content Manager. 
This is what it was built for.
A couple of examples:

- Import users, groups and roles from an external repository.
- Export settings, process and import back into the system.
- Control the state of a publication
- Export and import maps, modules, illustrations etc.
- Work with the baseline
- Use all the above to create fancy reports. I advise you to generate markdown files with [MarkdownPS](https://www.powershellgallery.com/packages/MarkdownPS/). Please read some previous [posts](/tags/markdownps/) on this subject.

## The not so obvious use cases


Besides the original intended use cases, I've found myself using the internal release of the module for other purposes. 
As the module and code base is finally public I can share with you some of these ideas.

### Building a dashboard

As ISHRemote is a remote proxy to the ISH API, I use it as my starting point to query the Content Manager deployment and produce useful information on a dashboard page. 
I do far more but I'll focus on the ISHRemote part.

Wouldn't it be nice to get some status badges like:

- ![Content Manager badge](https://img.shields.io/badge/admin-authenticated-green.svg "Content Manager")
- ![Content Manager badge](https://img.shields.io/badge/admin-failed-red.svg "Content Manager")

The above are one simple idea that tests if a specific user e.g. admin can successfully execute login to Content Manager. 

It all starts from the fact that you need to authenticate yourself e.g. admin into the service using the `New-IshSession` cmdlet. 
I know very well the secrets of the authentication, so I know that a successful execution means the following items:

1. The **ISHWS** website (e.g. ish.example.com/ISHWS/) is live.
1. **ISHWS** tells me well where the federated security token service (STS) is and how to authenticate to it.
1. I can authenticate over the STS.  
  1. If the STS is in fact the internal **ISHSTS** then I know that **ISHSTS** is live and the server has access to the database.
1. **ISHWS** is configured to the correct STS. I know this because the token the STS issued would had never been accepted otherwise.
1. The certificates in place are all still valid.

So although ISHRemote doesn't offer it yet, I've created my own `Test-ISHSession`.

{% gist Sarafian/32447761d7d2ed916a89ad1e5c6e5198 %}

I also use ISHRemote's `Get-IshSetting` to acquire if present the url for **Review And Collaboration** or **Quality Assistant**.  

```powershellgallery
$reviewAndCollaborationUri=Get-IshSetting -IshSession $session -FieldName "FISHLCURI"
$qualityAssistantUri=Get-IshSetting -IshSession $session -FieldName "FISHENRICHURI"
```

Then with some additional logic it’s possible to generate badges like 

- ![Review and collaboration badge](https://img.shields.io/badge/Review and collaboration-Available-green.svg "Review and collaboration")
- ![Quality Assistant badge](https://img.shields.io/badge/Quality Assistant-Not Available-red.svg "Quality Assistant")

It is even possible to get a badge for

- the login status for a user e.g. admin  ![Review and collaboration badge](https://img.shields.io/badge/admin-authenticated-green.svg "Review and collaboration")
- the potential of the publish and synchronize aka **Publish to LiveContent** and **Synchronize to LiveContent** by running the above for the **ServiceUser**. 
  - ![PublishService badge](https://img.shields.io/badge/PublishService-Healthy-green.svg "PublishService")
  - ![SynchronizeToLiveContent badge](https://img.shields.io/badge/SynchronizeToLiveContent-Cannot Connect-red.svg "SynchronizeToLiveContent")

ISHRemote offers an easy way into the Content Manager's data stream. 
What you do with the exported data is a different subject. 
I for example and for my dashboard, I use [MarkdownPS](www.powershellgallery.com/packages/MarkdownPS/) markdown as my output. 
I've discussed more about this technique in my previous posts tagged with [MarkdownPS](/post/markdownps/markdownps/) and [Simple markdown web server for windows]({% link _posts/2016-05-23-simple-markdown-web-server-for-windows.md %}). 
But you can always render the status using a different tool. 
The only difference would be the rendering tool but ISHRemote's offering will still be required. 

### Confidence testing before releasing ISHDeploy

Before the first stable release of [ISHDeploy](https://www.powershellgallery.com/items?q=ISHDeploy&x=0&y=0), there were a couple of problems and to make sure we offer you a great automation library, I've divided to write some confidence tests using Pester. 
Some of the test subject were about security, so using ISHRemote and `Test-ISHSession` as described above was a great tool to drive the Pester assertions. 
In some other cases, the test subject required knowledge of the identifiers for various objects in the Content Manager repository. 
Using early private versions of ISHRemote was my tool to query the API.

## ISHRemote security pipeline history

Over the past five years, one of my major responsibilities here at SDL, has been the federated authentication using 

| Type | Name |
| ---- | ---- |
| Protocol | WS Federation |
| Protocol | WS Trust |
| Token format | SAML1.1 |

Next to the security frameworks within the product and overtime we've developed a couple of other assets that helped make what ISHRemote is today. 
This is its history of it became to be:

1. The [web service samples](http://docs.sdl.com/LiveContent/content/en-US/SDL%20Knowledge%20Center%20full%20documentation-v2.1.1/GUID-C5CF0B6B-9FB2-463B-A83D-749D0EECE12F) on consuming ISHWS api using C# and JAVA. I refer to them as the *Hello world* equivalents. 
1. Scripted and dynamic creation of ISHWS proxies with PowerShell. 
1. As the samples are complicated, I provided to professional services the code base for a C# based zero-configuration dynamic ISHWS proxy generator. This is the father of ISHRemote. 
1. We ported the code base provided to professional services into the internal predecessor of ISHRemote then named Trisoft.Automation.
1. I published [WcfPS](https://github.com/sdl/WcfPS/) which combines the accumulated knowledge into a scripted module. 
1. Renamed Trisoft.Automation to ISHRemote and improved the security flow code base. 

## ISHRemote NUGET package?

Granted that the **WS Trust** and **WCF** are difficult to comprehend and implement, nevertheless we always struggled to offer a good and simple proxy to our ISHWS API. 
If you think about it, ISHRemote is actually exactly that but PowerShell oriented. 
What about a simple proxy for .NET developers?

ISHRemote is a binary PowerShell module developed in C#. 
This means that it's basically a .NET assembly, that complies with certain PowerShell requirements to expose its interface through PowerShell cmdlets. 
The fact that it’s a .NET assembly would make some speculate that it should be possible to use it to power my .NET application and you would be correct. 
I had thought about it and for a while I had used it's internals to power some small .NET console applications. 

If you dig around into the code of ISHRemote, I'm sure you will recognize the artifacts for the proxies. 
Anyone who has ever worked with SOAP and C# should. 
This is the easy part. 
The difficult part is to authenticate those proxies. 
If you follow the code of `New-IshSession` and/or what the output represents then I'm sure you'll figure out how to use it from your .NET project. 
I'm not going to fully reveal this because I don't think it is the correct approach. 
Instead I'll explain what should be a high priority for ISHRemote.

I want to extract from ISHRemote the security flow code base, isolate it on its own git repository with the intention of building and publishing a NUGET package. 
Then ISHRemote gets a dependency to the NUGET package and we offer you two artifacts:

- A .NET programmers choice NUGET package.
- A PowerShell automation module.

Each technology has different use cases and you get to choose which one is the best suited.

## Ideas and feedback

We want your ideas and contributions on the [ISHRemote](https://github.com/sdl/ISHRemote/)'s github repository. 
Or you can simply comment here and I'll make sure your ideas are represented in the repository.
