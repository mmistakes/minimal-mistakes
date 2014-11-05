---
layout: post
title: Github as your project management tool
excerpt: Github is a powerful Git platform commonly used between the developers community. It offers features like issues, labels, milestones, releases, that used properly might help you to manage not only your technical repos but different aspects around your project like design, ideas, ...
modified: 2014-11-04
tags: [github, scrum, issues, zenhub, management, project]
comments: true
image:
  feature: coworking.jpg
  credit: Photo from Coworking Badaup!
sitemap   :
  priority : 0.9
  isfeatured : 1
---

Github is a well known Git solution between all developers around the world. It helps you to manage your Git repositories remotely and offers extra features to complement the Git core and make you more productive. These extra features are for example Issues, Pull Requests, Labels, Milestones, Releases... We know about about them becase we use Github daily but we're totally conscious of how productive we can be using these components properly.

## Github + External Project Management Tool = Synchronization
I've been working during the past months in a project management tool as a developer. We used Github and tried to translate tasks from that platform to Github in order to work in them. Although we used milestones, and other internal methods to connect these developers items with the platform, all the management core was contained in that platform. This is something good but if you ensure that the synchronization between these two components is taken into account by all the team. Synchronization is something difficult to mantain, sometimes you feel a sync man! and you are focused on having a healthy communication between Github and your project management platform (PMP), but some others you feel so tired that you forget to report the status of your Github items to your PMP. When it happens the communication is broken and it implies extra work for your workmates like *where did you work on this?, why didn't you resolve the task?, why didn't you apply the proper label?* In these situations you feel like you are doing repeated stuff that you could do just once. Sometimes you make use of scrips that you develop on your own but if you can't spend a lot of time **developing scripts** for each communication flow.

## Github, but what if I'm not a developer?
Although it sounds strange Github is not only for developers. The entire Git concept can be applied to design, to the company related stuff, ... Once all the team members know about the flow it's pretty easy to stay connected an synchronized. Think about something like [**Markdown**](http://whatismarkdown.com/). Talking from the developer side we use a lot when we start a new repo and we have to fill the README.md file (*I remember the first time I knew about it when I created my first repo*). Markdown is becoming popular, it's used now in blogging platforms (*I'm in fact writting this article using markdown*). We could use Mardown in **our website/landing page repository** I've seen companies that took the decision to stick to Markdown instead of choosing over-loaded editors like the one Wordpress offers to you. If your project includes its own content **your company content editors** could write directly in Markdown and integrate that content into for example a Landing, a Web, or a Mobile application just commiting their changes. For **designers** it's something more complicated because they use mostly graphics instead of text but if you try to externalize all design related stuff *like css files, stylesheet file, snapshot testing,...* they can be more involved. This is something that everybody dreams with it, designers with the ability to go into your web project and tell you off about the styles your applied or a developer getting the styles and sizes directly from the designer's mockups. It depends a lot on the kind the product and on the level of integration of design and developers. 

## Management tips

### Issues

When we thing about an issue we tend to think about something negative (*as a developers we think about bugs*) but it doesn't has to why be something negative. Think that an issue should be something like a task, so it implies that you can use it as a for example *an idea you have had that would be cool to have it in the project* or *a new feature you have to implement in the current sprint*. Try to use a representative naming for your issues because the issues page is going to be your daily friend where you're going to constantly check your next stuff you have to work on. Take a look to the examples below

**Good naming**

- Steps counter feature 
- Crash caused by an empty response in the workout detail

**Bad naming**

- steps
- crash with response

### Labels
Labels is a way to clasify not only your issues but your pull requests too. Labels has a name and a color and Github allows you to filter your issues/PR using them as a filter element. Although Github offers you some labels by default I recommend you to analyze and adapt them to your needs and requirements.  Labels for a landing page can't be the same for a backend project. I've been googling around to have some ideas about labels other companies use in their project and I liked the idea of the first answer in this question in stack exchange, http://programmers.stackexchange.com/questions/129714/how-to-manage-github-issues-for-priority-etc. Tags that guy uses are:

```bash
test
```

'issue type' group
 type:bug
 type:feature
 type:idea
 type:invalid
 type:support
 type:task

'issue priority' group
 prio:low
 prio:normal
 prio:high

'issue status' group
 (These labels describe an issue's state in a defined workflow.)
 status:confirmed
 status:deferred
 status:fix-committed
 status:in-progress
 status:incomplete
 status:rejected
 status:resolved

'issue information' group
 info:feedback-needed
 info:help-needed
 info:progress-25
 info:progress-50
 info:progress-75

'version tag' group
 ver:1.x
 ver:1.1
```


## Recommended articles
- [**What is Markdown**?](http://whatismarkdown.com/)
- [**Instant project management for your Github issues: HuBoard**](https://huboard.com/)
- [**Using Github for Project Management**](http://liftux.com/posts/using-github-issues-project-management/)