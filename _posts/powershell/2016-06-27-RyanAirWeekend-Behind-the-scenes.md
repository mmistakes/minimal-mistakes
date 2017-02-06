---
excerpt: This the storyline, artefacts and pitfalls of creating a RyanAir parser, data renderer and hosting tp github pages.
header:
  overlay_image: http://72gpf1za5iq428ekh3r7qjc1.wpengine.netdna-cdn.com/wp-content/uploads/2015/04/storytelling.jpg
tags:
- PowerShell
- .NET
- MarkdownPS
date: 2016-06-27 21:00:25
title: RyanAir Weekend - Behind the scenes

---



This is a post about the storyline, artefacts and pitfalls of creating the [RyanAir Weekend](https://sarafian.github.io/RyanAirWeekend/) site discussed in my previous [post]({% link _posts/2016-06-27-RyanAirWeekend.md %}).

## And the story starts with ...

My wife and I like to take short trips to city nearby Belgium. 
For personal reasons, we don't want to take any holiday days for such trips, so we try to fly out after work or on Saturday morning and come back on Sunday evening or Monday morning just before work.

At work I'm focused on PowerShell for the last six months.  
To enhance my knowledge with PowerShell I started building certain artifacts to help build up knowledge and experience necessary to drive a team as product owner. 
The [RyanAir Weekend]({% link _posts/2016-06-27-RyanAirWeekend.md %}) started as a very experimental proof of concept that grew more ambitious and at the end became something I wanted to share with everybody.

The main idea of the proof of concept is to build a site with simple tools such as scripting. 

### Initial attempt

My initial attempt was to create a flat PowerShell script that queried the [RyanAir](https://www.ryanair.com/) API and rendered a static html site that hosted internally at home. 
My biggest problem was rendering a web site. It's not an easy thing especially if you want to combine different types of content structures like paragraph, bullets, tables etc.

During the same time, I started another project at work where I wanted to create a dashboard page for [SDL Knowledge Center](http://www.sdl.com/cxc/knowledge-delivery/documentation-management-dita/) deployments. 
It soon became obvious that rendering HTML from PowerShell was a dead end. Too much noise in the script, not enough flexibility and at the end an ugly outcome.

### MarkdownPS to the rendering rescue
Then came the idea to replace HTML with markdown. This is one of the best ideas I've ever and led to the creation of [MarkdownPS](https://www.powershellgallery.com/packages/MarkdownPS/ "MarkdownPS") PowerShell module. 
With this module, rendering data into what becomes a pretty descent HTML page is super easy. In this blog there is a [section](/post/markdownps/markdownps/) for all posts relative to MarkdownPS. 

The problem is that markdown needs a special web server that can dynamically render the content to html as github and bitbucket do. I found my solution in NodeJS package [Markserv](https://www.npmjs.com/package/markserv). 
Then I turned the package into a persistent windows service as described in [Simple markdown web server for windows]({% link _posts/2016-05-23-simple-markdown-web-server-for-windows.md %})

### RyanAirPS for everybody

At this point the dashboard page at work had progressed and was proving more and more useful. 
Adding functionality was easy because I just need to implemented the logic and quickly render it using the MarkdownPS module. 
At this point I turned back to my efforts for generating a quick overview for weekend trips with RyanAir. 

What was missing was a standardized library to query the RyanAir API. 
I had this embedded in the original flat script but I wanted to share this functionality with the rest of the world, because then my plan was still to make an internal page. 
I would at worst share the code base on github, make a blog post with instructions here and let everyone host their own mini site at home.

So, I extracted the functionality and created the [RyanAirPS](https://www.powershellgallery.com/packages/RyanAirPS/ "RyanAirPS") PowerShell module. 
I still haven't found the time to create a post for the module but if you are interested on how to use it please read about this on the github [repository](https://github.com/Sarafian/RyanAirPS/).

### Hugo and Github pages set ambitions 

At this point I've already managed to set up an internal functioning site. 
My wife and I could easily browse through the possible destinations from Belgium and nearby airports, then chose a weekend and then go to RyanAir to book the flights.
This would have been the end of the story but around the same period I've gone through the process of setting up this blog. 
I've written a full post about [Building the site with Hugo]({% link _posts/2016-05-06-building-the-site-with-hugo.md %}) but short story I use: 

- [Hugo](https://gohugo.io/) to render markdown files into a static HTML site.
- [Github pages](https://pages.github.com/) for hosting.

Wait a minute? The content that drives Hugo is actually markdown and I know how to turn it to a web site. I also know how to automate the build with [Visual Studio Team Services](https://visualstudio.com/) as I bloged about it in [Automate Hugo with VSS]({% link _posts/2016-05-11-automate-hugo-vss.md %}).

What was missing was to open up the pipeline to process more airports and render a more useful site to navidate. 
And because I'm bad with HTML and CSS, I repurposed the them from this blog and adjusted to a non blog oriented content. 
I put all in a github repository [RyanAirWeekend](https://github.com/Sarafian/RyanAirWeekend/).

The execution flow is: 

1. PowerShell module [RyanAirPS](https://www.powershellgallery.com/packages/RyanAirPS/ "RyanAirPS") extracts the data from [RyanAir](https://ryanair.com/ "RyanAir")
1. PowerShell module [MarkdownPS](https://www.powershellgallery.com/packages/MarkdownPS/ "MarkdownPS") helps scripts render markdown files as content for [Hugo](https://gohugo.io/ "Hugo").
1. [Hugo](https://gohugo.io/ "Hugo") processes the markdown content and generates static html files.
1. Script push the html files to the gh-pages branch in [RyanAirWeekend](https://github.com/Sarafian/RyanAirWeekend/ "RyanAirWeekend")

### And..... unforeseen problems

Everything was working and I was ready to unleash the daily build when I realized I had some serious problems: 

- As expected PowerShell is very slow. At home the execution took minimum four hours. 
Through my proof of concept I proved an argument I've made that PowerShell is not good to create applications. It was never its purpose after all.
- [Visual Studio Team Services](https://visualstudio.com/) hosted agent allows maximum execution time of 30 minutes per build. 
Ouch!! 30 minutes version 4 hours! My first reaction was to limit the processing to 3 airports until I figured out a solution.
- [Visual Studio Team Services](https://visualstudio.com/) allows maximum build time for free accounts of 240 minutes per month.
While troubleshooting and rendering the filtered site for a couple of days, I ran out of build minutes very quickly.

I must admit I should have checked upfront about the above problems. I knew about PowerShell performance but the other two where unexpected. 
As a small remark, the above limitations are really small print in [Visual Studio Team Services](https://visualstudio.com/).  

For better or worse, I hadn't looked it up and since I had invested too much that forced me to find a solution.

### Looking for solutions

Although I knew PowerShell performance is at fault, I took a look into optimizing the script. 
This is still a proof of concept based solely on light weight tools such as scripting.  

I looked into making parallel execution of script blocks using the `Start-Job` cmdlet but it turns out that it simply spawns PowerShell processes, equally slow. 
With PowerShell jobs I couldn't improve performance more than 15% and the behaviour was not predictable on [Visual Studio Team Services](https://visualstudio.com/). 

At this point, I decided to skip the "only script" mandate I've set to my self and finish this. I was getting tired and I want to do something else. 

I've worked with .NET my entire professional life and I know how much fast it can be, especially with multi-core processing. 
I did some quick tests and the results were promising.  
So I've ported line by line the functionality of [RyanAirPS](https://github.com/Sarafian/RyanAirPS "RyanAirPS") to C# while making sure I could leverage the `System.Threading.Task` namespace to its most potential. 
If you take a look at the C# code keep that in mind please. 

I've hooked up the script to the new executable and by just replacing the most intensive part of step 1, I know manage all processing of all airports for 4 months within 24 minutes on the hosted build agent.  
The rest of the 30 minutes is allocated for the rest of the build steps and some grace period if the performance is slow. Last build took 28 minutes and I really hope that Microsoft adds some horsepower to the hosted agents.

As a quick performance comparison between PowerShell and .NET executables, more than 4 hours of executing web requests to a rest API, processing the returned JSON, and saving to the file system is done with .NET in less that 15 minutes on my system.  
I really do not know how long it will take on the hosted build agent although I speculate to a minimum of 6 hours. 

I'm sure I could optimize the rest of the process with .NET and gain around 5 minutes. 
This would allow me to increase the processing period from 4 months to 5 but it's something to think about in the future.

### Lessons learned

This is the part of retrospective. What I take from this project besides some good priced city tripes are:

- Don't **ever** use PowerShell to develop any sort of application. It's too slow. Also listen to your own arguments. 
- Never forget the power and speed of binary executables. Somebody did recently a comparison between a NodeJS web server and Kestrel powered with .NET core. 
.NET core is 6 times faster than NodeJS.
- Although I'm biased because the module is mine, [MarkdownPS](https://www.powershellgallery.com/packages/MarkdownPS/ "MarkdownPS") is an amazing tool. 
- When using free tools and services, its best to look first for the limitations. Especially if there is a pricing model, then there is bound to be some fine print.
- This is for Microsoft. [Visual Studio Team Services](https://visualstudio.com/) needs serious usability improvements.
